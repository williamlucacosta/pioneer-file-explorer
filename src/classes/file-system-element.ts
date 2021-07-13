import { Bytes } from "../types"

export class FileSystemElement {
    name: string;
    path: string;
    size: Bytes;

    constructor(name: string, size: Bytes, path: string) {
        this.name = name;
        this.size = size;
        this.path = path;
    }

    getReadableSize(): string {
        const units: string[] = ["B", "KB", "MB", "GB", "TB"];
        const pow: number = Math.floor((this.size ? Math.log(this.size) : 0) / Math.log(1024));

        return this.size.toFixed(2) + ' ' + units[pow]; 
    }

    getElement(): HTMLElement {
        const fileContainer: HTMLDivElement = document.createElement("div");
        fileContainer.classList.add("file-container", "flex-centered");

        const fileName: HTMLParagraphElement = document.createElement("p");
        fileName.classList.add("file-name");
        fileName.innerText = this.name;

        fileContainer.appendChild(fileName);

        return <HTMLElement> fileContainer;
    }
}