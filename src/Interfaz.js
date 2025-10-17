import Swal from 'sweetalert2';
import Game from './Game.js';

let btn_player1 = document.getElementById('btn_player1');
let btn_player2 = document.getElementById('btn_player2');
let player1, player2, pj1 = '', pj2 = '', aceptar = 0;
let turno = 1; 

const fondosCombate = [
  'url("./public/img/fondos/07.jpg")',
  'url("./public/img/fondos/bg02.jpg")',
  'url("./public/img/fondos/04.jpg")',
  'url("./public/img/fondos/06.jpg")'
];

function cambiarFondoAleatorio() {
  const random = Math.floor(Math.random() * fondosCombate.length);
  const contenedor = document.getElementById("iniciar_juego");
  contenedor.style.backgroundImage = fondosCombate[random];
  contenedor.style.backgroundSize = "cover";
  contenedor.style.backgroundPosition = "center";
}


let historial = {
    victoriasJugador1: 0,
    victoriasJugador2: 0,
}
const mostrarHistorial = () => {
    console.log("Mostrando historial...");
    Swal.fire({
        title: "Historial de Combates",
        html: `
            <div style="text-align: center;">
                <p style="color:rgba(237, 47, 9, 1); font-size: 1.2rem; text-shadow: 2px 2px 4px rgba(255, 252, 252, 0.5);">Victorias Jugador 1: ${historial.victoriasJugador1}</p>
                <p style="color:rgba(26, 57, 212, 1); font-size: 1.2rem; text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);">Victorias Jugador 2: ${historial.victoriasJugador2}</p>
            </div>
        `,
        icon: "info",
        background: "transparent",
        backdrop: "linear-gradient(to right, rgba(49, 250, 14, 0), rgba(72, 0, 255, 0.01))", // Degradado azul a rosa con transparencia
        customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            htmlContainer: 'swal2-html-container',
            confirmButton: 'swal2-confirm',
        },
        buttonsStyling: false,
    }).then(() => {
        revancha();
    });
};

const revancha = () => {
           
    Swal.fire({
        title: "¿Quieres una revancha?",
        text: "¿Deseas jugar de nuevo con los mismos personajes?",
        width: 600,
        color: "#ffffff",
        background: "transparent",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        backdrop: "linear-gradient(to right, rgba(157, 0, 0, 0.01), rgba(0, 21, 255, 0))", // Degradado azul a rosa con transparencia
    }).then((result) => {
        if (result.isConfirmed) {
             cambiarFondoAleatorio(); // 🔥 Cambia el fondo cuando inicia el combate
    // ... aquí sigue tu código original ..
            player1 = new Game(player1.getUserName());
            player2 = new Game(player2.getUserName());
    
            document.getElementById("vida_py1").style.width = "100%";
            document.getElementById("vida_py1").innerText = "100%";
            document.getElementById("ki_py1").style.width = "100%";
            document.getElementById("ki_py1").innerText = "100%";
            document.getElementById("energia_py1").style.width = "100%";
            document.getElementById("energia_py1").innerText = "100%";
    
            document.getElementById("vida_py2").style.width = "100%";
            document.getElementById("vida_py2").innerText = "100%";
            document.getElementById("ki_py2").style.width = "100%";
            document.getElementById("ki_py2").innerText = "100%";
            document.getElementById("energia_py2").style.width = "100%";
            document.getElementById("energia_py2").innerText = "100%";
    
            turno = 1;
            actualizarBotones();
        } else {
            location.reload();
        }
    });
    
};

const alternarTurno = () => {
    turno = turno === 1 ? 2 : 1;
    if (turno === 1) {
        player1.incrementarTurno();
    } else {
        player2.incrementarTurno();
    }
    actualizarBotones();
};

