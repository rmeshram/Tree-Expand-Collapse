var data = [
	{
		id: (Math.random() * 999).toFixed(2) * 100,
		text: "ONE",
		children: [
			{
				id: (Math.random() * 999).toFixed(2) * 100,
				text: "child of ONE",
				children: [
					{
						id: (Math.random() * 999).toFixed(2) * 100,
						text: "grandchild of ONE"
					}
				]
			}
		]
	},
	{
		text: "TWO",
		children: [
			{
				id: (Math.random() * 999).toFixed(2) * 100,
				text: "child of TWO",
				children: [
					{
						id: (Math.random() * 999).toFixed(2) * 100,
						text: "grandchild of TWO"
					}
				]
			}
		]
	}
];


document.addEventListener('DOMContentLoaded', attachEvents)
function attachEvents() {
	createTree(container, data);
	const lis = document.querySelectorAll("LI");
	lis.forEach(li => {
		li.addEventListener("click", event => {
			if (event.target.nextSibling.tagName === "UL") {
				event.target.nextSibling.hidden = !event.target.nextSibling.hidden;
			}
		});
	});
}

function createTree(container, obj) {
	container.innerHTML = createTreeWithArray(obj);
}

function createTreeWithArray(data) {
	let li = "";
	if (!Array.isArray(data)) return;
	data.forEach(element => {
		li += createTreeText(element);
	});
	return li;
}

const createTreeText = element => {
	let li = "";
	for (let key in element) {
		if (typeof element[key] != "object" && key != "id") {
			li += `<li id="${element["id"]}"> ${element["text"]}`;
		}
		if (
			typeof element[key] === "object" &&
			element[key] &&
			element[key].length > 0
		) {
			li += `<ul> ${createTreeWithArray(element[key])} </ul>`;
		}
		li += `</li>`;
	}
	return li;
};