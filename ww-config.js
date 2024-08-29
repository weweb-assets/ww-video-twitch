export default {
    options: {
        ignoredStyleProperties: ['overflow', 'aspectRatio'],
    },
    editor: {
        label: {
            fr: 'Vidéo - Twitch',
            en: 'Vidéo - Twitch',
        },
        icon: 'logos/twitch',
    },
    actions: [
        { label: 'Play video', action: 'playVideo' },
        { label: 'Pause video', action: 'pauseVideo' },
        {
            label: 'Seek to',
            action: 'seekTo',
            args: [
                {
                    name: 'Time',
                    type: 'number',
                },
            ],
        },
    ],
    triggerEvents: [
        { name: 'play', label: { en: 'On play' }, event: { value: '' }, default: true },
        { name: 'pause', label: { en: 'On pause' }, event: { value: '' } },
        { name: 'end', label: { en: 'On end' }, event: { value: '' } },
    ],
    properties: {
        url: {
            path: 'url',
            label: { en: 'Video url', fr: 'Url de la vidéo' },
            type: 'Text',
            section: 'settings',
            options: {
                placeholder: 'Url',
            },
            bindable: true,
            defaultValue: '',
        },
        videoStartTime: {
            label: {
                en: 'Start time',
            },
            type: 'Text',
            options: {
                placeholder: '0h0m0s',
            },
            section: 'settings',
            bindable: true,
            defaultValue: '',
        },
        autoplay: {
            label: { en: 'Autoplay', fr: 'Lecture automatique' },
            type: 'TextRadioGroup',
            section: 'settings',
            options: {
                choices: [
                    {
                        default: true,
                        value: false,
                        title: { en: 'Start', fr: 'Début' },
                        icon: 'none',
                    },
                    {
                        value: true,
                        title: { en: 'Center', fr: 'Milieu' },
                        icon: 'tick',
                    },
                ],
            },
            defaultValue: false,
        },
        muted: {
            label: { en: 'Muted', fr: 'Muet' },
            type: 'TextRadioGroup',
            section: 'settings',
            options: {
                choices: [
                    {
                        default: true,
                        value: false,
                        title: { en: 'Start', fr: 'Début' },
                        icon: 'none',
                    },
                    {
                        value: true,
                        title: { en: 'Center', fr: 'Milieu' },
                        icon: 'tick',
                    },
                ],
            },
            defaultValue: false,
        },
    },
};
