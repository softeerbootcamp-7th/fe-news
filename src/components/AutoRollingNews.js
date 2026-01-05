export const AutoRollingNews = () => {
  const newsAreasHtml = rollingNewsList
    .map(
      (list, _) => `
      <div class="flex-1 bg-surface-alt overflow-hidden h-12">
        dd
      </div>
    `
    )
    .join("");

  return `
    <section class="flex gap-2 mt-8">
      ${newsAreasHtml}
    </section>
  `;
};
