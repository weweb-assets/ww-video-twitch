<template>
    <div class="ww-video-twitch" :class="{ editing: isEditing }"></div>
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
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-video-twitch {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;

    &.editing {
        pointer-events: none;
    }

    &__player {
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
