document.addEventListener("DOMContentLoaded", function () {
    let backgroundDiv = document.getElementById("background-wallpaper");

    function getBackgroundColor() {
        return window.getComputedStyle(backgroundDiv).backgroundColor;
    }

    let previousColor = getBackgroundColor();

    function notifyUnity(newColor) {
        console.log("[BROWSER] Background color changed to:", newColor);
        
        // Send message to Unity if it exists
        if (typeof unityInstance !== "undefined") {
            unityInstance.SendMessage("WebGLInteraction", "OnBackgroundColorChanged", newColor);
        }
    }

    // MutationObserver to detect background color changes
    const observer = new MutationObserver(() => {
        let newColor = getBackgroundColor();
        if (newColor !== previousColor) {
            previousColor = newColor;
            notifyUnity(newColor);
        }
    });

    observer.observe(backgroundDiv, { attributes: true, subtree: true });
});

// Ensure the function is properly registered in the browser
window.SendToBrowser = function (message) {
    console.log("[UNITY LOG RECEIVED]: " + message);
};


