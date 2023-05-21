let fondo1 = document.getElementById('fondo9');
let fondo2 = document.getElementById('fondo8');
let fondo3 = document.getElementById('fondo7');
let canva = document.getElementById('canvas');
fondo1.addEventListener('click', function() {
    canva.style.background = 'linear-gradient(360deg, rgb(199, 0, 0) 0%, rgb(255, 179, 2) 35%, rgb(255, 255, 255)100%)';
});
fondo2.addEventListener('click', function() {
    canva.style.background = 'linear-gradient(180deg, rgb(199, 0, 0) 10%, rgb(255, 179, 2) 40%, rgb(255, 255, 255) 100%)';
});
fondo3.addEventListener('click', function() {
    canva.style.background = 'linear-gradient(360deg, rgb(0, 53, 199) 35%, rgb(2, 255, 255) 45%, rgb(255, 255, 255)25%)';
});

//Se crearon las variables de ancho, alto, el canvas y el contexto del juego
let ancho = '700';
let alto = '300';
let canvas, ctx;

//Variables de las imagenes
let imgRex, imgCactus, imgSuelo, imgNube, imgAve;

//Funcion que carga las imagenes que se mostraran en el juego
function cargaImagenes (){
    imgRex = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();
    imgNube = new Image();
    imgAve = new Image();
    //Se instancian desde la direccion donde se almacenan
    imgRex.src = '../assets/rex_toy.png'
    imgCactus.src = '../assets/cactus.png'
    imgSuelo.src = '../assets/suelo.png'
    imgNube.src = '../assets/nube.png'
    imgAve.src = '../assets/pajarito.png'
}



//Funcion que entra al doumento html para detectar click sobre el html
document.addEventListener('keydown', function(evento){
    //Si se preciona la tecla espacio llama la funcion saltar();
    if(evento.keyCode == 32){
        if(nivel.muerto == false){
            saltar();
        }
    //Si se preciona la tecla enter se reinician los valores de inicio y revive el dinosaurio    
    }    
    if(evento.keyCode == 13){
        nivel.velocidad = 9;
        nube.velocidad = 1;
        ave.velocidad = 6;
        ave.x = ancho;
        cactus.x = ancho;
        nube.x = ancho;
        nivel.marcador = 0;
        nivel.muerto = false;
    }
});

function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // document.canvas.style.backgroundColor=c;
    cargaImagenes();
}


//Nos permite borrar el canvas y volverlo a restablecer cada cierto tiempo
function borrarCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}

//Se inicializa la variable suelo con un valor determinado
let suelo = 200;
//Arreglo con coordenadas de las posiciones predeterminadas del trex
let trex = {y: suelo, vy: 0, gravedad: 2, salto: 30, vymax: 9, saltando: false };
let cactus = {x: ancho, y: suelo-20};
let suelog = {x: 0, y:suelo+20};
let nube = {x: ancho, y:100, velocidad: 1};
let ave = {x: ancho, y: suelo, velocidad: 6};
let nivel = {velocidad: 9, marcador: 0, muerto: false};

//Funcion dibuja con parametros que pintaran al trex de acuerdo al tamaño y posiciones de la imagen
/**********************************************************************************************/
function dibujaRex(){
    //Parametros(0,0, dimenciones, posicion en el plano, tamaño )
    ctx.drawImage(imgRex, 0, 0, 500, 315, 100, trex.y-23, 80, 80);
}
/**********************************************************************************************/

function dibujaCactus(){
        ctx.drawImage(imgCactus, 0, 0, 500, 500, cactus.x, cactus.y-5, 100, 60);
}
/**********************************************************************************************/
function dibujaSuelo(){
    ctx.drawImage(imgSuelo, suelog.x, 399, 316, 100, 0, suelog.y, 1000, 800);
}
/**********************************************************************************************/
function dibujaNube(){
    ctx.drawImage(imgNube, 0, 0, 500, 500, nube.x, nube.y-50, 50, 50);
}
/**********************************************************************************************/
function dibujaAve(){
    ctx.drawImage(imgAve, 0, 0, 500, 225, ave.x, ave.y-50, 100, 60);  
}
/**********************************************************************************************/

