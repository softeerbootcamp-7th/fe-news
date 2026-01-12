import { HeadHandler } from './utils/headHandler.js';
import { fetchNaverData } from './utils/naverParser.js';
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
  async fetch(req, env, ctx) {
    // Cloudflare Workers의 Cache API 사용
    const cache = caches.default;
    const naverData = await fetchNaverData(cache);
    const res = await this.env.ASSETS.fetch(req);
    return new HTMLRewriter().on('head', new HeadHandler(naverData)).transform(res);
  }
}