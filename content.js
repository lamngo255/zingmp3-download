console.log("Chrome extension go?");

window.addEventListener("load", function() {
	let panel = document.querySelector("ul.action-list");
	let container = document.createElement("li");

	let downloadBtn = document.querySelector("li a[title='Tải xuống']");
	let vipBtn = downloadBtn.cloneNode(true);
	vipBtn.setAttribute("title", "Tải");
	vipBtn.querySelector("span").innerHTML = "VIP (320kbps)";
	container.appendChild(vipBtn);

	if (panel) {
		// panel.appendChild(container);
		panel.insertBefore(container, panel.lastChild);
		console.log(panel);
	}
});
