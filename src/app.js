import getString from "@/test.js";

const list = document.getElementById("list");
const newItem = document.createElement("li");
const itemText = document.createTextNode(getString());

newItem.appendChild(itemText);
list.appendChild(newItem);