const actualizarBotones = () => {

    if (turno === 1) {
        document.getElementById('btn_atk_py1').disabled = false;
        document.getElementById('btn_esp_py1').disabled = false;
        document.getElementById('btn_ermi_py1').disabled = false;
        document.getElementById('btn_ki_py1').disabled = false;

        document.getElementById('btn_atk_py2').disabled = true;
        document.getElementById('btn_esp_py2').disabled = true;
        document.getElementById('btn_ermi_py2').disabled = true;
        document.getElementById('btn_ki_py2').disabled = true;
    } else {
        document.getElementById('btn_atk_py1').disabled = true;
        document.getElementById('btn_esp_py1').disabled = true;
        document.getElementById('btn_ermi_py1').disabled = true;
        document.getElementById('btn_ki_py1').disabled = true;

        document.getElementById('btn_atk_py2').disabled = false;
        document.getElementById('btn_esp_py2').disabled = false;
        document.getElementById('btn_ermi_py2').disabled = false;
        document.getElementById('btn_ki_py2').disabled = false;
    }
};

const iniciar_player1 = () => {
            cambiarFondoAleatorio(); // 🔥 Cambia el fondo cuando inicia el combate
    // ... aquí sigue tu código original ..
    document.getElementById('player1').classList.add("d-none");
    aceptar++;
    if (aceptar === 2) {
        document.getElementById('iniciar_juego').classList.remove('d-none');
        let timerInterval;
        Swal.fire({
            title: "<i class='fas fa-fist-raised'></i> INICIAR COMBATE",
            html: "EN <b>3</b> segundos",
            timer: 3000,
            timerProgressBar: true,
            background: 'linear-gradient(to right, #000080, #FFFFFF)',
            backdrop: `
                rgba(0, 0, 0, 0.5)
                url("https://i.imgur.com/4NZ6uLY.jpg")
                center left
                no-repeat
            `,
            customClass: {
                popup: 'transparent-popup',
                title: 'font-awesome-title',
                content: 'font-awesome-content',
                confirmButton: 'font-awesome-button'
            },
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                if (timer) {
                    timer.textContent = "3";
                    timerInterval = setInterval(() => {
                        let timeLeft = Swal.getTimerLeft();
                        timer.textContent = Math.floor(timeLeft / 1000);
                    }, 1000);
                }
            },
            willClose: () => {
                clearInterval(timerInterval);
                Swal.fire({
                    title: "<i class='fas fa-user'></i> Inicia el jugador 1",
                    text: "El jugador 2 no podrá hacer nada hasta que el jugador 1 haga un movimiento",
                    icon: "success",
                    background: 'linear-gradient(to right, #000080, #FFFFFF)',
                    customClass: {
                        popup: 'transparent-popup',
                        title: 'font-awesome-title',
                        content: 'font-awesome-content',
                        confirmButton: 'font-awesome-button'
                    }
                });
                actualizarBotones(); // Habilitar botones del Jugador 1 
            }
        });
    }
};
// Función para iniciar el jugador 2
const iniciar_player2 = () => {
    document.getElementById('player2').classList.add("d-none");
    aceptar++;

    if (aceptar === 2) {
        document.getElementById('iniciar_juego').classList.remove('d-none');
        let timerInterval;

        Swal.fire({
            title: "¡A luchar! ",
            html: "<b id='countdown' style='font-size: 4rem;'>3</b> segundos",
            timer: 3000,
            timerProgressBar: true,
            background: "transparent",
            color: "#ffffff",
            customClass: {
                popup: 'swal2-custom',
                container: 'swal2-fullscreen'
            },
            didOpen: () => {
                Swal.showLoading();
                const timer = document.getElementById("countdown");

                if (timer) {
                    timer.textContent = "3";
                    timerInterval = setInterval(() => {
                        let timeLeft = Swal.getTimerLeft();
                        timer.innerHTML = `<span style="font-size: 4rem; font-weight: bold;">${Math.floor(timeLeft / 1000)}</span>`;
                    }, 1000);
                }
            },
            willClose: () => {
                clearInterval(timerInterval);

                Swal.fire({
                    title: "¡Jugador 1!",
                    text: "El jugador 2 deberá esperar hasta que el jugador 1 realice su movimiento.",
                    icon: "info",
                    background: "transparent",
                    color: "#ffffff",
                    customClass: {
                        popup: 'swal2-custom',
                        container: 'swal2-fullscreen'
                    }
                });

                actualizarBotones();
            }
        });
    }
};
// Estilos personalizados para los SweetAlerts
const style = document.createElement("style");
style.innerHTML = `
    .swal2-custom {
        border: 4px solid transparent;
        background-clip: padding-box;
        border-image: linear-gradient(45deg, cyan, red) 1;
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.8), 0 0 30px rgba(255, 0, 0, 0.8);
        backdrop: linear-gradient(to right, rgba(0, 255, 255, 0.8), rgba(255, 0, 0, 0.8));
    }

    .swal2-fullscreen {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    }
`;
document.head.appendChild(style);

