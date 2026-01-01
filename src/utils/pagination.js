export const ITEMS_PER_PAGE = 24

export function getPaginatedData(data, page, itemsPerPage = ITEMS_PER_PAGE) {
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  return data.slice(start, end)
}

export function getTotalPages(data, itemsPerPage = ITEMS_PER_PAGE) {
  return Math.ceil(data.length / itemsPerPage)
}
