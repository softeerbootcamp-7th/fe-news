import { NUMBER_OF_NEWSPAPER, GRID_VIEW } from '@/constants';
import { fetchNewspaper } from '@/apis';
import { getRandomNumberList } from '@/utils';

/**
 * @typedef {import('../types').Newspaper} Newspaper
 * @returns {Promise<{ newspaperList: Newspaper[] }>} 뉴스 기사 데이터
 */
export const getNewspaperForGrid = async () => {
  const randomNumberList = getRandomNumberList({
    max: NUMBER_OF_NEWSPAPER,
    count: GRID_VIEW.TOTAL_NEWSPAPER_COUNT,
  });

  const newspaperPromiseList = randomNumberList.map((newspaperIndex) =>
    fetchNewspaper(`_start=${newspaperIndex}&_limit=1`),
  );

  const newspaperList = await Promise.all(newspaperPromiseList).then((res) =>
    res.map((item) => item[0]),
  );

  return {
    newspaperList,
  };
};
