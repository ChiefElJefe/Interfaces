const fs = require('fs');

const { dialog } = require('@electron/remote')

const canvas = document.getElementById('myCanvas')

const ctx = canvas.getContext('2d')
ctx.fillstyle = 'red'