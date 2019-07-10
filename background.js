const baseUrl = "https://zing-mp3.glitch.me/?url=";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request.contentScriptQuery == "queryZingMp3") {
		var url = `${baseUrl}` + encodeURIComponent(request.url);
		// fetch(url)
		// 	.then(response => response.text())
		// 	.then(text => parsePrice(text))
		// 	.then(price => sendResponse(price))
		// 	.catch(err => console.log(err));

		// let response = await fetch(url);
		// let data = await response.json();
		console.log(url);
		sendResponse(url);
		return true; // Will respond asynchronously.
	}
});
