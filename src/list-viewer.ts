import { getPath } from "./path-manager"
import { getPathFiles } from "./file-manager";

import { Viewer, FileSystemElement } from "./types"

export class ListViewer implements Viewer {
    container: HTMLElement;

    constructor(containerSelector: string) {
        this.container = <HTMLElement> document.querySelector(containerSelector);
    }

    draw(): void {
        this.showFiles()
    }


    showFiles() {
        const files: FileSystemElement[] = getPathFiles(getPath()) 

        files.forEach((file) => {
            const fileElement: HTMLElement = file.getElement();
    
            this.container.appendChild(fileElement);
        })
    }

    clearFiles(): void {
        this.container.innerHTML = '';
    }
}