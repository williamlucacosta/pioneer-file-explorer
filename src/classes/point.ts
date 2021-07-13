import Konva from "konva";

export class Point {
    static radius: number = 5;
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw(layer: Konva.Layer, color?: string): void {
        const circle = new Konva.Circle({
            x: this.x,
            y: this.y,
            radius: 5,
            fill: color != undefined ? color : '#808080',
        });

        layer.add(circle)
    }
}