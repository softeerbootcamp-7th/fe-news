import pressData from './pressData.json';

export const CATEGORIES = [
  '종합/경제',
  '방송/통신',
  'IT',
  '영자지',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
];

export function groupByCategory(data) {
  return data.reduce((categories, item) => {
    const { category } = item;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(item);
    return categories;
  }, {});
}
