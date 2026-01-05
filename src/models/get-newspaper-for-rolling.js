import { NUMBER_OF_NEWSPAPER } from '@/constants';
import { fetchNewspaper } from '@/apis';
import { getRandomNumberList } from '@/utils';

/**
 * @typedef {import('../types').Newspaper} Newspaper
 * @returns {Promise<{ newspaperList: Newspaper[] }>} 뉴스 기사 데이터
 */
export const getNewspaperForRolling = async () => {
  const randomNumberList = getRandomNumberList({
    max: NUMBER_OF_NEWSPAPER,
    count: 10,
  });

  const newspaperPromsieList = randomNumberList.map((number) =>
    fetchNewspaper(`_start=${number}&_limit=1`),
  );

  const newspaperList = await Promise.all(newspaperPromsieList).then((res) =>
    res.map((item) => item[0]),
  );

  return {
    newspaperList,
  };
};
