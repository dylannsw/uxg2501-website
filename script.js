document.addEventListener("DOMContentLoaded", function() {
    let fakeComment = document.getElementById("fake-comment");

    // Function to extract hex code from fake comment
    function getFakeHexCode() {
        let commentText = fakeComment.innerHTML;
        let match = commentText.match(/#[0-9A-Fa-f]{6}/);
        return match ? match[0] : null;
    }

    let previousColor = getFakeHexCode();

    // Function to send background color to Unity
    function notifyUnity(newColor) {
        console.log("Background color changed to:", newColor);
        let unityFrame = document.getElementById("unity-frame").contentWindow;
        if (unityFrame) {
            unityFrame.postMessage({ type: "colorChange", value: newColor }, "*");
        }
    }

    // MutationObserver to detect changes in the fake comment
    const observer = new MutationObserver(() => {
        let newColor = getFakeHexCode();
        if (newColor && newColor !== previousColor) {
            previousColor = newColor;
            notifyUnity(newColor);
        }
    });

    observer.observe(fakeComment, { characterData: true, childList: true, subtree: true });
});
