console.log("✅ script.js has been loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded. Background observer script running...");

    const targetNode = document.getElementById("background-wallpaper");

    if (!targetNode) {
        console.error("❌ Target element #background-wallpaper not found!");
        return;
    }

    console.log("✅ Target Node found successfully!");

    function notifyUnity() {
        console.log("📤 Sending message to Unity: HideRecycleBin"); // Debug log
        const iframe = document.getElementById("unity-frame");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage("HideRecycleBin", "*"); 
        } else {
            console.warn("⚠️ Unity WebGL frame not found.");
        }
    }

    let lastColor = window.getComputedStyle(targetNode).backgroundColor;
    let colorChangeCooldown = false; // Cooldown flag to prevent spam

    setInterval(() => {
        let newColor = window.getComputedStyle(targetNode).backgroundColor;

        if (newColor !== lastColor && !colorChangeCooldown) {
            colorChangeCooldown = true; // Activate cooldown
            console.log(`🎨 Background color changed! New color: ${newColor}`);
            lastColor = newColor;
            notifyUnity();

            // Reset cooldown after 1 second to prevent spam
            setTimeout(() => {
                colorChangeCooldown = false;
            }, 1000);
        }
    }, 500); // Check every 500ms
});
