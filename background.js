chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
});


function getStyleSheet(url) {
  if (url.startsWith('https://wiki.archlinux.org/')) {
    return 'arch.css';
  } else if (url.startsWith('https://www.freedesktop.org/wiki')) {
    return 'freedesktop.css';
  } else {
    return "default.css";
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';


  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  });

  style_sheet = `sheets/${getStyleSheet(tab.url)}`;

  if (nextState === 'ON') {
    await chrome.scripting.insertCSS({
      files: [style_sheet],
      target: { tabId: tab.id }
    });
    console.log('Custom css is injected');
  } else if (nextState === 'OFF') {
    await chrome.scripting.removeCSS({
      files: [style_sheet],
      target: { tabId: tab.id }
    });
    console.log('Custom css is injected');
  }
});
