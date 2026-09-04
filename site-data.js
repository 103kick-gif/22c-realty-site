/* 22세기 부동산 - 공용 데이터 스토리지 헬퍼
   index.html(공개 페이지)와 admin.html(관리자 페이지)이 함께 불러와서 씁니다.
   실제 서버가 없는 정적 사이트라, 모든 데이터는 브라우저의 localStorage에 저장됩니다.
   (같은 도메인에서 열면 index.html과 admin.html이 데이터를 공유합니다) */

var SiteData = (function(){
  var FIXED_REGIONS = ['중구','동구','서구','남구','북구','수성구','달서구','달성군','군위군'];
  var LISTINGS_KEY = '22c_listings_v2';
  var REGIONS_KEY = '22c_custom_regions';
  var NOTICES_KEY = '22c_notices';
  var FAVORITES_KEY = '22c_favorites';

  function safeParse(raw, fallback){
    try { var v = JSON.parse(raw); return v == null ? fallback : v; } catch(e){ return fallback; }
  }

  function initAll(){
    if (localStorage.getItem(REGIONS_KEY) === null){
      localStorage.setItem(REGIONS_KEY, JSON.stringify(['칠곡군','성주군','고령군']));
    }
    if (localStorage.getItem(LISTINGS_KEY) === null){
      localStorage.setItem(LISTINGS_KEY, JSON.stringify([]));
    }
    if (localStorage.getItem(NOTICES_KEY) === null){
      localStorage.setItem(NOTICES_KEY, JSON.stringify([]));
    }
  }

  function getCustomRegions(){ return safeParse(localStorage.getItem(REGIONS_KEY), []); }
  function saveCustomRegions(list){ localStorage.setItem(REGIONS_KEY, JSON.stringify(list)); }
  function allRegions(){ return FIXED_REGIONS.concat(getCustomRegions()); }

  function getListings(){ return safeParse(localStorage.getItem(LISTINGS_KEY), []); }
  function saveListings(list){ localStorage.setItem(LISTINGS_KEY, JSON.stringify(list)); }

  function getNotices(){ return safeParse(localStorage.getItem(NOTICES_KEY), []); }
  function saveNotices(list){ localStorage.setItem(NOTICES_KEY, JSON.stringify(list)); }

  function getFavorites(){ return safeParse(localStorage.getItem(FAVORITES_KEY), []); }
  function saveFavorites(list){ localStorage.setItem(FAVORITES_KEY, JSON.stringify(list)); }
  function isFavorite(id){ return getFavorites().indexOf(id) !== -1; }
  function toggleFavorite(id){
    var favs = getFavorites();
    var idx = favs.indexOf(id);
    if (idx === -1) favs.push(id); else favs.splice(idx, 1);
    saveFavorites(favs);
    return favs.indexOf(id) !== -1;
  }

  function esc(s){
    var d = document.createElement('div');
    d.textContent = (s == null ? '' : String(s));
    return d.innerHTML;
  }

  // 평방미터(m²) -> 평 환산. 1평 = 3.3058 m²
  function sqmToPy(sqm){
    var n = parseFloat(String(sqm == null ? '' : sqm).replace(/,/g, ''));
    if (!n || isNaN(n)) return '';
    return (Math.round((n / 3.3058) * 10) / 10).toString();
  }

  return {
    FIXED_REGIONS: FIXED_REGIONS,
    initAll: initAll,
    getCustomRegions: getCustomRegions,
    saveCustomRegions: saveCustomRegions,
    allRegions: allRegions,
    getListings: getListings,
    saveListings: saveListings,
    getNotices: getNotices,
    saveNotices: saveNotices,
    getFavorites: getFavorites,
    isFavorite: isFavorite,
    toggleFavorite: toggleFavorite,
    esc: esc,
    sqmToPy: sqmToPy
  };
})();
