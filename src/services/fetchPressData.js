
export function fetchPressData() {
  fetch("/data/pressData.json")
    .then((response) => response.json())
    .then((data) => { return data })
}