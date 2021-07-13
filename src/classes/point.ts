export class Point {
    static radius: number = 5;
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    Draw(ctx: CanvasRenderingContext2D, color?: string) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Point.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color != undefined ? color : '#666666';
        ctx.fill();
    }
}