let seleccion1 = document.getElementById('player1_seleccion');
seleccion1.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        pj1 = event.target.alt;

        seleccion1.querySelectorAll('img').forEach((img) => {
            img.classList.remove('btn-warning');
            img.classList.add('btn-danger');
        });

        event.target.classList.remove('btn-danger');
        event.target.classList.add('btn-primary');

        console.log("Personaje 1 seleccionado:", pj1);
    }
});

let seleccion2 = document.getElementById('player2_seleccion');
seleccion2.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        pj2 = event.target.alt;

        seleccion2.querySelectorAll('img').forEach((img) => {
            img.classList.remove('btn-warning');
            img.classList.add('btn-primary');
        });

        event.target.classList.remove('btn-primary');
        event.target.classList.add('btn-warning');

        console.log("Personaje 2 seleccionado:", pj2);
    }
});

btn_player1.addEventListener('click', () => {
    let user_name1 = document.getElementById('user_name1').value;
    if (!user_name1) {
        Swal.fire({
            title: "Advertencia Jugador 1",
            text: "Debes poner un Nombre",
            icon: "warning"
        });
    } else {
        player1 = new Game(user_name1);
        if (!pj1) {
            Swal.fire({
                title: "Advertencia Jugador 1",
                text: "Debes escoger personaje",
                icon: "warning"
            });
        } else {
            document.getElementById('p1').innerText = user_name1.toUpperCase();
            document.getElementById('avatar1').src = `./public/img/${pj1}/base.png`;
            iniciar_player1();
        }
    }
});

