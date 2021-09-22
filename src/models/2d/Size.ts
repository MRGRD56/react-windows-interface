import ISize from "./ISize";
import {CSSProperties} from "react";

export default class Size implements ISize {
    constructor(
        public width: number,
        public height: number) {
    }

    static get screenSize(): Size {
        return new Size(window.innerWidth, innerHeight);
    }

    static getStyle(size: ISize): CSSProperties {
        return {
            width: size.width,
            height: size.height
        };
    }

    get style() {
        return Size.getStyle(this);
    }
}
