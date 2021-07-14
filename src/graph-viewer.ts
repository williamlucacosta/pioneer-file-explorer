import { Point, Viewer, FileSystemElement, Directory } from "./types"

import * as FILE_MANAGER from './file-manager'
import Konva from "konva";
import { Vector2d } from "konva/types/types";
import { KonvaEventObject } from "konva/types/Node";

interface Size {
    width: number,
    height: number,
}

export class GraphViewer implements Viewer {
    parentElement: HTMLElement
    stage: Konva.Stage;
    layer: Konva.Layer;
    scaleBy: number = 1.01;

    
    constructor(parentSelector: string) {
        this.parentElement = <HTMLDivElement> document.querySelector(parentSelector);

        this.layer = new Konva.Layer();
        this.stage = new Konva.Stage({
            container: 'graph-viewer-container',
            width: this.parentElement.clientWidth,
            height: this.parentElement.clientHeight,
        });
        this.stage.add(this.layer);
        
        ['load', 'resize'].forEach((listener) => {
            window.addEventListener(listener, this.fitStageIntoParentContainer.bind(this))
        });

        this.stage.on('wheel', (e)=>{console.log("PROVA"); this.testing.bind(this)(e)});
    }

    testing(event: KonvaEventObject<WheelEvent>): void {
        event.evt.preventDefault();
        
        var oldScale = this.stage.scaleX();

        var pointer: Vector2d = <Vector2d> this.stage.getPointerPosition();

        var mousePointTo = {
            x: (pointer.x - this.stage.x()) / oldScale,
            y: (pointer.y - this.stage.y()) / oldScale,
        };

        var newScale = event.evt.deltaY > 0 ? oldScale * this.scaleBy : oldScale / this.scaleBy;

        this.stage.scale({ x: newScale, y: newScale });

        var newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        this.stage.position(newPos);
    }

    draw(): void {
        this.getCenter().draw(this.layer, '#ffffff');

        this.drawFiles(FILE_MANAGER.getFiles());

        this.layer.draw();
    }

    fitStageIntoParentContainer() {
        this.stage.width(this.parentElement.clientWidth);
        this.stage.height(this.parentElement.clientHeight);

        this.layer.destroyChildren();
        this.draw();

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