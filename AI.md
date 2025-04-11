---
name: ww-video-twitch
description: The ww-video-twitch component enables seamless embedding and playback of Twitch videos or channels on your website, offering features like autoplay, muting, and programmatic control over video playback, along with event handling for play, pause, and end actions.
keywords: twitch integration, video embedding, autoplay feature, video playback control, programmatic video control, video start time, muted video, video events, twitch channels, web component
---

#### ww-video-vimeo

***Purpose:***
Embeds and plays Twitch videos or channels within your website.

***Features:***
- Supports both Twitch videos and channels
- Provides play, pause, and end events
- Control video playback via playVideo, pauseVideo, seekTo actions
- Exposes video playing state and time variables

***Properties:***
- url: string - The URL of the Twitch video or channel. Default: ""
- videoStartTime: string - The start time for the video in format "0h0m0s". Default: ""
- autoplay: boolean - Whether the video should start playing automatically. Default: false
- muted: boolean - Whether the video should be muted. Default: false

***Events:***
- play: Triggered when video starts playing. Value is current time in seconds. Payload: {value: number}
- pause: Triggered when video is paused. Value is current time in seconds. Payload: {value: number}
- end: Triggered when video reaches the end. Value is current time in seconds. Payload: {value: number}

***Exposed Variables:***
- Is Playing: boolean - Indicates if video is currently playing  (Path: variables['current_element_uid-Is Playing'])
- Current time: number - Current playback time in seconds  (Path: variables['current_element_uid-Current time'])

***Exposed Element Actions:***
- playVideo: (no args) Play video
- pauseVideo: (no args) Pause video
- seekTo: (arg1 (time in seconds): number) Go to time

***Notes:***
 Do not set element or parent element height to 0 : a combination of width to 100% & aspectRatio to 16/9 will ensure the video is displayed correctly.