btn_player2.addEventListener('click', () => {
    let user_name2 = document.getElementById('user_name2').value;
    if (!user_name2) {
        Swal.fire({
            title: "Advertencia Jugador 2",
            text: "Debes poner un Nombre",
            icon: "warning"
        });
    } else {
        player2 = new Game(user_name2);
        if (!pj2) {
            Swal.fire({
                title: "Advertencia Jugador 2",
                text: "Debes escoger personaje",
                icon: "warning"
            });
        } else {
            document.getElementById('p2').innerText = user_name2.toUpperCase();
            document.getElementById('avatar2').src = `./public/img/${pj2}/base.png`;
            iniciar_player2();
        }
    }
});
//Ataque basico jugador 1
document.getElementById("btn_atk_py1").addEventListener('click', () => {
    if (player1.getKi() < 5 || player1.getEnergia() < 10) {
        Swal.fire({
            icon: "error",
            title: "Sin energía suficiente",
            text: "¡No tienes suficiente ki o energía para atacar!",
            color: "#d33",
            background: "#f5f5f5",
        });
        return;
    } else {
        player1.atk_basico(player2);
        let porcentaje = parseInt((player1.getKi() * 100) / 80);
        document.getElementById('ki_py1').style.width = `${porcentaje}%`;
        document.getElementById('ki_py1').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player1.getEnergia() * 100) / 90);
        document.getElementById("energia_py1").style.width = `${porcentaje}%`;
        document.getElementById("energia_py1").innerText = `${porcentaje}%`;

        let vidaJugador2 = player2.getVida();
        porcentaje = parseInt((vidaJugador2 * 100) / 100);
        document.getElementById("vida_py2").style.width = `${porcentaje}%`;
        document.getElementById("vida_py2").innerText = `${porcentaje}%`;
        Swal.fire({
            title: "Puño Furia!",
            text: "AAAAAHHHHHH",
            width: 600,
            color: "#ffffff",
            background: "transparent", 
            imageUrl: `./public/img/${pj1}/basico.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Ataque Basico",
            background: "transparent", 
            backdrop: "linear-gradient(to right, rgba(192, 189, 159, 0), rgba(107, 103, 105, 0.04))", // Degradado azul a rosa con transparencia
        });        
        if (vidaJugador2 <= 0) {
            historial.victoriasJugador1++;
            console.log("Historial actualizado:", historial);
            mostrarHistorial();
        } else {
            alternarTurno();
        }
    }
});
//Ataque especial jugador 1
document.getElementById("btn_esp_py1").addEventListener('click', () => {
    if (player1.getKi() < 20 || player1.getEnergia() < 30) {
        Swal.fire({
            icon: "error",
            title: "Sin energía suficiente",
            text: "¡No tienes suficiente ki o energía para atacar!",
            color: "#d33",
            background: "transparent", // Fondo transparente
            backdrop: "linear-gradient(to right, rgba(0, 255, 98, 0.03), rgba(157, 20, 93, 0.02))",
            customClass: {
                popup: 'swal2-popup-transparent'
            }
        });
        return;
    } else {
        if (!player1.atk_especial(player2)) {
            Swal.fire({
                icon: "error",
                title: "Ataque especial no disponible",
                text: "Debes esperar 2 turnos para usar el ataque especial nuevamente.",
                color: "#d33",
                background: "transparent", // Fondo transparente
                backdrop: "linear-gradient(to right, rgba(119, 119, 119, 0), rgba(135, 135, 135, 0))",
                customClass: {
                    popup: 'swal2-popup-transparent'
                }
            });
            return;
        }

        let porcentaje = parseInt((player1.getKi() * 100) / 80);
        document.getElementById('ki_py1').style.width = `${porcentaje}%`;
        document.getElementById('ki_py1').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player1.getEnergia() * 100) / 90);
        document.getElementById("energia_py1").style.width = `${porcentaje}%`;
        document.getElementById("energia_py1").innerText = `${porcentaje}%`;

        let vidaJugador2 = player2.getVida();
        porcentaje = parseInt((vidaJugador2 * 100) / 100);
        document.getElementById("vida_py2").style.width = `${porcentaje}%`;
        document.getElementById("vida_py2").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "Puño Dragon!",
            text: "AAAHHHHHHHHH",
            width: 600,
            color: "#ffffff",
            backdrop: "linear-gradient(to right, rgba(30, 0, 255, 0), rgba(21, 249, 70, 0))",
            imageUrl: `./public/img/${pj1}/especial.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Ataque Especial",
            didOpen: () => {
                document.querySelector('.swal2-popup').style.backgroundColor = "transparent";
                document.querySelector('.swal2-popup').style.boxShadow = "none";
            },
            customClass: {
                popup: 'swal2-popup-transparent'
            }
        });

        if (vidaJugador2 <= 0) {
            historial.victoriasJugador1++;
            console.log("Historial actualizado:", historial);
            mostrarHistorial();
        } else {
            alternarTurno();
        }
    }
});

//Semilla de ermitaño jugador 1
document.getElementById("btn_ermi_py1").addEventListener('click', () => {
    let semilla_Span = document.getElementById('se_p1');
    let contador_semilla = parseInt(semilla_Span.innerText);
    if (contador_semilla > 0) {
        contador_semilla--;
        semilla_Span.innerText = contador_semilla;
        player1.atk_SemillaErmitanio();

        let porcentaje = parseInt((player1.getKi() * 100) / 80);
        document.getElementById('ki_py1').style.width = `${porcentaje}%`;
        document.getElementById('ki_py1').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player1.getEnergia() * 100) / 90);
        document.getElementById("energia_py1").style.width = `${porcentaje}%`;
        document.getElementById("energia_py1").innerText = `${porcentaje}%`;

        porcentaje = parseInt((player1.getVida() * 100) / 100);
        document.getElementById("vida_py1").style.width = `${porcentaje}%`;
        document.getElementById("vida_py1").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "AUMENTAR DE PODER!!",
            text: "Haz usado una semilla de ermitaño",
            width: 600,
            imageUrl: `./public/img/${pj1}/curar.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "curacion",
            backdrop: "linear-gradient(to right, rgba(144, 238, 144, 0), rgba(255, 0, 0, 0.02))", 
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.background = 'transparent'; 
                document.querySelector('.swal2-popup').style.color = 'white'; 
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
        
    } else {
        Swal.fire({
            icon: "error",
            title: "Sin semillas de ermitaño",
            text: "¡Te has quedado sin semillas!",
            color: "#ffffff", 
            background: "transparent", 
            backdrop: "linear-gradient(to right, rgba(144, 238, 144, 0.01), rgba(255, 0, 0, 0))" 
        });
        
    }
    alternarTurno();
});

//Regenerar KI jugador 1
document.getElementById("btn_ki_py1").addEventListener('click', () => {
    if (player1.getKi() >= 80) {
        Swal.fire({
            icon: "error",
            title: "Tu ki está al 100%",
            text: "¡No puedes regenerar más tu ki!",
            color: "#d33",
            background: "#f5f5f5",
        });
    } else {
        player1.atk_regenerarki();
        let porcentaje = parseInt((player1.getKi() * 100) / 80);
        document.getElementById('ki_py1').style.width = `${porcentaje}%`;
        document.getElementById('ki_py1').innerText = `${porcentaje}%`;

        Swal.fire({
            title: "¡Regeneración inmortal!",
            text: "Haz regenerado tu KI, felicidades.",
            width: 600,
            imageUrl: `./public/img/${pj1}/energia.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "regeneracion",
            backdrop: "linear-gradient(to right, rgba(0, 191, 255, 0), rgba(55, 255, 20, 0))",
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.background = 'transparent'; 
                document.querySelector('.swal2-popup').style.color = 'white'; 
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
        
    }
    alternarTurno();
});

