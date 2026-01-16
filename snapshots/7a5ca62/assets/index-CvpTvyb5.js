(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const o={GRID:"grid",LIST:"list"},c={ALL:"all",MY:"my"},O={GENERAL_ECONOMY:"종합/경제",BROADCASTING:"방송/통신",IT:"IT",ENGLISH:"영자지",SPORTS_ENTERTAINMENT:"스포츠/연예",MAGAZINE:"매거진/전문지",LOCAL:"지역"};function j(t){const e={year:"numeric",month:"2-digit",day:"2-digit",weekday:"long"};return new Intl.DateTimeFormat("ko-KR",e).format(t)}function z(t,e=new Date){const n=/(\d{2})월\s*(\d{2})일\s*(\d{2}):(\d{2})/,r=t.match(n);if(!r)return null;const[,s,i,a,h]=r.map(Number),_=e.getFullYear();return new Date(_,s-1,i,a,h)}function U(t){const e=n=>String(n).padStart(2,"0");return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())}. ${e(t.getHours())}:${e(t.getMinutes())}`}function K(t){return t.map((e,n)=>{const{category:r,totalPage:s,logo:i,darkLogo:a,press:h,time:_,mainTitle:H,mainLink:Z,mainImg:F,relatedArticles:Y}=e;return{id:n,category:r,totalPage:s,logo:i,darkLogo:a,name:h,time:U(z(_)),mainNews:{title:H,thumbnail:F,link:Z},subNews:Y}})}function W(t,e){switch(t){case o.GRID:return D(e);case o.LIST:return Q(e)}}function D(t){return[...t].sort(()=>Math.random()-.5)}function Q(t){const e=Object.values(O),n=t.reduce((r,s)=>(r[s.category]||(r[s.category]=[]),r[s.category].push(s),r),{});return e.flatMap(r=>D(n[r]??[]))}function X(t,e){let n=t[e].category,r=-1;for(let s=e;s>=0;s--)if(t[s].category!==n){r=s;break}return e-r-1}function J(t,e){for(let n=0;n<t.length;n++)if(t[n].category===e)return n}let M=o.GRID;const I=new Set;function tt(t){return I.add(t),()=>I.delete(t)}function et(){I.forEach(t=>t(M))}function v(){return M}function T(t){M=t,et()}function nt(){document.querySelector(".newsstand-header__left").addEventListener("click",()=>{T(v())}),document.querySelector(".newsstand-header__date").innerText=j(new Date)}class g{static ROLL_INTERVAL_MS=5e3;static ROLL_OFFSET_MS=1e3;constructor(){this.data=[],this.leftIndex=0,this.rightIndex=1,this.lastIndex=1;const e=document.querySelector(".latest-news");this.leftNewsContainer=e.children[0],this.rightNewsContainer=e.children[1],this.leftLastRoll=performance.now(),this.rightLastRoll=performance.now()+g.ROLL_OFFSET_MS,this.leftPaused=!1,this.rightPaused=!1,this.rafId=null}initLatestNews(e){this.data=e;const n=this.appendLeftNewsElement(),r=this.appendRightNewsElement();n.style.transform="translateY(0)",r.style.transform="translateY(0)",this.initRolling()}initRolling(){this.rafId=requestAnimationFrame(this.loop.bind(this)),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(this.leftLastRoll=performance.now(),this.rightLastRoll=performance.now()+g.ROLL_OFFSET_MS)})}loop(e){!this.leftPaused&&this.shouldRoll(e,"left")&&(this.leftRoll(),this.leftLastRoll=e),!this.rightPaused&&this.shouldRoll(e,"right")&&(this.rightRoll(),this.rightLastRoll=e),this.rafId=requestAnimationFrame(this.loop.bind(this))}shouldRoll(e,n){const r=n==="left"?this.leftLastRoll:this.rightLastRoll;return e-r>=g.ROLL_INTERVAL_MS}leftRoll(){this.lastIndex++,this.lastIndex%=this.data.length,this.leftIndex=this.lastIndex;const e=this.appendLeftNewsElement(),n=this.leftNewsContainer.firstElementChild;this.roll(e,n)}rightRoll(){this.lastIndex++,this.lastIndex%=this.data.length,this.rightIndex=this.lastIndex;const e=this.appendRightNewsElement(),n=this.rightNewsContainer.firstElementChild;this.roll(e,n)}roll(e,n){requestAnimationFrame(()=>{e.style.transform="translateY(0)",n.style.transform="translateY(-50px)"}),n.addEventListener("transitionend",()=>{n.remove()})}appendLeftNewsElement(){const e=this.createNewsElement(this.leftIndex);return e.addEventListener("mouseenter",()=>this.pause("left")),e.addEventListener("mouseleave",()=>this.resume("left")),this.leftNewsContainer.appendChild(e),e}appendRightNewsElement(){const e=this.createNewsElement(this.rightIndex);return e.addEventListener("mouseenter",()=>this.pause("right")),e.addEventListener("mouseleave",()=>this.resume("right")),this.rightNewsContainer.appendChild(e),e}pause(e){e==="left"?this.leftPaused=!0:this.rightPaused=!0}resume(e){e==="left"?(this.leftPaused=!1,this.leftLastRoll=performance.now(),this.rightPaused||(this.rightLastRoll=this.leftLastRoll+g.ROLL_OFFSET_MS)):(this.rightPaused=!1,this.rightLastRoll=this.leftLastRoll+g.ROLL_OFFSET_MS)}createNewsElement(e){const n=document.createElement("article");n.classList.add("latest-news__item");const r=document.createElement("p");r.textContent=this.data[e].press;const s=document.createElement("a");return s.target="_blank",s.textContent=this.data[e].mainTitle,s.href=this.data[e].mainLink,n.appendChild(r),n.appendChild(s),n}}const m=new Map,C=new Set;function rt(t){return C.add(t),()=>C.delete(t)}function st(t){C.forEach(e=>e(t))}function b(t){return!!m.get(t)}function x(t){return m.get(t)??null}function A(t){b(t)?m.delete(t):m.set(t,new Date),st(t)}function it(){return m.size}function ot(){return Array.from(m.entries()).sort(([,t],[,e])=>new Date(t)-new Date(e)).map(([t])=>t)}let q=c.ALL;const R=new Set;function at(t){return R.add(t),()=>R.delete(t)}function lt(){R.forEach(t=>t(q))}function w(){return q}function S(t){q=t,lt()}const ct=4,ut=6,p=ct*ut,dt=4;function gt(){let t=0,e=$();return{setStrategy(n){e=n===o.GRID?$():ht(),t=0},reset(){t=0},next(){t++},prev(){t--},setPage(n){t=n},getCurrentPage(){return t},getPageData(n){return e?e.getPageSlice(n,t):[]},getPageSize(){return e?e.getPageSize():-1},getArrowState(n){return e?{showPrev:t>0,showNext:t<e.getTotalPages(n)-1}:{showPrev:!1,showNext:!1}},getTotalPages(n){return e.getTotalPages(n)}}}function $(){return{getTotalPages(t){return Math.min(dt,Math.ceil(t.length/p)||1)},getPageSlice(t,e){const n=e*p;let r=t.slice(n,n+p);for(let s=r.length;s<p;s++)r.push(null);return r},getPageSize(){return p}}}function ht(){return{getTotalPages(t){return t.length},getPageSlice(t,e){return t[e]},getPageSize(){return 1}}}function G(t){return`
    <button class="button-label bg-${t===o.GRID?"white":"gray"}">

      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z" fill="currentColor"/>
      </svg>
      <p>구독하기</p>
      
    </button>
  `}function V(t){return`
    <button class="button-label bg-${t===o.GRID?"gray":"white"}">
      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.6 9L3 8.4L5.4 6L3 3.6L3.6 3L6 5.4L8.4 3L9 3.6L6.6 6L9 8.4L8.4 9L6 6.6L3.6 9Z" fill="currentColor"/>
      </svg>
      ${t===o.GRID?"<p>해지하기</p>":""}
    </button>
  `}function ft(){return`
    <ul class="press-grid__list">
    </ul>
  `}function mt({pressId:t,pressName:e,logoSrc:n,isSubscribed:r}){return`
    <li class="press-grid__item" data-label="${e}">
      <img src="${n}" alt="${e}" />
      ${r?V(o.GRID):G(o.GRID)}
    </li>
    
  `}function pt(){return`
    <li class="press-grid__item empty">
    </li>
  `}function Lt(t){wt(),bt(t)}function bt(t){let e="";const n=document.documentElement.getAttribute("data-theme");t.forEach(r=>{r?e+=mt({pressId:r.id,pressName:r.name,logoSrc:n==="light"?r.logo:r.darkLogo,isSubscribed:b(r.name)}):e+=pt()}),document.querySelector(".press-grid__list").innerHTML=e}function wt(){document.querySelector(".press-section").innerHTML=ft()}function vt(){return'<nav class="press-tabs" aria-label="언론사 카테고리">'}function Tt(){return"</nav>"}function St({selected:t,tabName:e,currentPress:n,totalPress:r}){return t?`
    <button
      class="press-tabs__item active"
      aria-current="true"
    >
      <p class="press-tabs__title">${e}</p>
      ${r?`<p class="press-tabs__description">
            ${n}<span> / ${r} </span>
          </p>`:`<svg
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.48329 10.5L4.66663 9.68333L7.34996 7L4.66663 4.31667L5.48329 3.5L8.98329 7L5.48329 10.5Z"
              fill="currentColor"
            />
          </svg>`}
    </button>
  `:`
    <button class="press-tabs__item">
      <p class="press-tabs__title">${e}</p>
    </button>
  `}function _t({logo:t,name:e,time:n,isSubscribed:r,mainNews:s,subNews:i}){return`
    <section class="press-feed" data-label="${e}">
      <!-- 언론사 정보 -->
      <header class="press-feed__header">
        <img src="${t}" alt="${e}" class="press-feed__logo" />
        <time
          datetime="${n}"
          class="press-feed__time"
        >
          ${n} 편집
        </time>
        ${r?V(o.LIST):G(o.LIST)}
      </header>
      <div class="press-feed__container">
        <!-- 메인 뉴스 -->
        <a href="${s.link}" target="_blank">
          <article class="press-feed__lead">
            <img
              src="${s.thumbnail}"
              alt="메인 뉴스 썸네일"
              class="press-feed__thumbnail"
            />
            <h3 class="press-feed__headline">
              ${s.title}
            </h3>
          </article>
        </a>

        <!-- 서브 뉴스 -->
        <ul class="press-feed__list">
          <li> 
            <a href="${i[0].link}" target="_black">${i[0].title}</a>
          </li>
          <li> 
            <a href="${i[1].link}" target="_black">${i[1].title}</a>
          </li>
          <li> 
            <a href="${i[2].link}" target="_black">${i[2].title}</a>
          </li>
          <li> 
            <a href="${i[3].link}" target="_black">${i[3].title}</a>
          </li>
          <li> 
            <a href="${i[4].link}" target="_black">${i[4].title}</a>
          </li>
          <li> 
            <a href="${i[5].link}" target="_black">${i[5].title}</a>
          </li>
          <p class="press-feed__note">
            ${e} 언론사에서 직접 편집한 뉴스입니다.
          </p>
        </ul>
      </div>
    </section>`}function yt(){return`
    <div style="padding: 16px">
      <span>구독한 언론사가 없습니다.</span>
    </div>
    `}function Et(t,e){It(t,e)}function It(t,e){const n=document.querySelector(".press-section");n.innerHTML=Ct(t,e)+Pt(t)}function Ct(t,e){const{tabList:n,selectedTab:r,selectedTabTotal:s}=Rt(t);let i="";return i+=vt(),i+=n.map(a=>St({selected:a===r,tabName:a,currentPress:e+1,totalPress:s})).join(""),i+=Tt(),i}function Rt(t){switch(w()){case c.ALL:return{tabList:Object.values(O),selectedTab:t.category,selectedTabTotal:t.totalPage};case c.MY:return{tabList:ot(),selectedTab:t?t.name:null,selectedTabTotal:null}}}function Pt(t){if(t){const e=document.documentElement.getAttribute("data-theme");return _t({...t,logo:e==="dark"?t.darkLogo:t.logo,isSubscribed:b(t.name)})}else return yt()}function kt(){return`
    <div class="spinner-container">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
          stroke="black"
          stroke-opacity="0.3"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M12 3C16.9706 3 21 7.02944 21 12"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>
  `}const N={dark_mode:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>',light_mode:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>'};function Mt(){const t=window.matchMedia("(prefers-color-scheme: dark)");y(t.matches?"dark":"light"),t.addEventListener("change",n=>{y(n.matches?"dark":"light")});const e=document.querySelector(".theme-toggle-button");e.onclick=()=>{const r=document.documentElement.getAttribute("data-theme")==="light"?"dark":"light";y(r)}}const P=new Set;function qt(t){return P.add(t),()=>P.delete(t)}function y(t){document.querySelector(".theme-toggle-button").firstElementChild.innerHTML=t==="light"?N.dark_mode:N.light_mode,document.documentElement.setAttribute("data-theme",t),P.forEach(e=>e(t))}let f=[],u=[],L=null;const xt=2e4,l=gt();function At(t){const e=K(t);f=e,u=e,Bt(),$t(),Dt(),Gt(),tt(n=>{l.setStrategy(n),w()===c.ALL&&(f=W(n,e)),u=E(f),Ot(n),d()}),at(n=>{u=E(f),l.reset(),Nt(n),d()}),rt(()=>{B(),u=E(f),d()}),qt(()=>{d()}),T(o.LIST),S(c.ALL),B()}function E(t){return w()===c.MY?t.filter(({name:e})=>b(e)).sort((e,n)=>{const r=x(e.name),s=x(n.name);return new Date(r)-new Date(s)}):t}function d(){const t=l.getPageData(u);switch(L&&clearTimeout(L),v()){case o.GRID:Lt(t);break;case o.LIST:const i=l.getCurrentPage(),a=X(f,i);Et(t,a),Vt(),k();break}const{showPrev:e,showNext:n}=l.getArrowState(u),r=document.querySelector(".press-list__control--prev"),s=document.querySelector(".press-list__control--next");r.classList.toggle("hidden",!e),s.classList.toggle("hidden",!n)}function B(){const t=it(),[e,n]=document.querySelectorAll(".press-news__tab");n.querySelector("span").textContent=t}function $t(){const[t,e]=document.querySelectorAll(".press-news__tab");t.addEventListener("click",()=>{S(c.ALL)}),e.addEventListener("click",()=>{S(c.MY)})}function Nt(t){const[e,n]=document.querySelectorAll(".press-news__tab");switch(t){case c.ALL:e.classList.add("active"),n.classList.remove("active");break;case c.MY:n.classList.add("active"),e.classList.remove("active");break}}function Bt(){const[t,e]=document.querySelectorAll(".view-toggle");e.addEventListener("click",()=>{T(o.GRID)}),t.addEventListener("click",()=>{T(o.LIST)})}function Ot(t){const[e,n]=document.querySelectorAll(".view-toggle");switch(t){case o.GRID:n.classList.add("active"),e.classList.remove("active");break;case o.LIST:e.classList.add("active"),n.classList.remove("active");break}}function Dt(){const t=document.querySelector(".press-list__control--prev"),e=document.querySelector(".press-list__control--next");t.addEventListener("click",()=>{l.prev(),d(),k()}),e.addEventListener("click",()=>{l.next(),d(),k()})}function Gt(){const t=document.querySelector(".press-section"),e=document.querySelector(".press-list__dialog"),[n,r]=e.querySelectorAll(".dialog-button");t.addEventListener("click",s=>{const i=s.target.closest("[data-label]");if(!i)return;const a=i.dataset.label;if(!a)return;const h=s.target.closest("button");h&&(b(a)?(e.querySelector("strong").textContent=a,e.setAttribute("open","")):(h.innerHTML=kt(),A(a),v()==o.LIST&&S(c.MY)))}),n.addEventListener("click",()=>{const s=n.closest("dialog").querySelector("strong").textContent;A(s),e.removeAttribute("open"),w()===c.MY&&v()===o.LIST&&(l.getCurrentPage()>=l.getTotalPages(u)-1?l.reset():l.next())}),r.addEventListener("click",()=>{e.removeAttribute("open")})}function Vt(){document.querySelector(".press-tabs").addEventListener("click",e=>{const r=e.target.closest(".press-tabs__item").firstElementChild.textContent;Ht(r)})}function Ht(t){let e=0;switch(w()){case c.ALL:e=J(u,t);break;case c.MY:e=u.findIndex(n=>n.name===t);break}l.setPage(e),d()}function k(){L&&clearTimeout(L),L=setTimeout(()=>{l.getCurrentPage()>=l.getTotalPages(u)-1?l.reset():l.next(),d()},xt)}Zt();function Zt(){Mt(),nt(),Ft()}function Ft(){fetch("/fe-news/dummy/articlesData.json").then(t=>t.json()).then(t=>(new g().initLatestNews(t),At(t),t)).catch(t=>{console.log(t),document.querySelector(".newsstand-main").innerHTML="<span>데이터를 불러오는 중 오류가 발생했습니다.</span>"})}
