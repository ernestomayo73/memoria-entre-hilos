// Inicialización de variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerinicial = 30;
let tiemporegresivoid = null;
let mostrandoImagenes = true; // Variable para controlar si se están mostrando las imágenes

let correcto = new Audio('./sonidos/correcto.mp3');
let equivocado = new Audio('./sonidos/equivocado.wav');
let ganador = new Audio('./sonidos/ganador.mp3');
let perdedor = new Audio('./sonidos/perdedor.mp3');
let fondo = new Audio('./sonidos/fondo.wav');
let clic = new Audio('./sonidos/clic.wav');

// Apuntando a elementos del documento HTML
let mostrarmovimientos = document.getElementById('Movimientos');
let mostraraciertos = document.getElementById('Aciertos');
let mostrartiempo = document.getElementById('Tiempo restante');
let ocultarBoton = document.getElementById("start").style.visibility = "hidden";

// Generación de números aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5; });

// Funciones

function contartiempo() {
    tiemporegresivoid = setInterval(() => {
        timer--;
        mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiemporegresivoid);
            bloqueartarjetas();
            perdedor.play();
               // Mostrar la alerta cuando se acabe el tiempo
               Swal.fire({
                icon: 'error',
                title: '¡Se te acabó el tiempo!',
                text: 'El juego ha terminado.',
                timer: 4000, // La alerta desaparecerá automáticamente después de 4 segundos
                showConfirmButton: false
            });
            mostrarResultado(); // Mostrar las cartas al finalizar el tiempo
            document.getElementById("start").style.visibility = "visible";
        }
    }, 1000);
}

function bloqueartarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetabloqueada = document.getElementById(i);
        if (mostrandoImagenes) {
            tarjetabloqueada.innerHTML = `<img src="./fotos/${numeros[i]}.png" alt="">`;
        } else {
            tarjetabloqueada.innerHTML = `<img src="./fotos/fondo.png" alt="">`;
        }
        tarjetabloqueada.disabled = true;
    }
}

function destapar(id) {
    if (temporizador == false) {
        contartiempo();
        temporizador = true;
    }

    tarjetasdestapadas++;

    if (tarjetasdestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerresultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./fotos/${primerresultado}.png" alt="">`;
        clic.play();

        tarjeta1.disabled = true;
    } else if (tarjetasdestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoresultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./fotos/${segundoresultado}.png" alt="">`;

        tarjeta2.disabled = true;

        movimientos++;
        mostrarmovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerresultado == segundoresultado) {
            tarjetasdestapadas = 0;
            correcto.play();

            aciertos++;
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                ganador.play();
                clearInterval(tiemporegresivoid);
                mostraraciertos.innerHTML = `Aciertos: ${aciertos} 👌`;
                mostrartiempo.innerHTML = `solo te demoraste ${timerinicial - timer} segundos ⏰`;
                mostrarmovimientos.innerHTML = `Movimientos ${movimientos} 😎`;
                document.getElementById("start").style.visibility = "visible";
                Swal.fire({
                    icon: 'success',
                    title: '¡Ganaste!',
                    text: 'Has completado el juego.',
                    timer: 4000, // La alerta desaparecerá automáticamente después de 4 segundos
                    showConfirmButton: false
                });
            }

        } else {
            equivocado.play();
            setTimeout(() => {
                tarjeta1.innerHTML = `<img src="./fotos/fondo.png" alt="">`;
                tarjeta2.innerHTML = `<img src="./fotos/fondo.png" alt="">`;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdestapadas = 0;
            }, 400);
        }
    }
}

function mostrarResultado() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaResultado = document.getElementById(i);
        tarjetaResultado.innerHTML = `<img src="./fotos/${numeros[i]}.png" alt="">`;
    }
}

// Llama a la función para mostrar las imágenes al principio y luego ocultarlas
mostrarImagenesYEsconder();

// Función para reiniciar el juego al hacer clic en el botón "Iniciar juego"
document.getElementById("start").addEventListener("click", () => {
    location.reload();
});


function destaparCartas() {
    mostrandoImagenes = true;
    for (let i = 0; i <= 15; i++) {
        let tarjetaResultado = document.getElementById(i);
        tarjetaResultado.innerHTML = `<img src="./fotos/${numeros[i]}.png" alt="">`;
    }

    setTimeout(() => {
        mostrandoImagenes = false;
        for (let i = 0; i <= 15; i++) {
            let tarjetaResultado = document.getElementById(i);
            tarjetaResultado.innerHTML = `<img src="./fotos/fondo.png" alt="">`;
        }
    }, 3000); // Mostrar durante 3 segundos
}

// ...

function comenzarJuego() {
    // Ocultar la pantalla de bienvenida al presionar "Comenzar"
    document.getElementById('bienvenida').classList.add('hidden');
    destaparCartas(); // Llamar a la función para destapar las cartas después de 3 segundos
}
