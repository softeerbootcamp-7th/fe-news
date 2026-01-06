import GridView from '@/assets/images/light_mode_logo/grid-view.png';
import ListView from '@/assets/images/light_mode_logo/list-view.png';
import LeftButton from '@/assets/images/light_mode_logo/LeftButton.png';
import RightButton from '@/assets/images/light_mode_logo/RightButton.png';

export const PressView = () => {
    return `
      <div id="gridView">
        <div id="tabAndViewer">
          <div id="tabButton">
            <div id="allPress">전체 언론사</div>
            <div class="subscribedPress">
              <div class="title">내가 구독한 언론사</div>
              <div class="badge">8</div>
            </div>
          </div>
          <div id="viewButton">
            <img class="listViewIcon" src="${ListView}">
            <img class="gridViewIcon" src="${GridView}">
          </div>
        </div>
        <div id="viewArea">
          <img class="left" src="${LeftButton}">
          <div class="center"></div>
          <img class="right" src="${RightButton}">
        </div>
      </div>
    `
};