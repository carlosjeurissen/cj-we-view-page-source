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

  browserOrChrome.browserAction.onClicked.addListener(browserActionCallback)
})()
