export default {
    options: {
        sizable: true,
    },
    editor: {
        label: {
            fr: 'Vidéo - Twitch',
            en: 'Vidéo - Twitch',
        },
        icon: 'play',
    },
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
            defaultValue: 'https://www.twitch.tv/videos/1579142420',
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
