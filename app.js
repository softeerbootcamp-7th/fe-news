import { initAfterNewsLoad } from './initAfterNewsLoad.js';
import { loadNews } from './store/newsStore.js';

loadNews().then(initAfterNewsLoad);