const NODE_PREFIX = 'samsungext';
const ADDON_CLASS = 'samsungext';
const SHOW_CLASS = 'samsungext-submit-result_show';

const STORE = {
    HOTKEYS: 'samsungext.hotkeys',
    REMEMBER: 'samsungext.remember',
    ICONS: 'samsungext.icons',
    POPUP: 'samsungext.popup_shown',
    WIDTH: 'samsungext.submit_result_width',
    SHOWN: 'samsungext.submit_result_shown',
};

const DEFAULTS = {
    HOTKEYS: 'tab',
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