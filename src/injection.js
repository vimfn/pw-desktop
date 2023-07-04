// This function will run on each page load
(async (tauri) => {
  console.log(`Page Url: ${window.location}`);
  window.addEventListener("keypress", (key) => {
    if (key.key == "i" && key.ctrlKey) {
      tauri.invoke("open_devtools");
    }
  });
})(window.__TAURI__.tauri);
