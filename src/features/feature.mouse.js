function enableContextMenu(isOn = true) {
    // Enable ContextMenu Function
    window.addEventListener('contextmenu', (e) => e.stopPropagation(), isOn);
}