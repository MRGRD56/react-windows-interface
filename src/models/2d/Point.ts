import IPoint from "./IPoint";
import Size from "./Size";

export default class Point implements IPoint {
    constructor(
        public x: number,
        public y: number) {
    }

    static get screenCenter(): Point {
        const screenSize = Size.screenSize;
        return new Point(
            Math.round(screenSize.width / 2),
            Math.round(screenSize.height / 2));
    }
}
