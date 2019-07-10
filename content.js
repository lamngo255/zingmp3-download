const songUrl = window.location.href;

chrome.runtime.sendMessage(
	{ contentScriptQuery: "queryZingMp3", url: songUrl },
	songData => {
		let panel = document.querySelector("ul.action-list");
		let linkVip = songData.source.audio[320].download;
		let songTitle = songData.title;

		if (panel) {
			let downloadBtn = document.querySelector("ul.action-list").children[4];
			let vipBtn = downloadBtn.cloneNode(true);
			vipBtn.setAttribute("title", "Tải");
			vipBtn.querySelector("span").innerHTML = "VIP (320kbps)";
			vipBtn.querySelector("a").setAttribute("href", linkVip);

			panel.insertBefore(vipBtn, panel.lastChild);
		}
	}
);
