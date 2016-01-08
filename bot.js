/**
 * bot.js
 * //\\//\\// Beep Beep //\\//\\//
 * Initiation sequence for the zachbot. Listens for the extension
 * to be clicked and then navigates to the target page and begins running.
 * Actual DOM traversal/automation code is in actions.js
 * //\\//\\//\\ Initiating.. Initiating .. //\\//\\//
 **/
var Bot = (function() {
  //item information for the bot
  var options = {
    keyword: 'supreme-hanes-thermal-crew-1-pack',
    size: 'medium',
    color: null
  };

  //array of content scripts to be injected
  var scripts = [
    'selectItem.js',
    'addToCart.js'
  ];

  /**
   * Navigates to the correct page, as denoted by url variable passed into the start function
   * script injection.
   */
  var navigate = function(url) {
    chrome.tabs.create({'url': url}, function(tab) {
      injectScript(tab)
    });
  };

  /**
   * Injects correct content script into the current active page on the tab
   * @param  {Tab} tab -- tab where script should be injected
   */
  var injectScript = function(tab, options) {
    chrome.tabs.executeScript(tab.id, {
      file: scripts[actionCounter]
    });
    sendMessage(options);
    //update action counter to relay next file name;
    actionCounter ++;
  };

  var sendMessage = function(message) {
    console.log('sending message');
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {options: message}, function(response) {
        console.log(response.message);
      })
    })
  };

  /**
   * Begins the processes of the bot when the browser extension is clicked.
   * @param  {String} url -- Url of the target website.
   */
  var start = function(url) {
    navigate(url);
  };

  return {
    start:start,
    injectScript: injectScript
  };
})();

//counter that denotes what file to inject in the current page
var actionCounter = 0;


//Listener for the initial browser extension click
chrome.browserAction.onClicked.addListener(function(activeTab) {
  Bot.start("http://www.supremenewyork.com/shop/all");
})

//Listener for tab change --> indicates that page navigation is complete and new script needs to be injected
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url !== undefined) {
    console.log(changeInfo.url + " " + actionCounter);
    Bot.injectScript(tab);
  }
})

//Listener for message from content scripts
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from the content script: " + sender.tab.url : "from the extension");
    if (request.message === "error") {
      console.log("error");
    } else {
      console.log('message recived');
    }
  }
)



