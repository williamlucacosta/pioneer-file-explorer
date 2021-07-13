import { ipcRenderer } from "electron";

export const WINDOW_CHANNEL = "ipc-window-control";
export enum WINDOW_COMMANDS {
    CLOSE = "ipc-window-close",
    MAXIMIZE = "ipc-window-maximize",
    MINIMIZE = "ipc-window-minimize"
}

export function AddWindowControl(buttonSelector: string, windowCommand: WINDOW_COMMANDS): void {
    ( <HTMLElement> document.querySelector(buttonSelector)).addEventListener("click", () => {
        ipcRenderer.send(WINDOW_CHANNEL, windowCommand)
    });
}