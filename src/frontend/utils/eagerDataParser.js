/**
 * EAGER DATA에서 그리드 데이터를 파싱하는 유틸리티
 */

/**
 * EAGER DATA 구조에서 그리드 블록 배열을 추출
 * @returns {Array} 그리드 블록 배열
 */
export function getGridBlocksFromEagerData() {
  try {
    const eagerData = window['EAGER-DATA'];
    if (!eagerData || !eagerData['PC-MEDIA-WRAPPER']) {
      console.warn('EAGER-DATA not found or PC-MEDIA-WRAPPER not available');
      return [];
    }

    const wrapper = eagerData['PC-MEDIA-WRAPPER'];
    
    if (
      wrapper?.blocks?.[0]?.blocks?.[0]?.blocks &&
      Array.isArray(wrapper.blocks[0].blocks[0].blocks)
    ) {
      return wrapper.blocks[0].blocks[0].blocks;
    }

    return [];
  } catch (error) {
    console.error('Error parsing EAGER-DATA:', error);
    return [];
  }
}

/**
 * 그리드 블록에서 그리드 아이템 정보 추출
 * @param {Object} block - PC-NEWSSTAND-PRESS-BLOCK 객체
 * @returns {Object|null} 그리드 아이템 정보 { id, name, logoDark, logoLight }
 */
function extractGridItemFromBlock(block) {
  if (!block || block['@type'] !== 'PC-NEWSSTAND-PRESS-BLOCK') {
    return null;
  }

  const {pid, name, logoDark, logoLight} = block;
  
  if (!logoDark && !logoLight) {
    return null;
  }
  
  return {
    id: pid,
    name,
    logoDark, 
    logoLight, 
  };
}

/**
 * EAGER DATA에서 그리드 데이터 추출
 * @returns {Array} 그리드 아이템 리스트
 */
export function parseGridDataFromEagerData() {
  const blocks = getGridBlocksFromEagerData();
  
  const gridItems = blocks
    .map(extractGridItemFromBlock)
    .filter((item) => item !== null);

  return gridItems;
}

/**
 * MATERIAL-PC-NEWS-ONELINE 타입의 material을 뉴스 아이템으로 변환
 * @param {Object} material - MATERIAL-PC-NEWS-ONELINE 객체
 * @returns {Object|null} 뉴스 아이템 { pressName, title, url, officeId, aid }
 */
function extractNewsItemFromMaterial(material) {
  if (!material || material['@type'] !== 'MATERIAL-PC-NEWS-ONELINE') {
    return null;
  }

  const { title, url, officeName, officeId, aid } = material;

  if (!title || !url || !officeName) {
    return null;
  }

  return {
    pressName: officeName,
    title,
    url,
    officeId,
    aid,
  };
}

/**
 * EAGER DATA에서 rolling 뉴스 데이터 추출
 * 경로: window["EAGER-DATA"]["PC-NEWSSTAND-YONHAP"]["materials"]
 * @returns {Array} 뉴스 아이템 리스트
 */
export function parseRollingDataFromEagerData() {
  try {
    const eagerData = window['EAGER-DATA'];
    if (!eagerData || !eagerData['PC-NEWSSTAND-YONHAP']) {
      console.warn('EAGER-DATA not found or PC-NEWSSTAND-YONHAP not available');
      return [];
    }

    const yonhapData = eagerData['PC-NEWSSTAND-YONHAP'];
    
    // PC-NEWSSTAND-YONHAP.materials 경로에서 materials 배열 추출
    if (
      yonhapData?.materials &&
      Array.isArray(yonhapData.materials)
    ) {
      const materials = yonhapData.materials;
      
      // MATERIAL-PC-NEWS-ONELINE 타입의 materials만 추출하여 뉴스 아이템으로 변환
      const newsItems = materials
        .map(extractNewsItemFromMaterial)
        .filter((item) => item !== null);

      return newsItems;
    }

    console.warn('Rolling news materials not found at PC-NEWSSTAND-YONHAP.materials');
    return [];
  } catch (error) {
    console.error('Error parsing rolling data from EAGER-DATA:', error);
    return [];
  }
}

