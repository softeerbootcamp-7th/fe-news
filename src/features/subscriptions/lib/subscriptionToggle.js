export async function toggleSubscriptionByPress({
  press,
  subscriptions,
  unsubscribeDialog,
} = {}) {
  if (!press || !subscriptions) return false;
  if (subscriptions.isSubscribed(press)) {
    const ok = await unsubscribeDialog?.confirm?.({
      pressName: press,
    });
    if (!ok) return false;
    subscriptions.remove(press);
  } else {
    subscriptions.add(press);
  }

  subscriptions.updateCount();
  return true;
}

export async function toggleSubscriptionFromTarget({
  target,
  subscriptions,
  unsubscribeDialog,
} = {}) {
  const press = target?.getAttribute?.("data-press") || "";
  return toggleSubscriptionByPress({
    press,
    subscriptions,
    unsubscribeDialog,
  });
}
