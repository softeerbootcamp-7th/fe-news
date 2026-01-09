const CACHE_KEY = 'naver-eager-data';
const CACHE_TTL = 3600; // 1시간 (초 단위)

async function getCachedData(cache) {
  try {
    const cacheUrl = `https://cache.local/${CACHE_KEY}`;
    const cachedResponse = await cache.match(cacheUrl);
    
    if (cachedResponse) {
      const cachedData = await cachedResponse.text();
      const cacheTime = cachedResponse.headers.get('X-Cache-Time');
      const now = Math.floor(Date.now() / 1000);
      
      // 캐시가 1시간 이내인지 확인
      if (cacheTime && (now - parseInt(cacheTime)) < CACHE_TTL) {
        return cachedData;
      }
    }
  } catch (error) {
    console.error("Cache read error:", error);
  }
  return null;
}

async function setCachedData(cache, data) {
  try {
    const cacheUrl = `https://cache.local/${CACHE_KEY}`;
    const cacheTime = Math.floor(Date.now() / 1000);
    
    const response = new Response(data, {
      headers: {
        'Content-Type': 'text/plain',
        'X-Cache-Time': cacheTime.toString(),
        'Cache-Control': `public, max-age=${CACHE_TTL}`
      }
    });
    
    await cache.put(cacheUrl, response);
  } catch (error) {
    console.error("Cache write error:", error);
  }
}

export async function fetchNaverData(cache = null) {
  // Cache API가 제공된 경우 캐시 확인
  if (cache) {
    const cachedData = await getCachedData(cache);
    if (cachedData) {
      return cachedData;
    }
  }
  
  try {
    const response = await fetch("https://www.naver.com/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
      }
    });
    const html = await response.text();
    
    const eagerDataIndex = html.indexOf('window["EAGER-DATA"]') || html.indexOf("window['EAGER-DATA']");
    
    if (eagerDataIndex === -1) {
      return null;
    }
    
    let scriptStart = html.lastIndexOf('<script', eagerDataIndex);
    if (scriptStart === -1) {
      return null;
    }
    
    scriptStart = html.indexOf('>', scriptStart) + 1;
    const scriptEnd = html.indexOf('</script>', scriptStart);
    
    if (scriptEnd === -1) {
      return null;
    }
    
    const scriptContent = html.substring(scriptStart, scriptEnd).trim();
    
    // 캐시에 저장
    if (cache && scriptContent) {
      await setCachedData(cache, scriptContent);
    }
    
    return scriptContent;
  } catch (error) {
    console.error("Naver Fetch Error:", error);
    return null;
  }
}