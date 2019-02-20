const NODE_PREFIX = 'samsungext';
const ADDON_CLASS = 'samsungext';
const SHOW_CLASS = 'samsungext-show';

const STORE = {
    REMEMBER: 'samsungext.remember',
    ICONS: 'samsungext.icons',
    POPUP: 'samsungext.popup_shown',
    WIDTH: 'samsungext.sidebar_width',
    SHOWN: 'samsungext.sidebar_shown',
};

const DEFAULTS = {
    TOKEN: '',
    REMEMBER: true,
    ICONS: true,
    POPUP: false,
    WIDTH: 232,
    SHOWN: false,
};

const EVENT = {
    TOGGLE: 'samsungext:toggle',
    LOC_CHANGE: 'samsungext:location',
    LAYOUT_CHANGE: 'samsungext:layout',
    REQ_START: 'samsungext:start',
    REQ_END: 'samsungext:end',
    OPTS_CHANGE: 'samsungext:change',
    VIEW_READY: 'samsungext:ready',
    VIEW_CLOSE: 'samsungext:close',
    FETCH_ERROR: 'samsungext:error'
};