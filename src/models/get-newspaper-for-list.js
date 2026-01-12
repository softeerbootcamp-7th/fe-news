import { fetchNewspaper } from '@/apis';
import { shuffleArray } from '@/utils';

/**
 *
 * @typedef {import('../types').Newspaper} Newspaper
 * @returns {Promise<{ categoryNewspaperMap: Map<Newspaper['category'], Newspaper[]> }>}
 */
export const getNewspaperForList = async () => {
  const newspaperList = await fetchNewspaper();

  const shuffledNewspaperList = shuffleArray(newspaperList);

  const categoryNewspaperMap = new Map();
  shuffledNewspaperList.forEach((newspaper) => {
    const category = newspaper.category;
    if (!categoryNewspaperMap.has(category)) {
      categoryNewspaperMap.set(category, []);
    }
    categoryNewspaperMap.get(category).push(newspaper);
  });

  return {
    categoryNewspaperMap,
  };
};
