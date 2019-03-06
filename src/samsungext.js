$(document).ready(() => {
    const store = new Storage();

    parallel(Object.keys(STORE), (key, cb) => store.setIfNull(STORE[key], DEFAULTS[key], cb), loadExtension);

    function loadExtension() {
        enableContextMenu();
        updateHeader();
        updateMyPage();
        updateSearchBar();
        updateSolvePage();
        updateInputOutputBox(store);
    }
});