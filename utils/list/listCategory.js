export function initNewsCategories(data) {
    const fragment = document.createDocumentFragment(); // DOM 한번만 조작
    
    const category_container = document.createElement('ul');
    category_container.className = 'category-container';
    const categories = [...new Set(data.map(e => e.category))];
    
    for (let i = 0; i < categories.length; i++) {
        const cell = document.createElement('li');
        cell.className = 'news-category';
        
        cell.innerHTML = categories[i];

        fragment.appendChild(cell);
    }
    category_container.appendChild(fragment);
    
    return category_container;
}