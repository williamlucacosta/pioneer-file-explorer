import { Point, Viewer, File } from "./types"

import * as FILE_MANAGER from './file-manager'


export class GraphViewer implements Viewer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    
    constructor(canvasSelector: string) {
        this.canvas = <HTMLCanvasElement> document.querySelector(canvasSelector);
        this.context = <CanvasRenderingContext2D> this.canvas.getContext("2d");

        this.addListeners()
    }

    draw(): void {
        this.resizeCanvasToParent()

        const files: File[] = FILE_MANAGER.getFiles();
        let i: number;

        const centerPoint = this.getCenter()
        centerPoint.Draw(this.context, '#ffffff');

        const filesNumber: number = files.length
        
        for(i = 0; i < filesNumber; i++)
        {
            const angle: number = i * (360/filesNumber)
            const pointX: number = this.getCenter().x + 50*Math.cos(degreesToRadians(angle))
            const pointY: number = this.getCenter().y - 50*Math.sin(degreesToRadians(angle))
            const point = new Point(pointX, pointY);
            console.log(point);

            point.Draw(this.context)
        } 
    }
    
    addListeners(): void {
        ["load", "resize"].forEach((listener) => {
            window.addEventListener(listener, () => {
                this.draw();
            }, false);
        })
    }

    

    getCenter(): Point {
        const centerX: number = this.canvas.clientWidth/2;
        const centerY: number = this.canvas.clientHeight/2;

        return new Point(centerX, centerY);
    }

    resizeCanvasToParent(): void {
        const parentElement: HTMLElement = <HTMLElement> this.canvas.parentNode

        this.canvas.width = parentElement.clientWidth;
        this.canvas.height = parentElement.clientHeight;
    }

    

    drawPath(path: string): void {
        // Get Files by nesting levels

        // Calculate circle based on nesting level
        // Draw equally distanced points representing files
    }
}

function degreesToRadians(degrees: number): number
{
    var pi = Math.PI;
    return degrees * (pi/180);
}