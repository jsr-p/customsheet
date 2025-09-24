const api = window.browser || window.chrome;

api.runtime.onInstalled.addListener(() => {
  api.browserAction.setBadgeText({ text: "OFF" });
});

function getStyleSheet(url) {
  if (url.startsWith("https://wiki.archlinux.org/")) {
    return "arch.css";
  } else if (url.startsWith("https://www.freedesktop.org/wiki")) {
    return "freedesktop.css";
  } else if (url.startsWith("https://ekstrabladet.dk/")) {
    return "eb.css";
  } else {
    return "default.css";
  }
}

function toggleCss(tab) {
  api.browserAction.getBadgeText({ tabId: tab.id }, (prevState) => {
    const nextState = prevState === "ON" ? "OFF" : "ON";

    api.browserAction.setBadgeText({ tabId: tab.id, text: nextState });

    const styleSheet = `sheets/${getStyleSheet(tab.url)}`;

    if (nextState === "ON") {
      api.tabs.insertCSS(tab.id, { file: styleSheet });
      console.log("Custom CSS injected");
    } else {
      api.tabs.removeCSS(tab.id, { file: styleSheet });
      console.log("Custom CSS removed");
    }
  });
}

api.browserAction.onClicked.addListener(toggleCss);

api.commands.onCommand.addListener((command) => {
  if (command === "toggle-stylesheet") {
    api.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        toggleCss(tabs[0]);
      }
    });
  }
});
