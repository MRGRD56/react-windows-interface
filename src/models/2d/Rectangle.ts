import IPoint from "./IPoint";
import ISize from "./ISize";
import IRectangle from "./IRectangle";
import Size from "./Size";
import Point from "./Point";

export default class Rectangle implements IRectangle {
    constructor(
        public point: IPoint,
        public size: ISize) {
    }

    get style() {
        return {
            left: this.point.x,
            top: this.point.y,
            width: this.size.width,
            height: this.size.height
        };
    }

    static get defaultWindowRectangle(): Rectangle {
        return new Rectangle(new Point(30, 30), new Size(300, 300));
    }

    static getScreenCenter(size: ISize): Rectangle {
        const screenCenterPoint = Point.screenCenter;
        return new Rectangle(
            new Point(
                screenCenterPoint.x - size.width / 2,
                screenCenterPoint.y - size.height / 2
            ),
            size
        );
    }
}
