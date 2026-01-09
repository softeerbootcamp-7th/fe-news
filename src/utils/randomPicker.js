export const pickRandomNumberList = (param) => {
    const randomNumberList = [];

    for (let i = 1; i <= param.count; i += 1) {
        randomNumberList.push(Math.floor(Math.random() * param.range));
    }

    return randomNumberList;
}