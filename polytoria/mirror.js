(function () {
  "use strict";
  var toggle = document.getElementById("menu-toggle");
  var panel = document.getElementById("mobile-menu-panel");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      panel.setAttribute("class", open ? "mobilemenupanel" : "mobilemenupanel isOpen");
      panel.setAttribute("aria-hidden", open ? "true" : "false");
    });
  }
  var accept = document.querySelector(".cookies .accept");
  var banner = document.getElementById("cookie-banner");
  if (accept && banner) {
    accept.addEventListener("click", function () {
      banner.hidden = true;
    });
  }
})();