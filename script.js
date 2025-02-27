console.log("✅ script.js has been loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded. Starting background observer...");

    const iframe = document.getElementById("unity-frame");

    if (!iframe) {
        console.error("❌ Unity iframe not found!");
        return;
    }

    function notifyUnity() {
        console.log("📤 Sending message to Unity: HideRecycleBin");

        // Ensure Unity instance is referenced correctly
        if (typeof SendMessage === "function") {
            SendMessage("WebGLInteraction", "ReceiveMessage", "HideRecycleBin");
            console.log("✅ Successfully sent message to Unity!");
        } else {
            console.warn("⚠️ Unity WebGL SendMessage function not found.");
        }
    }

    console.log("✅ Background observer script running...");

    const targetNode = document.getElementById("background-wallpaper");

    if (!targetNode) {
        console.error("❌ Target element #background-wallpaper not found!");
        return;
    }

    console.log("✅ Target Node found successfully!");

    let lastColor = window.getComputedStyle(targetNode).backgroundColor;

    setInterval(() => {
        let newColor = window.getComputedStyle(targetNode).backgroundColor;
        if (newColor !== lastColor) {
            console.log(`🎨 Background color changed! New color: ${newColor}`);
            lastColor = newColor;
            notifyUnity();
        }
    }, 500); // Checks every 500ms
});
