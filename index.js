function loadSVG() { 
    // SVG를 인라인으로 주입해 CSS로 색상 제어가 가능하도록 처리
    document.querySelectorAll("[data-svg]").forEach(el => {
    fetch(el.dataset.svg)
        .then(res => res.text())
        .then(svg => {
        el.innerHTML = svg;
        });
    })
}

loadSVG();