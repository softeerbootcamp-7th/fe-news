export function moveNext(currentPage, items_per_page, dataCount) {
    if ((currentPage + 1) * items_per_page < dataCount){
        currentPage++;
    }
    return currentPage;
}