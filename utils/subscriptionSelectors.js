import { getSubscribedSet } from "./subscriptionStore.js";

export function getSubscribedPresses(allPresses) {
    const subscribed = getSubscribedSet();
    return allPresses.filter(p => subscribed.has(p.name));
}