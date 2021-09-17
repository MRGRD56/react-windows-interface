import ISize from "./ISize";

export default class Size implements ISize {
    constructor(
        public width: number,
        public height: number) {
    }

    static get screenSize(): Size {
        return new Size(window.innerWidth, innerHeight);
    }
}
