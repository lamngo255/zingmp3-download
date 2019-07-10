const baseUrl = "https://zing-mp3.glitch.me/?url=";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.contentScriptQuery == "queryZingMp3") {
		var url = `${baseUrl}` + encodeURIComponent(request.url);

		fetch(url)
			.then(response => response.json())
			.then(data => {
				sendResponse(data);
			});

		return true; // Will respond asynchronously.
	}

	if (request.contentScriptQuery == "downloadMp3") {
		let { url, filename } = request;
		chrome.downloads.download({
			url,
			filename
		});
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.url && changeInfo.url.startsWith("https://zingmp3.vn")) {
		chrome.tabs.sendMessage(tabId, {
			message: "url_changed!",
			url: changeInfo.url
		});
	}
});
