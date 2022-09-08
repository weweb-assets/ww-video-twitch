<template>
    <div class="ww-video-dailymotion"></div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:content:effect'],
    data() {
        return {};
    },
    computed: {},
    watch: {},
    unmounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.ww-video-dailymotion {
    position: relative;
    width: 100%;
    height: 100%;

    &.ww-editing {
        pointer-events: none;
    }
}
</style>
