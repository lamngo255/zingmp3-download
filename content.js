console.log("Chrome extension go?");

window.addEventListener("load", () => {
	let panel = document.querySelector("ul.action-list");

	if (panel) {
		// button Tải xuống
		let downloadBtn = document.querySelector("ul.action-list").children[4];
		let vipBtn = downloadBtn.cloneNode(true);
		vipBtn.setAttribute("title", "Tải");
		vipBtn.querySelector("span").innerHTML = "VIP (320kbps)";

		panel.insertBefore(vipBtn, panel.lastChild);
	}
});
