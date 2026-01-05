import { createPage } from "./components/createPage";
import { render } from "./lib/dom";
import { store } from "./state/store";
import "./styles/foundation.css";
import "./styles/object.css";
import "./styles/typo.css";

const $root = document.querySelector("#app");

render($root, createPage);
