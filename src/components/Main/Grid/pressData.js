// src/data/pressData.js

// 1. assets 폴더 내의 모든 png 파일을 즉시 가져옵니다.
const imageModules = import.meta.glob("../../../../assets/*.png", {
  eager: true,
});

// 2. 사용할 파일명 목록 (알려주신 이름들)
const pressIds = [
  "040",
  "042",
  "075",
  "076",
  "117",
  "120",
  "139",
  "140",
  "144",
  "312",
  "314",
  "326",
  "340",
  "345",
  "354",
  "355",
  "356",
  "376",
  "384",
  "396",
  "410",
  "440",
  "447",
  "801",
  "804",
  "807",
  "808",
  "809",
  "814",
  "818",
  "819",
  "825",
  "910",
  "913",
  "914",
  "917",
  "920",
  "922",
  "923",
  "925",
  "928",
  "932",
  "934",
  "938",
  "941",
  "942",
  "946",
  "947",
  "952",
];

// 3. 파일명을 매칭하여 데이터 배열 생성
export const pressList = pressIds.map((id) => {
  const path = `../../../../assets/${id}.png`;
  return {
    id,
    logo: imageModules[path]?.default || imageModules[path], // Vite 버전에 따른 처리
  };
});
