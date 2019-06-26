(function () {
  'use strict'

  var browserOrChrome = typeof chrome !== 'undefined' && chrome.runtime ? chrome : typeof browser !== 'undefined' && browser // eslint-disable-line no-undef

  var viewSourcePrefix = 'view-source:'

  function openSource (tabs) {
    var tabData = tabs[0]
    var tabUrl = tabData.url
    if (!tabUrl) return
    browserOrChrome.tabs.create({
      'url': tabUrl.startsWith(viewSourcePrefix) ? tabUrl : viewSourcePrefix + tabUrl,
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