//Funcion logica que lo que hara es crear el funcionamiento de cada elemento
function logicaCactus(){
    //Si cactus en el eje X es menor que -100
    if(cactus.x <-100){

        cactus.x = ancho ;
        nivel.velocidad = nivel.velocidad + 0.2;
        nivel.marcador++;
    }
    //En caso de que no suceda eso realizara lo siguiente 
    else{
        //le restara la velocidad al eje x del cactus para crear el movimiento
        cactus.x -= nivel.velocidad;
    }
}

function logicaAve(){
    //En este caso para que la ave no se reptita como el cactus solo se cambian los valores en las condiciones
    if(ave.x <-2100){
        ave.x = ancho;
        ave.velocidad = nivel.velocidad + 0.2;
        
    }
    else{
        ave.x -= ave.velocidad;
    }
}

/******************************************** */


function logicaSuelo(){
    //Si el suelo en el eje X es mayor que 100 regresar al valor X para que se vuelva a pintar
    if(suelog.x > 100){
        suelog.x = 0 ;
    }
    else{
        suelog.x += nivel.velocidad;
    }
}


/******************************************** */


function logicaNube(){
    if(nube.x <-100){
        nube.x = ancho ;
    }
    else{
        nube.x -= nube.velocidad;
    }
}

//Funcion que hara saltar al trex
function saltar(){
    /**Ciondicion que hace que el dinosaurio solo pueda saltar 
     * una vez hasta que hasta que vuelva a tocar el piso*/
    if(trex.saltando == false){
    trex.saltando = true;
    trex.vy = trex.salto;
    }
    
}

function gravedad (){
    //Si trex esta saltando
    if(trex.saltando == true){
        // y si trex en el eje y menos vy -trex gravedad sigue siendo mayor al suelo
        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else{
            //En caso de que no trex en el eje y seguira cayendo hasta tocar el suelo
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;    
        }
    }

}


function colision(){
    //Rango del eje x donde sucede la colision si el dinosaurio cae o choca con el ave
    if(cactus.x >= 45 && cactus.x <= 140 || ave.x >= 40 && ave.x <= 150){
        //Si el cactus o el ave llegan a la altura o nivel del trex coliciona y pierde
        if(trex.y >= suelo-25 ){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
            ave.velocidad = 0;
        }        
    }
}

//Se inicializa el valor del mejor puntaje que es igual al nivel.marcador
let record = nivel.marcador;
//Se crea su funcion
function mejorPuntaje(){
    //Si best es mas grande que el marcador se queda asi sin cambiar valores
    if(record > nivel.marcador){
        record = record;
    }   
    //En caso de que el marcador rompa el record
    else{
        record = nivel.marcador;
    }

}



/**Funcion que imprime en el canvas el puntaje que se va acumulando y tambien que pintara GAME OVER 
 * cuando el jugador pierda
*/
function puntuacion(){
    
    ctx.font = "30px impact";
    ctx.fillStyle = '#000000';
    ctx.fillText(`${nivel.marcador}`,600,50);
    ctx.fillText(`${'Score: ' + record}`,20,50);
    //Si el nivel se acavo mostrara las siguientes instrucciones
    if(nivel.muerto == true){
        ctx.font = "20px impact";
        ctx.fillStyle = '#000000';
        ctx.fillText("Puntaje: " + `${nivel.marcador}`,210,200);
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`,210,150);
    }
}

//---------------------------------------
//Bucle principal que indica a cuantos fotogramas ira la funcion principal
let FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

//Funcion principal que manda a traer a las demas funciones implementadas en el juego
function principal() {
    borrarCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaAve();
    logicaNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaAve();
    dibujaNube();
    dibujaRex();
    puntuacion();
    mejorPuntaje();
}
