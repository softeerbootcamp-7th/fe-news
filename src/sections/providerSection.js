import { initPressGrid } from '../components/pressGrid';
import { initPressList } from '../components/pressList';
import { initNavigation } from '../components/navigation';
import { initTextTabs } from '../components/textTabs';
import { initIconTabs } from '../components/iconTabs';
import { initProviderView } from '../components/providerView';
import { initProviderController } from '../controllers/providerController';

export function initProviderSection() {
  const grid = initPressGrid();
  const list = initPressList();
  const providerView = initProviderView();

  const navigation = initNavigation({
    onPrev: () => controller.goPrev(),
    onNext: () => controller.goNext(),
  });

  const controller = initProviderController({
    grid,
    list,
    navigation,
  });

  controller.render();

  initTextTabs((tab) => {
    controller.setTab(tab);
  });

  initIconTabs((view) => {
    providerView.setView(view);
    controller.setView(view);
  });
}
