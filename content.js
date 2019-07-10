const getDownloadLink = async songUrl => {
	// https://zing-mp3.glitch.me/?url=https://mp3.zing.vn/bai-hat/Hoc-Tieng-Meo-Keu-Xuan-Tai-Ly-Phuong-Thanh/ZW9CZOFF.html
	// console.log(url);
	// let response = await fetch(`${baseUrl}${url}`);
	// return response;

	chrome.runtime.sendMessage(
		{ contentScriptQuery: "queryZingMp3", url: songUrl },
		data => {
			return data;
		}
	);
};

window.addEventListener("load", async () => {
	let panel = document.querySelector("ul.action-list");
	let link = window.location.href;
	let response = await getDownloadLink(link);
	console.log(response);

	if (panel) {
		// button Tải xuống
		let downloadBtn = document.querySelector("ul.action-list").children[4];
		let vipBtn = downloadBtn.cloneNode(true);
		vipBtn.setAttribute("title", "Tải");
		vipBtn.querySelector("span").innerHTML = "VIP (320kbps)";

		panel.insertBefore(vipBtn, panel.lastChild);
	}
});
