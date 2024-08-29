<template>
    <div
        class="ww-video-twitch"
        :id="`twitch-player-${uniqueID}`"
        :class="{ editing: isEditing }"
        :key="componentKey"
    ></div>
</template>

<script>
import { nextTick } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:content:effect'],
    setup(props) {
        const player = null;
        const uniqueID = wwLib.wwUtils.getUniqueId();
        const { variableValue: isPlayingVariableValue, setValue: setIsPlayingValue } =
            wwLib.wwVariable.useComponentVariable({
                uid: props.uid,
                name: 'Is Playing',
                type: 'boolean',
                defaultValue: false,
                readonly: true,
            });
        const { variableValue: currentTimeVariableValue, setValue: setCurrentTimeValue } =
            wwLib.wwVariable.useComponentVariable({
                uid: props.uid,
                name: 'Current time',
                type: 'number',
                defaultValue: 0,
                readonly: true,
            });

        return {
            player,
            uniqueID,
            isPlayingVariableValue,
            setIsPlayingValue,
            currentTimeVariableValue,
            setCurrentTimeValue,
        };
    },
    data() {
        return {
            componentKey: 0,
            timeUpdater: null,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        typeAndId() {
            const regexVideo = /(?:www|player)\.twitch\.tv\/(?:videos\/|\?video=)([^&]*)/;
            const regexChannel = /(?:www|player)\.twitch\.tv\/(?:\?channel=)?([^&]*)/;

            if (!this.content.url) return {};

            const matchVideo = this.content.url.match(regexVideo);
            if (matchVideo && matchVideo.length === 2) return { type: 'video', id: matchVideo[1] };

            const matchChannel = this.content.url.match(regexChannel);
            if (matchChannel && matchChannel.length === 2) return { type: 'channel', id: matchChannel[1] };

            return {};
        },
        startTime() {
            if (typeof this.content.videoStartTime !== 'string') return '0h0m0s';
            return this.content.videoStartTime;
        },
    },
    watch: {
        isEditing() {
            this.initPlayer();
        },
        'content.url'() {
            this.initPlayer();
        },
        startTime() {
            this.initPlayer();
        },
    },
    mounted() {
        this.handleScript();
    },
    beforeUnmount() {
        this.clearEvents();
        clearInterval(this.timeUpdater);
    },
    methods: {
        async handleScript() {
            const scriptElement = wwLib.getFrontDocument().createElement('script');
            scriptElement.setAttribute('src', 'https://player.twitch.tv/js/embed/v1.js');
            scriptElement.setAttribute('type', 'text/javascript');
            wwLib.getFrontDocument().body.appendChild(scriptElement);

            scriptElement.onload = () => {
                this.initPlayer();
            };
        },
        async initPlayer() {
            if (this.timeUpdater) clearInterval(this.timeUpdater);
            this.clearEvents();
            this.componentKey += 1;
            await nextTick();

            if (!this.typeAndId.type) return;

            this.player = new Twitch.Player(`twitch-player-${this.uniqueID}`, {
                [this.typeAndId.type]: this.typeAndId.id,
                width: '100%',
                height: '100%',
                autoplay: this.isEditing ? false : this.content.autoplay,
                muted: this.content.muted,
                time: this.startTime,
            });

            if (this.isEditing) return;
            this.timeUpdater = setInterval(() => this.updateCurrentTime(this.player.getCurrentTime()), 250);
            this.player.addEventListener(Twitch.Player.PLAY, () => this.updateIsPlaying(true));
            this.player.addEventListener(Twitch.Player.PAUSE, () => this.updateIsPlaying(false));
            this.player.addEventListener(Twitch.Player.ENDED, () => {
                this.$emit('trigger-event', { name: 'end', event: {} });
            });
        },
        updateCurrentTime(currentTime) {
            if (typeof currentTime !== 'number') return;
            this.setCurrentTimeValue(currentTime.toFixed(2));
        },
        updateIsPlaying(isPlaying) {
            this.setIsPlayingValue(isPlaying);
            if (isPlaying) {
                this.$emit('trigger-event', { name: 'play', event: {} });
            } else {
                this.$emit('trigger-event', { name: 'pause', event: {} });
            }
        },
        clearEvents() {
            if (!this.player) return;
            this.player.removeEventListener(Twitch.Player.PLAY, () => this.updateIsPlaying(true));
            this.player.removeEventListener(Twitch.Player.PAUSE, () => this.updateIsPlaying(false));
            this.player.removeEventListener(Twitch.Player.ENDED, () => {
                this.$emit('trigger-event', { name: 'end', event: {} });
            });
        },
        playVideo() {
            if (!this.player) return;
            this.player.play();
        },
        pauseVideo() {
            if (!this.player) return;
            this.player.pause();
        },
        seekTo(time) {
            if (!this.player) return;
            this.player.seek(time);
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-video-twitch {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;

    &.editing::after {
        position: absolute;
        inset: 0;
        content: '';
    }

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
