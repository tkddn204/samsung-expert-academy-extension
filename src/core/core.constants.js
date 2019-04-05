const NODE_PREFIX = 'samsungext';
const ADDON_CLASS = 'samsungext';
const SHOW_CLASS = 'samsungext-problem-left_show';
const HIDE_CLASS = 'samsungext-problem-left_hide';

const LEFT_WINDOW_BTN = 'samsungext-toggle';
const HIDE_LEFT_ICON = '▶';
const SHOW_LEFT_ICON = '◀';


const STORE = {
    HOTKEYS: 'ssext.hotkeys',
    REMEMBER: 'ssext.remember',
    ICONS: 'ssext.icons',
    POPUP: 'ssext.popup_shown',
    WIDTH: 'ssext.problem-left_width',
    SHOWN: 'ssext.problem-left_shown',
};

const DEFAULTS = {
    HOTKEYS: 'ctrl+b, command+b',
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