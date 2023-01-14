const fs = require('fs');
let fichero = fs.readFileSync('./ingredientes.json');
let pdf = require('html-pdf');

let ingredientes = JSON.parse(fichero).ingredientes;
let cadenaIng = '';
for (let i = 0; i < ingredientes.length; i++) {
    cadenaIng += '<div class="checkbox">' +
        '<label>' +
        '<input type="checkbox" id="ingrediente' + i + '" value="' + ingredientes[i] + '">' + ingredientes[i] +
        '</label>' +
        '</div>';
}

document.getElementById('ingredientes').innerHTML = cadenaIng;

let id2 = document.getElementById('btn2');
let id1 = document.getElementById('btn1');

/* let tamanno = () => {
    let valueres ="";
    let r1 = document.getElementById('rpeque');
    let r2 = document.getElementById('rmediano');
    let r3 = document.getElementById('rgrande');
    if (r1.checked) {
        valueres = r1.value;
    }
    if (r2.checked) {
        valueres = r2.value;
    }
    if (r3.checked) {
        valueres = r3.value
    }
    return valueres;
}

let grosor = () => {
    let valueres;
    let r1 = document.getElementById('rDelgado');
    let r2 = document.getElementById('rGrueso');
    if (r1.checked) {
        valueres = r1.value;
    }
    if (r2.checked) {
        valueres = r2.value;
    }
    return valueres;
}

let ingre = () => {
    let valueres;
    for (let index = 0; index < ingredientes.length; index++) {
        let ing = document.getElementById('ingrediente' + i);
        if (ing.checked) {
            valueres.push(ing.value);
        }
    }
    return valueres;
}

let datCliente = () => {
    let valueres;
    let r1 = document.getElementById('idNombre').value;
    let r2 = document.getElementById('idTelefono').value;
    let r3 = document.getElementById('idDireccion').value;
    valueres.push(r1);
    valueres.push(r2);
    valueres.push(r3);

    return valueres;
} */

id1.addEventListener('click', ()=>{
    let nombre = document.getElementById('idNombre').value
    let telefono = document.getElementById('idTelefono').value
    let direccion = document.getElementById('idDireccion').value
    let tama = '';
    let groso = '';
    let ingredient = '';
    let cadpedido ='';
    
    if (document.getElementById('rpeque').checked) {
        tama = document.getElementById('rpeque').value;
    }
    if (document.getElementById('rmediano').checked) {
        tama = document.getElementById('rmediano').value;
    }
    if (document.getElementById('rgrande').checked) {
        tama = document.getElementById('rgrande').value;
    }

    if (document.getElementById('rDelgado').checked) {
        groso = document.getElementById('rDelgado').value;
    }
    if (document.getElementById('rGrueso').checked) {
        groso = document.getElementById('rGrueso').value;
    }

    for (let index = 0; index < ingredientes.length; index++) {
        if (document.getElementById('ingrediente'+index).checked) {
            ingredient += '<h1>'+document.getElementById('ingrediente'+index).value + '</h1>'
        }
    }

    cadpedido = '<h1> Nombre: ' + nombre + '</h1>' +
    '<h1> Telefono: ' + telefono + '</h1>' +
    '<h1> Direccion: ' + direccion + '</h1>' +
    '<h1> Tamaño: ' + tama + '</h1>' +
    '<h1> Grosor: ' + groso + '</h1>' +
    '<h1> Ingredientes: </h1>' + ingredient

    pdf.create(cadpedido).toFile('./pdfpedidos/' + nombre + '.pdf', function (err, res) {
        if (err) {
        console.log(err);
        } else {
        console.log(res);
        }
        });
})

