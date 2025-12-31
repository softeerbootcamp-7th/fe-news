export const TOTAL_PRESS = 96;
export const PER_PAGE = 24;

export const pressLogos = Array.from(
    { length: TOTAL_PRESS },
    (_, i) => ({
        id: i + 1,
        src: `/src/assets/press-logo/light/${i + 1}.png`
    })
);
