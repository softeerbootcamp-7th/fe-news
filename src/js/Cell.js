export function addCell() {
    const newsBrandList = [];

    
    for (let i = 1; i <= 24; i += 1) {
        newsBrandList.push(Math.floor(Math.random() * 93));
    }

    const htmlString = newsBrandList.map(newsBrand => `<img class="grid-cell" src="images/light_mode_logo/asset ${newsBrand} 1.png">`).join('');

    const targetElement = document.querySelector('#viewArea .center');

    targetElement.innerHTML = htmlString;
}