import * as IPC_MANAGER from './src/ipc-manager'
import * as PATH_MANAGER from './src/path-manager'
import * as FILE_MANAGER from './src/file-manager'

import { GraphViewer, ListViewer } from "./src/types";


PATH_MANAGER.setPath("C:/Users/willi/Desktop");
FILE_MANAGER.setPathFiles();

window.addEventListener('DOMContentLoaded', () => {
    IPC_MANAGER.AddWindowControl("#close-control", IPC_MANAGER.WINDOW_COMMANDS.CLOSE);
    IPC_MANAGER.AddWindowControl("#maximize-control", IPC_MANAGER.WINDOW_COMMANDS.MAXIMIZE);
    IPC_MANAGER.AddWindowControl("#minimize-control", IPC_MANAGER.WINDOW_COMMANDS.MINIMIZE);

    const graphViewer = new GraphViewer("#graph-viewer");
    graphViewer.draw();


    const listViewer = new ListViewer("#list-viewer")
    listViewer.draw();
});

export {};