//Ataque basico jugador 2
document.getElementById("btn_atk_py2").addEventListener('click', () => {
    if (player2.getKi() < 5 || player2.getEnergia() < 10) {
        Swal.fire({
            icon: "error",
            title: "Sin energía suficiente",
            text: "¡No tienes suficiente ki o energía para atacar!",
            color: "#d33",
            background: "#f5f5f5",
        });
        return;
    } else {
        player2.atk_basico(player1);
        let porcentaje = parseInt((player2.getKi() * 100) / 80);
        document.getElementById('ki_py2').style.width = `${porcentaje}%`;
        document.getElementById('ki_py2').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player2.getEnergia() * 100) / 90);
        document.getElementById("energia_py2").style.width = `${porcentaje}%`;
        document.getElementById("energia_py2").innerText = `${porcentaje}%`;

        let vidaJugador1 = player1.getVida();
        porcentaje = parseInt((vidaJugador1 * 100) / 100);
        document.getElementById("vida_py1").style.width = `${porcentaje}%`;
        document.getElementById("vida_py1").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "¡Cañon Galick!",
            text: "AAAAHHHHHH",
            width: 600,
            imageUrl: `./public/img/${pj2}/basico.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Ataque Basico",
            backdrop: "linear-gradient(to right, rgba(255, 166, 0, 0), rgba(8, 255, 33, 0))", 
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.background = 'transparent'; 
                document.querySelector('.swal2-popup').style.color = 'white'; 
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
        if (vidaJugador1 <= 0) {
            historial.victoriasJugador2++;
            console.log("Historial actualizado:", historial);
            mostrarHistorial();
        } else {
            alternarTurno();
        }
    }
});

//Ataque especial jugador 2
document.getElementById("btn_esp_py2").addEventListener('click', () => {
    if (player2.getKi() < 20 || player2.getEnergia() < 30) {
        Swal.fire({
            icon: "error",
            title: "Sin energía suficiente",
            text: "¡No tienes suficiente ki o energía para atacar!",
            color: "#d33",
            background: "transparent", // Fondo transparente
            backdrop: "linear-gradient(to right, rgba(255, 0, 0, 0), rgba(0, 0, 255, 0))", // Nuevo degradado
            customClass: {
                popup: 'swal2-popup-transparent'
            }
        });
        return;
    } else {
        if (!player2.atk_especial(player1)) {
            Swal.fire({
                icon: "error",
                title: "Ataque especial no disponible",
                text: "Debes esperar 2 turnos para usar el ataque especial nuevamente.",
                color: "#d33",
                background: "transparent", // Fondo transparente
                backdrop: "linear-gradient(to right, rgba(0, 255, 0, 0), rgba(0, 255, 255, 0))", // Nuevo degradado
                customClass: {
                    popup: 'swal2-popup-transparent'
                }
            });
            return;
        }

        let porcentaje = parseInt((player2.getKi() * 100) / 80);
        document.getElementById('ki_py2').style.width = `${porcentaje}%`;
        document.getElementById('ki_py2').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player2.getEnergia() * 100) / 90);
        document.getElementById("energia_py2").style.width = `${porcentaje}%`;
        document.getElementById("energia_py2").innerText = `${porcentaje}%`;

        let vidaJugador1 = player1.getVida();
        porcentaje = parseInt((vidaJugador1 * 100) / 100);
        document.getElementById("vida_py1").style.width = `${porcentaje}%`;
        document.getElementById("vida_py1").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "¡Ráfaga de Ojo Invisible!",
            text: "Insectoooo!",
            width: 600,
            color: "#ffffff",
            background: "transparent",
            imageUrl: `./public/img/${pj2}/especial.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Ataque Especial",
            backdrop: "linear-gradient(to right, rgba(255, 140, 0, 0.01), rgba(255, 0, 140, 0))", // Nuevo degradado
            customClass: {
                popup: 'swal2-popup-transparent'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.backgroundColor = "transparent";
                document.querySelector('.swal2-popup').style.boxShadow = "none";
            }
        });

        if (vidaJugador1 <= 0) {
            historial.victoriasJugador2++;
            console.log("Historial actualizado:", historial);
            mostrarHistorial();
        } else {
            alternarTurno();
        }
    }
});

