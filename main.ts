import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron'

import * as IPC_MANAGER from './src/ipc-manager'


// WINDOW
function CreateWindow(): BrowserWindow {
    const window = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegrationInWorker: true,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, './preload.js')
        },
        closable: true,
        minimizable: true,
        maximizable: true
    })

    /* Load the HTML file */
    const indexHTML = path.join(__dirname + '/../src/index.html');
    window.loadFile(indexHTML).then(() => {
        // IMPLEMENT FANCY STUFF HERE
    });
    
    return window
}

app.whenReady().then(() => {
    const window = CreateWindow()

    ipcMain.on(IPC_MANAGER.WINDOW_CHANNEL, (event, arg) => {
        switch(arg) {
            case IPC_MANAGER.WINDOW_COMMANDS.CLOSE:
                window.close()
                break
            case IPC_MANAGER.WINDOW_COMMANDS.MAXIMIZE:
                if (window.isMaximized() === true) {window.unmaximize()}
                else {window.maximize()}
                break
            case IPC_MANAGER.WINDOW_COMMANDS.MINIMIZE:
                window.minimize()
                break
        }
    })

    /* Open a window if none are open (macOS) */
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) { CreateWindow() }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { app.quit() }
})