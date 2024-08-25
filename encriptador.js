const d = document;
const textArea = d.querySelector(".form__input");
const imagenMuneco = d.querySelector(".resultado__img");
const resultadoTitulo = d.querySelector(".resultado__titulo");
const resultadoTexto = d.querySelector(".resultado__texto");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelector(".form__btn__secundary");
const botonCopiar = d.querySelector(".result__btn");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

// Función para encriptar
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let letra of mensaje) {
        let encriptada = letra;
        for (let [original, reemplazo] of llaves) {
            if (letra === original) {
                encriptada = reemplazo;
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

// Función para desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let [original, reemplazo] of llaves) {
        const regex = new RegExp(reemplazo, "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, original);
    }
    return mensajeDesencriptado;
}

// Actualizar estado de los botones
function actualizarEstadoBotones() {
    const mensaje = textArea.value.trim();
    if (mensaje === "") {
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
    } else {
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
    }
}

// Para eliminar imagen y cambiar mensaje
textArea.addEventListener("input", () => { 
    const mensaje = textArea.value.trim();
    if (mensaje !== "") {
        imagenMuneco.style.display = "none";
        resultadoTitulo.textContent = "Obteniendo mensaje...";
        resultadoTexto.textContent = "";
    } else {
        imagenMuneco.style.display = "block";
        resultadoTitulo.textContent = "Ningún mensaje fue encontrado";
        resultadoTexto.textContent = "Ingresa el texto que deseas encriptar o desencriptar.";
        botonCopiar.classList.add("hidden");
    }
    actualizarEstadoBotones();
});

// Para encriptar texto
botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    const mensaje = textArea.value.toLowerCase().trim();
    if (mensaje !== "") {
        const mensajeEncriptado = encriptarMensaje(mensaje);
        resultadoTexto.textContent = mensajeEncriptado;
        resultadoTitulo.textContent = "El resultado es:";
        botonCopiar.classList.remove("hidden");
    } else {
        resultadoTitulo.textContent = "Por favor, ingresa un mensaje para encriptar.";
        resultadoTexto.textContent = "";
        botonCopiar.classList.add("hidden");
    }
});

// Para desencriptar texto
botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    const mensaje = textArea.value.toLowerCase().trim();
    if (mensaje !== "") {
        const mensajeDesencriptado = desencriptarMensaje(mensaje);
        resultadoTexto.textContent = mensajeDesencriptado;
        resultadoTitulo.textContent = "El resultado es:";
        botonCopiar.classList.remove("hidden");
    } else {
        resultadoTitulo.textContent = "Por favor, ingresa un mensaje para desencriptar.";
        resultadoTexto.textContent = "";
        botonCopiar.classList.add("hidden");
    }
    loaderLuna.classList.add("hidden");
});

// Para copiar texto
botonCopiar.addEventListener("click", () => {
    const textoCopiado = resultadoTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {    
        imagenMuneco.style.display = "block";
        resultadoTitulo.textContent = "El texto ya se copió";
        botonCopiar.classList.add("hidden");
        resultadoTexto.textContent = "";
        textArea.value = "";
        actualizarEstadoBotones();
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
});

// Inicializar el estado de los botones al cargar la página
actualizarEstadoBotones();
