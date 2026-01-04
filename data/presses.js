import { rawPresses } from './pressData.js';  // 언론사 데이터 import

// import 한 map에서 필요한 데이터만 뽑아내도록 가공
export const presses = rawPresses.map(item => ({
  name: item.press, // 언론사 name
  logo: item.logo   // 언론사 로고
}));