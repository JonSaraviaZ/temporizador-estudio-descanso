//Tomando los atributos y manipularlos con el DOM
//Declaración de constantes
const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3'); //variable llamando el audio
const botonInciarPausar = document.querySelector('#start-pause'); //variable llamando el botón Comenzar
const play = new Audio('./sonidos/play.wav');
const pause = new Audio('./sonidos/pause.mp3');
const beep = new Audio('./sonidos/beep.mp3');
const textoIniciarPausar = document.querySelector('#start-pause span');
const imagenIconoPlay = new Image('./imagenes/play_arrow.png');
const imagenIconoPause = new Image('./imagenes/pause.png');
const iconoDelBoton = botonInciarPausar.querySelector(".app__card-primary-butto-icon"); //variable paa trabajar el cambio del icono
const tiempoEnPantalla = document.querySelector('#timer') //variable para manejar el timer

let tiempoTranscurridoEnSegundos = 1500 //se establece una variable inicial del tiempo
let idIntervalo = null;

musica.loop = true; //acá se plantea que la música se reproduzca en un loop

inputEnfoqueMusica.addEventListener('change', ()=>{ //Ejecuta la música al presionar el botón Música
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

//Cuando haga click en el botón descanso corto que el fondo se vuelva verde
botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300; // se establece la cantidad de segundos
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

//Cuando haga click en el botón de enfoque que el fondo se vuelva morado
botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500; // se establece la cantidad de segundos
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active');
})

//Cuando haga click en el botón de Descanso largo que el fondo se cambie a azul
botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900; // se establece la cantidad de segundos
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active');
})

function cambiarContexto(contexto){

    mostrarTiempo();
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`) //Se puede pasar un parámentro a la fuente del código como en ./imagenes/${contexto}.png

    switch(contexto){
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro?
                <strong class="app__title-strong">¡Haz una pausa!.</strong>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>`
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => { //se inicia la cuenta regresiva del tiempo
    if(tiempoTranscurridoEnSegundos <= 0){
        beep.play();
        alert('Tiempo final');
        reiniciar();
        return 
    }
    textoIniciarPausar.textContent = "Pausar" //textContent se utiliza cuando queremos agregar texto a nuestro HTML. Solo texto. Dato no se puede ocupar etiquetas con TextContent, si se debesien utilizar se deberá ocupar innerHTML
    tiempoTranscurridoEnSegundos -= 1
    console.log("Temporizador: " + tiempoTranscurridoEnSegundos)
    mostrarTiempo()
}

botonInciarPausar.addEventListener('click', iniciarPausar); //Se activa la variable cuenta regresiva

function iniciarPausar(){
    if(idIntervalo){
        cambiarIcono();
        pause.play();
        reiniciar();
        return
    }
    play.play();
    cambiarIcono();
    idIntervalo = setInterval(cuentaRegresiva,1000) //setInterval para establecer que determinadas cosas ocurrirán. En este caso se necesita dismunuir en 1 segundo, lo cual se debe declarar como 1000
}

function reiniciar(){
    clearInterval(idIntervalo)  //clearInterval interrumpe la ejecución del intervalo
    idIntervalo = null
    textoIniciarPausar.textContent = "Comenzar"
    cambiarIcono();
}

function cambiarIcono(){ //función para cambiar el icono
    if(iconoDelBoton.src.includes("play_arrow.png")){
        iconoDelBoton.setAttribute("src","/imagenes/pause.png");
    } else {
        iconoDelBoton.setAttribute("src","/imagenes/play_arrow.png");
    }
}

function mostrarTiempo(){ //función para configurar el temporizador
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000)  //transformación de miles de segundos a minutos
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute: '2-digit', second:'2-digit'}) //el método toLocaleTimeString entrega formato en hora de la región que uno elija.
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}` //ingresando en pantalla el temporizador
}

mostrarTiempo();