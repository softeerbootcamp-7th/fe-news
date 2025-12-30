export function NewsStand(){
    const section = document.createElement("section");
    section.className = "newsstand";

    const title = document.createElement("div");
    title.textContent = "GRID";

    section.appendChild(title);
    return section;
}