import "../style/headelineSlider.css";

export default function headelineSlider() {
  return /* html */ `
        <section class="headline-section" aria-label="주요 헤드라인">
            <ul class="headline-list">
                <li>
                    <article>
                        <h3>연합뉴스</h3>
                        <p>[속보] 도심 공원 '조용한 독서존' 시범 운영...</p>
                    </article>
                </li>
                <li>
                    <article>
                        <h3>서울경제</h3>
                        <p>착한 소비 캠페인, 지역 상권 회복에 긍정적 영향</p>
                    </article>
                </li>
            </ul>
        </section>
    `;
}
