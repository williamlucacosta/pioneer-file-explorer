"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var electron_1 = require("electron");
var IPC_WINDOW = __importStar(require("./src/js/menu-handler"));
// WINDOW
function CreateWindow() {
    var window = new electron_1.BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path_1.default.join(__dirname, 'preload.js')
        },
        closable: true,
        minimizable: true,
        maximizable: true
    });
    /* Load the HTML file */
    var indexHTML = path_1.default.join(__dirname + '/src/index.html');
    window.loadFile(indexHTML).then(function () {
        // IMPLEMENT FANCY STUFF HERE
    });
    // window.loadFile('./src/index.html')
    return window;
}
electron_1.app.whenReady().then(function () {
    var window = CreateWindow();
    electron_1.ipcMain.on(IPC_WINDOW.CHANNEL, function (event, arg) {
        switch (arg) {
            case IPC_WINDOW.COMMANDS.CLOSE:
                window.close();
                break;
            case IPC_WINDOW.COMMANDS.MAXIMIZE:
                if (window.isMaximized() === true) {
                    window.unmaximize();
                }
                else {
                    window.maximize();
                }
                break;
            case IPC_WINDOW.COMMANDS.MINIMIZE:
                window.minimize();
                break;
        }
    });
    /* Open a window if none are open (macOS) */
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            CreateWindow();
        }
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
