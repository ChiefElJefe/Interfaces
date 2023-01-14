const { app, BrowserWindow, dialog } = require('electron')
const { electron } = require('process')
require('@electron/remote/main').initialize()
const electorn = require('electron')
const Menu = electorn.Menu

let mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Parent',
    width: 400,
    height: 600,
    maxHeight: 500,
    maxWidth: 700,
    /* frame: false, */
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  /* childWindow = new BrowserWindow({
    width: 400,
    height: 600,
    parent: mainWindow,
    modal: false,
    show: false,
    title: 'Child',
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  childWindow.loadURL('https://github.com')
   /* childWindow.once('ready-to-show', () => {
    childWindow.show()
  }) */

  require("@electron/remote/main").enable(mainWindow.webContents)

  mainWindow.loadFile('pag1.html')
  //mainWindow.webContents.openDevTools()
  //mainWindow.setMenu()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

/* Crear el siguiente menu para una aplicación que se llama CASA

Menu Casa

- Habitaciones

    * Habitación 1

    * Habitación 2

 -  Salón Ctrl+S

-  SEPARADOR

- Cocina Ctrl+C

-  Baño Ctrl+B

Menu Extras

   - Garaje Alt+G

     - Trastero Alt+T

Menu Descripción Casa

  Al hacer click en este menu se abre un dialog que nos indica los elementos sobre los que se ha hecho click */

let clicada = [{ clic: false, tipo: 'Casa' },
{ clic: false, tipo: 'Habitaciones' },
{ clic: false, tipo: 'Habitación1' },
{ clic: false, tipo: 'Habitación2' },
{ clic: false, tipo: 'Salón' },
{ clic: false, tipo: 'Cocina' },
{ clic: false, tipo: 'Baño' },
{ clic: false, tipo: 'Extras' },
{ clic: false, tipo: 'Garage' },
{ clic: false, tipo: 'Trastero' }
]

app.on('ready', function () {
  createWindow()
  const template = [{
    label: 'Casa',
    click: () => {
      
      dialog.showErrorBox('Alarm','Alarm')
      clicada[0].clic = true
      
    },
    submenu: [{
      label: 'Habitaciones',
      click: () => {
        clicada[1].clic = true
      },
      submenu: [{
        label: 'Habitacion1',
        click: () => {
          clicada[2].clic = true
        }

      },
      {
        label: 'Habitacion2',
        click: () => {
          clicada[3].clic = true
        },
      }],
    }, {
      label: 'Salón',
      accelerator: 'CmdOrCtrl + S',
      click: () => {
        clicada[4].clic = true
      }
    }, {
      type: 'separator'
    }, {
      label: 'Cocina',
      accelerator: 'CmdOrCtrl + C',
      click: () => {
        clicada[5].clic = true
      }
    }, {
      label: 'Baño',
      accelerator: 'CmdOrCtrl + B',
      click: () => {
        clicada[6].clic = true
      }
    }]
  }, {
    label: 'Extras',
    submenu: [{
      label: 'Garage',
      accelerator: 'Alt + G',
      click: () => {
        clicada[8].clic = true
      },
      submenu: [{
        label: 'Trastero',
        accelerator: 'Alt + T',
        click: () => {
          clicada[9].clic = true
        }
      }]
    }],
    click: () => {
      clicada[7].clic = true
    }
  }, {
    label: 'Descripción Casa',
    click: () => {
      let cat = ''
      for (let i = 0; i < clicada.length; i++) {
        if (clicada[i].clic) {
          cat += 'Clicado: ' + clicada[i].tipo +'\n'
        }
      }

      dialog.showMessageBoxSync(null, {message: cat})
    }
  }]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})