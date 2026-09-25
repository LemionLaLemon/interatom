(function () {
  "use strict";

  var news = [
    {
      date: "05 September 2026",
      title: "InterATOM completes a major maintenance cycle",
      className: "news-card news-card-featured"
    },
    {
      date: "21 August 2026",
      title: "Vogataya station prepares for its next operating test",
      className: "news-card news-card-lead"
    },
    {
      date: "02 August 2026",
      title: "Safety teams publish the latest field observations",
      className: "news-card news-card-secondary"
    }
  ];

  function makeElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) {
      element.setAttribute("class", className);
    }
    if (text !== undefined) {
      element.textContent = text;
    }
    return element;
  }

  function renderNews() {
    var grid = document.getElementById("news-grid");
    var index;
    for (index = 0; index < news.length; index += 1) {
      var item = news[index];
      var card = makeElement("a", item.className);
      var date = makeElement("span", "news-date", item.date);
      var title = makeElement("span", "news-title", item.title);
      card.setAttribute("href", "#news");
      card.appendChild(date);
      card.appendChild(title);
      grid.appendChild(card);
    }
  }

  function toggleMobileMenu() {
    var button = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    var open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", open ? "false" : "true");
    menu.hidden = open;
  }

  function refreshStatus() {
    var output = document.getElementById("status-message");
    var request = new XMLHttpRequest();
    output.textContent = "Checking station status...";
    request.open("GET", "./status.json", true);
    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status >= 200 && request.status < 300) {
        output.textContent = request.responseText;
      } else {
        output.textContent = "Status request failed (" + request.status + ").";
      }
    };
    request.onerror = function () {
      output.textContent = "Status request could not be sent.";
    };
    request.send();
  }

  function acceptCookies() {
    var banner = document.getElementById("cookie-banner");
    banner.hidden = true;
  }

  renderNews();

  document.getElementById("menu-toggle").addEventListener("click", toggleMobileMenu);
  document.getElementById("refresh-status").addEventListener("click", refreshStatus);
  document.getElementById("accept-cookies").addEventListener("click", acceptCookies);

  window.setTimeout(function () {
    document.getElementById("status-message").textContent = "Compatibility page ready.";
  }, 250);
})();
