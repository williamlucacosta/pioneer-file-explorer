import M_PATH from 'path';
import fs from 'fs';

import * as PATH_MANAGER from './path-manager'

import { File, Directory, FileSystemElement } from './types';

let currentFiles: FileSystemElement[] = [];

export function getFiles(): FileSystemElement[] {
    return currentFiles;
}

export function setFiles(files: FileSystemElement[]): void {
    currentFiles = files;
}

export function setPathFiles(path?: string): void {
    currentFiles = path === undefined ? getPathFiles(PATH_MANAGER.getPath()) : getPathFiles(path)
}

export function getPathFiles(path?: string): FileSystemElement[] {
    const usingPath = path === undefined ? PATH_MANAGER.getPath() : path

    const files: FileSystemElement[] = fs.readdirSync(usingPath).map(name => {
        const stats = fs.statSync(M_PATH.join(usingPath, name))

        if(stats.isDirectory()) {
            return new Directory(name, stats.size, M_PATH.join(usingPath, name))
        } else {
            return new File(name, stats.size, M_PATH.join(usingPath, name))
        }
    });

    files.sort((a) => {
        return a instanceof Directory ? -1 : 1
    });

    return files;
}