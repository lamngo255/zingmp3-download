const getDownloadLink = (songUrl, mediaType) => {
	chrome.runtime.sendMessage(
		{ contentScriptQuery: "queryZingMp3", url: songUrl },
		songData => {
			let panel = document.querySelector("ul.action-list");
			let songTitle = `${songData.title}.mp3`;

			if (mediaType == "bai-hat") {
				let linkVip = songData.source.audio[320].download;

				if (panel) {
					let downloadBtn = document.querySelector("ul.action-list")
						.children[4];
					let vipBtn = downloadBtn.cloneNode(true);
					vipBtn.setAttribute("title", "Tải");
					vipBtn.querySelector("span").innerHTML = "Tải VIP";
					vipBtn.onclick = () => {
						chrome.runtime.sendMessage({
							contentScriptQuery: "downloadMp3",
							url: linkVip,
							filename: songTitle
						});
					};
					downloadBtn.remove();
					panel.insertBefore(vipBtn, panel.lastChild);
				}
			} else {
				// mediaType == video-clip
				let linkVip = songData.source.video[1080].view;

				if (panel) {
					let ngheAudio = document.querySelector("ul.action-list").children[2];
					let vipBtn = ngheAudio.cloneNode(true);
					vipBtn.setAttribute("title", "Tải");
					vipBtn.querySelector("span").innerHTML = "Tải VIP (1080p)";
					vipBtn.querySelector("a").setAttribute("href", linkVip);
					vipBtn.querySelector("a").setAttribute("target", "_blank");
					vipBtn.querySelector("i").setAttribute("class", "icon ic-sync-white");
					panel.insertBefore(vipBtn, panel.lastChild);
				}
			}
		}
	);
};

// Get download link when changing song (single page loaded)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let mediaType = request.message;
	if (mediaType) {
		const songUrl = request.url;
		getDownloadLink(songUrl, mediaType);
	}
});

// get download link when first loads the page
let url = window.location.href;
getDownloadLink(url);
