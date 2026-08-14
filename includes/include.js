// Loads shared components into any page:
//   <div data-include="../includes/nav.html" data-base="../"></div>
// The {base} token inside an include is replaced with the data-base value
// (path from the page to the repo root).
//
// Pages that need the injected DOM before their own script runs should
// start their script with:  await window.__includesReady;
(function () {
  window.__includesReady = (async () => {
    const placeholders = document.querySelectorAll("[data-include]");
    await Promise.all(
      Array.from(placeholders).map(async (el) => {
        const url = el.getAttribute("data-include");
        const base = el.getAttribute("data-base") || "";
        try {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) throw new Error("HTTP " + res.status);
          let html = await res.text();
          html = html.replace(/\{base\}/g, base);
          el.outerHTML = html;
        } catch (err) {
          const iframe = document.createElement("iframe");
          iframe.src = url;
          iframe.style.cssText =
            "width:100%;height:180px;border:0;display:block;";
          el.replaceWith(iframe);
        }
      })
    );
  })();
})();