const baseUrl = "https://zing-mp3.glitch.me/?url=";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.contentScriptQuery == "queryZingMp3") {
		var url = `${baseUrl}` + encodeURIComponent(request.url);

		fetch(url)
			.then(response => response.json())
			.then(data => {
				sendResponse(data);
				console.log(data);
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
