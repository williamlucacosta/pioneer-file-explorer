import { Bytes, FileSystemElement } from "../types"


export class Directory extends FileSystemElement {
    constructor(name: string, size: Bytes, path: string) {
        super(name, size, path);
    }
}