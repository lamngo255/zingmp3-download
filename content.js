console.log("Chrome extension go?");

let panel = document.querySelector("ul.action-list");
let downloadBtn = document.querySelector("a[title='Tải xuống']");

let container = document.createElement("li");
let test = downloadBtn.cloneNode(true);

test.setAttribute("title", "Tải");
test.querySelector("span").innerHTML = "Tải (320kbps)";
console.log(panel);
console.log(test);
console.log(downloadBtn);
