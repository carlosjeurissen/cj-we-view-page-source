(function () {
  'use strict'

  var browserOrChrome = typeof chrome !== 'undefined' && chrome.runtime ? chrome : typeof browser !== 'undefined' && browser // eslint-disable-line no-undef

  var viewSourcePrefix = 'view-source:'

  function isSourcePage (url) {
    return url.startsWith(viewSourcePrefix)
  }

  function openSource (tabs) {
    var tabData = tabs[0]
    var url = tabData.url
    if (!url | isSourcePage(url)) return
    browserOrChrome.tabs.create({
      'url': viewSourcePrefix + url,
      'index': tabData.index + 1
    })
  }

  function browserActionCallback () {
    browserOrChrome.tabs.query({
      'active': true,
      'currentWindow': true
    }, openSource)
  }

  function tabUpdatedCallback (tabId, changeInfo, tab) {
    var url = changeInfo.url || tab.url || ''
    if (isSourcePage(url)) {
      browserOrChrome.browserAction.disable(tabId)
    } else {
      browserOrChrome.browserAction.enable(tabId)
    }
  }

  browserOrChrome.browserAction.onClicked.addListener(browserActionCallback)

  if (browserOrChrome.browserAction.disable) {
    browserOrChrome.tabs.onUpdated.addListener(tabUpdatedCallback)
  }
})()
