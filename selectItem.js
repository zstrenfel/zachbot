/**
 * selectItem.js
 * //\\//\\// Beep Beep //\\//\\//
 * Meat and potatos of the bot,
 * this script oes things.
 * //\\//\\//\\ WorkingInitiating.. Working .. //\\//\\//
 **/
var selectItem = (function() {

  var activate = function(options) {
    var keyword = options.keyword;

    var productLinks = document.getElementById('container').getElementsByTagName("a");
    for (var i in productLinks) {
      var href = productLinks[i].href;
      if (href.includes(keyword)) {
        productLinks[i].click();
        break;
      }
    }
  };

  return {
    activate: activate
  }
})();


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from the content script: " + sender.tab.url : "from the extension");
    sendResponse({message: "Options Recieved in selectItem.js"})
    selectItem.activate(request.options);
  }
)

