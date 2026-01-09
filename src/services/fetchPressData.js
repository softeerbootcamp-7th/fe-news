export function fetchPressData() {
  const response = fetch('/data/pressData.json')
  .then(response => response.json())
  .catch(err => console.error(err))

  return response
}