//Semillas de ermitaño jugador 2
document.getElementById("btn_ermi_py2").addEventListener('click', () => {
    let semilla_Span = document.getElementById('se_p2');
    let contador_semilla = parseInt(semilla_Span.innerText);
    if (contador_semilla > 0) {
        contador_semilla--;
        semilla_Span.innerText = contador_semilla;
        player2.atk_SemillaErmitanio();

        let porcentaje = parseInt((player2.getKi() * 100) / 80);
        document.getElementById('ki_py2').style.width = `${porcentaje}%`;
        document.getElementById('ki_py2').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player2.getEnergia() * 100) / 90);
        document.getElementById("energia_py2").style.width = `${porcentaje}%`;
        document.getElementById("energia_py2").innerText = `${porcentaje}%`;

        porcentaje = parseInt((player2.getVida() * 100) / 100);
        document.getElementById("vida_py2").style.width = `${porcentaje}%`;
        document.getElementById("vida_py2").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "AUMENTAR DE PODER!!",
            text: "Haz usado una semilla de ermitaño",
            width: 600,
            imageUrl: `./public/img/${pj2}/curar.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "curacion",
            backdrop: "linear-gradient(to right, rgba(144, 238, 144, 0), rgba(255, 0, 0, 0))", 
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.background = 'transparent'; 
                document.querySelector('.swal2-popup').style.color = 'white'; 
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
        
    } else {
        Swal.fire({
            icon: "error",
            title: "Sin semillas de ermitaño",
            text: "¡Te has quedado sin semillas!",
            color: "#ffffff", 
            background: "transparent", 
            backdrop: "linear-gradient(to right, rgba(144, 238, 144, 0), rgba(255, 0, 0, 0.01))" 
        });
    }
    alternarTurno(); 
});

//Regenerar KI jugador 2
document.getElementById("btn_ki_py2").addEventListener('click', () => {
    if (player2.getKi() >= 80) {
        Swal.fire({
            icon: "error",
            title: "Tu ki está al 100%",
            text: "¡No puedes regenerar más tu ki!",
            color: "#d33",
            background: "#f5f5f5",
        });
    } else {
        player2.atk_regenerarki();
        let porcentaje = parseInt((player2.getKi() * 100) / 80);
        document.getElementById('ki_py2').style.width = `${porcentaje}%`;
        document.getElementById('ki_py2').innerText = `${porcentaje}%`;
        Swal.fire({
            title: "REGENERACION MAXIMA!!",
            text: "Haz regenerado tu KI, felicidades..",
            width: 600,
            imageUrl: `./public/img/${pj2}/energia.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "regeneracion",
            backdrop: "linear-gradient(to right, rgba(107, 251, 239, 0), rgba(251, 44, 158, 0))", 
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                popup.style.background = 'transparent'; 
                popup.style.color = 'white'; 
                popup.style.borderRadius = '20px';
                popup.style.boxShadow = 'none'; 
                const image = document.querySelector('.swal2-image');
                image.style.filter = 'none'; 
            }
        });
        
    }
    alternarTurno(); 
});
