import { pressNameFromFilename } from "../../../shared/lib/index.js";

export async function toggleSubscriptionByFilename({
  filename,
  subscriptions,
  unsubscribeDialog,
} = {}) {
  if (!filename || !subscriptions) return false;
  if (subscriptions.isSubscribed(filename)) {
    const ok = await unsubscribeDialog?.confirm?.({
      pressName: pressNameFromFilename(filename),
    });
    if (!ok) return false;
    subscriptions.remove(filename);
  } else {
    subscriptions.add(filename);
  }

  subscriptions.updateCount();
  return true;
}

export async function toggleSubscriptionFromTarget({
  target,
  subscriptions,
  unsubscribeDialog,
} = {}) {
  const encoded = target?.getAttribute?.("data-logo") || "";
  const filename = decodeURIComponent(encoded);
  return toggleSubscriptionByFilename({
    filename,
    subscriptions,
    unsubscribeDialog,
  });
}
