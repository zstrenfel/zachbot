/**
 * bot.js
 * //\\//\\// Beep Beep //\\//\\//
 * Initiation sequence for the zachbot. Listens for the extension
 * to be clicked and then navigates to the target page and begins running.
 * Actual DOM traversal/automation code is in actions.js
 * //\\//\\//\\ Initiating.. Initiating .. //\\//\\//
 **/
var Bot = (function() {
	//default website for bot
	var url = "http://www.supremenewyork.com/shop/all";

	var navigate = function() {
		chrome.tabs.create({'url': url}, function(tab) {
			initSearch(tab);
		});
	};

	var initSearch = function(tab) {
		chrome.tabs.executeScript(tab.id, {
			file: "actions.js"
		})
	};

	var addToCart = function(tab) {
		chrome.tabs.executeScript(tab.id, {
			file: "addToCart.js"
		})
	};

	var start = function() {
		navigate();
	};

	return {
		start:start,
		addToCart: addToCart
	};
})();

chrome.browserAction.onClicked.addListener(function(activeTab) {
	Bot.start();
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	Bot.addToCart(tab);
})

//listens for success action, and injects script into the next page
// chrome.runtime.onMessage.addListener(function(request, sender) {

// });