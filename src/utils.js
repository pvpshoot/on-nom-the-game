import * as R from "ramda";

const randomIntArrayInRange = (min, max, n = 1) =>
    Array.from(
        { length: n },
        () => Math.floor(Math.random() * (max - min + 1)) + min
    );

export const randomPositions = n =>
    R.zip(
        randomIntArrayInRange(0, window.innerWidth, n),
        randomIntArrayInRange(0, window.innerHeight, n)
    );
