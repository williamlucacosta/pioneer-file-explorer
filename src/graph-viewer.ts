import { Point, Viewer, FileSystemElement, Directory } from "./types"

import * as FILE_MANAGER from './file-manager'
import Konva from "konva";


export class GraphViewer implements Viewer {
    stage: Konva.Stage;
    layer: Konva.Layer;
    parentElement: HTMLElement;
    
    constructor(canvasSelector: string) {
        this.parentElement = <HTMLElement> document.querySelector("#graph-viewer-container");
        const parentWidth: number = this.parentElement.clientWidth;
        const parentHeight: number = this.parentElement.clientHeight;

        this.stage = new Konva.Stage({
            container: 'graph-viewer-container',
            width: parentWidth,
            height: parentHeight,
        });

        this.layer = new Konva.Layer();

        this.fitStageIntoParentContainer();

        window.addEventListener('resize', this.fitStageIntoParentContainer);
    }

    draw(): void {
        this.getCenter().draw(this.layer, '#ffffff');

        this.drawFiles(FILE_MANAGER.getFiles());

        this.stage.add(this.layer);
    }

    fitStageIntoParentContainer() {
        var zoom: number = 1000;
        var scale: number = this.parentElement.clientWidth / zoom;

        this.stage.width(zoom * scale);
        this.stage.height(zoom * scale);
        this.stage.scale({ x: scale, y: scale });
    }

    getCenter(): Point {
        const centerX: number = this.parentElement.clientWidth/2;
        const centerY: number = this.parentElement.clientHeight/2;

        return new Point(centerX, centerY);
    }

    drawFiles(files: FileSystemElement[]): void {
        const filesNumber: number = files.length
        let i: number;
        
        for(i = 0; i < filesNumber; i++)
        {
            const angle: number = i * (360/filesNumber)
            const pointX: number = this.getCenter().x + 50*Math.cos(degreesToRadians(angle))
            const pointY: number = this.getCenter().y - 50*Math.sin(degreesToRadians(angle))
            const point: Point = new Point(pointX, pointY);
            const pointColor: string = files[i] instanceof Directory ? "#9D9A37" : "#ffffff"

            point.draw(this.layer, pointColor)
        } 
    }
}

function degreesToRadians(degrees: number): number
{
    var pi = Math.PI;
    return degrees * (pi/180);
}