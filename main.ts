import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron'
import * as IPC_WINDOW from './src/js/menu-handler'


// WINDOW
function CreateWindow(): BrowserWindow {
    const window = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
        closable: true,
        minimizable: true,
        maximizable: true
    })

    /* Load the HTML file */
    const indexHTML = path.join(__dirname + '/src/index.html');
    window.loadFile(indexHTML).then(() => {
        // IMPLEMENT FANCY STUFF HERE
    });
    // window.loadFile('./src/index.html')

    return window
}

app.whenReady().then(() => {
    const window = CreateWindow()

    ipcMain.on(IPC_WINDOW.CHANNEL, (event, arg) => {
        switch(arg) {
            case IPC_WINDOW.COMMANDS.CLOSE:
                window.close()
                break
            case IPC_WINDOW.COMMANDS.MAXIMIZE:
                if (window.isMaximized() === true) {window.unmaximize()}
                else {window.maximize()}
                break
            case IPC_WINDOW.COMMANDS.MINIMIZE:
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