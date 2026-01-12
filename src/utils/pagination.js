export function getPaginatedData(data, page, itemsPerPage) {
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  return data.slice(start, end)
}

export function getTotalPages(data, itemsPerPage) {
  return Math.ceil(data.length / itemsPerPage)
}
