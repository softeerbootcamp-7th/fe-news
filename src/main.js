import { greet } from "./utils/other.js";

const app = document.getElementById("app");
app.innerHTML = `<h1>${greet()}</h1>`;
