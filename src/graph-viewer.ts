import { Point, Viewer, FileSystemElement, Directory } from "./types"

import * as FILE_MANAGER from './file-manager'
import Konva from "konva";


export class GraphViewer implements Viewer {
    stage: Konva.Stage;
    layer: Konva.Layer;
    parentElement: HTMLElement
    startParentWidth: number;
    startParentHeight: number;
    
    constructor(parentSelector: string) {
        this.parentElement = <HTMLDivElement> document.querySelector(parentSelector);
        this.startParentWidth = this.parentElement.clientWidth;
        this.startParentHeight = this.parentElement.clientHeight;

        this.stage = new Konva.Stage({
            container: 'graph-viewer-container',
            width: this.startParentWidth,
            height: this.startParentHeight,
        });
        this.layer = new Konva.Layer();

        this.stage.add(this.layer);
        
        this.fitStageIntoParentContainer();
        window.addEventListener('resize', (event) => {this.fitStageIntoParentContainer();});
    }

    draw(): void {
        this.getCenter().draw(this.layer, '#ffffff');

        this.drawFiles(FILE_MANAGER.getFiles());

        this.layer.draw();
    }

    fitStageIntoParentContainer() {
        this.stage.width(this.parentElement.clientWidth);
        this.stage.height(this.parentElement.clientHeight);
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