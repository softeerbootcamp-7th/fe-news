import "../style/headelineSlider.css";
import rollingSection from "./rollingSection";

const sliderManager = {
  isHovered: false,
  sliders: [],
};

export default function headelineSlider() {
  return /* html */ `
    <section class="headline-section" aria-label="주요 헤드라인">
      <div class="headline-container">
        ${rollingSection(0, "left", 0, sliderManager)}
        ${rollingSection(5, "right", 1000, sliderManager)}
      </div>
    </section>
  `;
}
