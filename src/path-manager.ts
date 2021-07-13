let currentPath: string = "";

export function setPath(path: string): void {
    currentPath = path;
}

export function getPath(): string {
    return currentPath;
}