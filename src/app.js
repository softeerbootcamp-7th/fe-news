import getString from "@/test.js";
import { NewArticlesView } from "@/newArticles.js";

import { articlesData } from "/dummy/articlesData";

const newArticlesView = new NewArticlesView(articlesData);
newArticlesView.render();

const list = document.getElementById("list");
const newItem = document.createElement("li");
const itemText = document.createTextNode(getString());

newItem.appendChild(itemText);
list.appendChild(newItem);
