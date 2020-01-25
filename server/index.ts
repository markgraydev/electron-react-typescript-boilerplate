import { app, BrowserWindow } from "electron";

let mainWindow: Electron.BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 800
  });

  await mainWindow.loadFile("../public/index.html");

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async () => {
  if (mainWindow === null) {
    await createWindow();
  }
});
