/**
 * git do not control webim.config.js isMultiLoginSessions
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */
var WebIM = {};
WebIM.config = {
    xmppURL: 'im-api.easemob.com',
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    appkey: '1102180111115080#wanjiba20180111',
    https: false,
    isMultiLoginSessions: true,
    isAutoLogin: true,
    isWindowSDK: false,
    isSandBox: false,
    isDebug: false,
    autoReconnectNumMax: 200,
    autoReconnectInterval: 1,
    isWebRTC: /WebKit/.test(navigator.userAgent) && /^https\:$/.test(window.location.protocol),
    heartBeatWait: 4500,
    isHttpDNS: false,
    msgStatus: true,
    delivery: true,
    read: true,
    saveLocal: false,
    encrypt: {
        typr: 'none'
    }
};
