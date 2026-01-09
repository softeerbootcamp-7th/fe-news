import pressData from './pressData.json';

const CATEGORIES = [
  '종합/경제',
  '방송/통신',
  'IT',
  '영자지',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
];

export function groupByCategory(data) {
  return data.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
}