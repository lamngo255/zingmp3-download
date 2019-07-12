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
	let newUrl = changeInfo.url;
	if (newUrl) {
		let msg = "bai-hat";
		if (newUrl.startsWith("https://zingmp3.vn/video-clip")) {
			msg = "video-clip";
		}

		chrome.tabs.sendMessage(tabId, {
			message: msg,
			url: changeInfo.url
		});
	}
});
