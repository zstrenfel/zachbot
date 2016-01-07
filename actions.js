/**
 * actions.js
 * //\\//\\// Beep Beep //\\//\\//
 * Meat and potatos of the bot,
 * this script oes things.
 * //\\//\\//\\ WorkingInitiating.. Working .. //\\//\\//
 **/
var WorkerBot = (function() {
  //keywords are currently autoset in the code; should be changed once UI is created.
  var keyword = 'child-of-hell-keychain';

  var activate = function() {
    var productLinks = document.getElementById('container').getElementsByTagName("a");
    for (var i in productLinks) {
      var href = productLinks[i].href;
      if (href.includes(keyword)) {
        productLinks[i].click();
        nextStep();
        break;
      }
    }
  };

  // var sendMessage = function() {
  //   chrome.runtime.sendMessage
  // }

  return {
    activate: activate
  }
})();

WorkerBot.activate();
