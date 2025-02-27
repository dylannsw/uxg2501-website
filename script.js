document.addEventListener("DOMContentLoaded", function () {
    const targetNode = document.getElementById("background-wallpaper");

    if (!targetNode) {
        console.error("Target element not found!");
        return;
    }

    function notifyUnity() {
        const iframe = document.getElementById("unity-frame");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage("HideRecycleBin", "*"); // Send message to Unity WebGL
        } else {
            console.warn("Unity WebGL frame not found.");
        }
    }

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === "attributes" && mutation.attributeName === "style") {
                notifyUnity(); // Notify Unity when background color changes
            }
        }
    });

    observer.observe(targetNode, { attributes: true, attributeFilter: ["style"] });
});
