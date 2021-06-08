import { ipcRenderer } from "electron";
import * as IPC_WINDOW from './src/js/menu-handler'
import path from 'path'
import fs from 'fs'

const PATH = "C:/Users/willi/Desktop"

window.addEventListener('DOMContentLoaded', () => {
    const files = fs.readdirSync(PATH).map(file => {
        const stats = fs.statSync(path.join(PATH, file))
        return {
            name: file, 
            size: stats.size ?? 0
        }
    })

    console.log(files)
    // const replaceText = (selector, text) => {
    //   const element = document.getElementById(selector)
    //   if (element) element.innerText = text
    // }
  
    // for (const dependency of ['chrome', 'node', 'electron']) {
    //   replaceText(`${dependency}-version`, process.versions[dependency])
    // }

    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("#graph-viewer");
    const canvasParent = <HTMLCanvasElement> document.querySelector(".graph-viewer-container");

    var ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
    // DrawFunction()

    window.addEventListener("resize", ResizeCanvas);


    // BUTTONS
    ( <HTMLElement> document.getElementById("close-control")).addEventListener("click", () => {
        ipcRenderer.send(IPC_WINDOW.CHANNEL, IPC_WINDOW.COMMANDS.CLOSE  )
    });
    ( <HTMLElement> document.getElementById("maximize-control")).addEventListener("click", () => {
        ipcRenderer.send(IPC_WINDOW.CHANNEL, IPC_WINDOW.COMMANDS.MAXIMIZE  )
    });
    ( <HTMLElement> document.getElementById("minimize-control")).addEventListener("click", () => {
        ipcRenderer.send(IPC_WINDOW.CHANNEL, IPC_WINDOW.COMMANDS.MINIMIZE  )
    });


    // FUNCTIONS
    function ResizeCanvas() {
        canvas.width = canvasParent.clientWidth
        canvas.height = canvasParent.clientHeight

        // DrawFunction()
    }

    function FormatSize(size: number) {
        
    }
  });

export {};