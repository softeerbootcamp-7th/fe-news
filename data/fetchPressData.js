export async function getPressData() {
  const response = await fetch("./data/pressData.json", {
    headers: {
	    Accept: "application / json",
	  },
  });
  const jsonData = await response.json();

  return jsonData
}

export const getNewsCategoryList= (pressData) => {
  const categories = pressData.map(item => item.category);
  return [...new Set(categories)];
}