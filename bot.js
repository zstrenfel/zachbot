/* Beep Beep */
var Bot = (function() {
	//default website for bot
	var url = "http://www.supremenewyork.com/shop/all";
	//array of the items to buy, should default to one item
	var toBuy;

	var navigate = function() {
		chrome.tabs.create({'url': url}, function(tab) {
			initSearch(tab);
		}); 
	};

	var initSearch = function(tab) {
		chrome.tabs.executeScript(tab.id, {
			file: "actions.js"
		})
		// var container = document.getElementById('container');
		// // var images = container.getElementsByTagName('img');
		// return container;

		// toBuy.map(function(item) {

		// })
	}

	var start = function() {
		// toBuy = items;
		navigate();
	};

	return {
		start:start
	};
})();

chrome.browserAction.onClicked.addListener(function(activeTab) {
	Bot.start();
})