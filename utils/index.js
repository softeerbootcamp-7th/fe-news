// Fisher-Yates 셔플 알고리즘
export function fisherYatesShuffle(array) {
    const arr = [...array];

    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

