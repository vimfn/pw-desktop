// This function will run on each page load
(async (tauri) => {
  console.log(`Page Url: ${window.location}`);

  const darkModeCSS = `
  @media screen {

    /* Leading rule */
    html {
      -webkit-filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(95%) !important;
      filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(95%) !important;
    }
    
    /* Reverse rule */
    img,
    video,
    :not(object):not(body)>embed,
    object,
    svg image,
    [style*="background:url"],
    [style*="background-image:url"],
    [style*="background: url"],
    [style*="background-image: url"],
    [background],
    twitterwidget,
    .sr-reader,
    .sr-backdrop,
    iframe:fullscreen,
    [class="opinary-iframe"] {
      -webkit-filter: invert(100%) hue-rotate(180deg) !important;
      filter: invert(100%) hue-rotate(180deg) !important;
    }
    [style*="background:url"] *,
    [style*="background-image:url"] *,
    [style*="background: url"] *,
    [style*="background-image: url"] *,
    input,
    [background] *,
    img[src^="https://s0.wp.com/latex.php"],
    twitterwidget .NaturalImage-image {
      -webkit-filter: none !important;
      filter: none !important;
    }
    .compatibility-with-darkreader-below-4-3-3 {
      background: white !important;
    }
    
    /* Text contrast */
    html {
      text-shadow: 0 0 0 !important;
    }
    
    /* Full screen */
    :-webkit-full-screen, :-webkit-full-screen * {
      -webkit-filter: none !important;
      filter: none !important;
    }
    :-moz-full-screen, :-moz-full-screen * {
      -webkit-filter: none !important;
      filter: none !important;
    }
    :fullscreen, :fullscreen * {
      -webkit-filter: none !important;
      filter: none !important;
    }
    
    /* Page background */
    html {
      background: rgb(255,255,255) !important;
    }
    
    /* Custom rules */
    .compatibility-with-darkreader-below-4-3-3 {
        background: white !important;
    }
    }
  `;
  const styleEl = document.createElement("style");
  styleEl.innerText = darkModeCSS;

  if (window.localStorage.getItem("dark")) {
    document.head.append(styleEl);
  }

  const toggleStyleSheet = () => {
    if (window.localStorage.getItem("dark")) {
      window.localStorage.removeItem("dark");
      styleEl.remove();
    } else {
      window.localStorage.setItem("dark", "true");
      document.head.append(styleEl);
    }
  };

  // I don't know why but windows version only fire on `keyup` event
  window.addEventListener("keyup", (key) => {
    if (key.key == "i" && key.ctrlKey) {
      tauri.invoke("open_devtools");
    }
    if (key.key == "t" && key.altKey) {
      toggleStyleSheet();
    }
  });
})(window.__TAURI__.tauri);
