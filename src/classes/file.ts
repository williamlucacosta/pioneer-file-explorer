import { Bytes, FileSystemElement } from "../types"

export class File extends FileSystemElement {
    constructor(name: string, size: Bytes, path: string) {
        super(name, size, path);
    }
}