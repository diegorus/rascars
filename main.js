// ------------------- ESCENA INICIO -------------------
class Inicio extends Phaser.Scene {

constructor(){
super("Inicio");
}

preload(){
this.load.image("fondoInicio","../img/akri.jpg");
this.load.image("boton","../img/boton.jpg");
}

create(){
let fondo = this.add.image(450,300,"fondoInicio");
fondo.setDisplaySize(900,600);

let boton=this.add.image(450,450,"boton")
.setScale(0.5)
.setInteractive();

this.add.text(400,440,"start",{
fontSize:"28px",
color:"#ff8383"
});

boton.on("pointerdown",()=>{

this.scene.start("Juego");

});
    }
}
// ------------------- ESCENA JUEGO -------------------
class Juego extends Phaser.Scene {

constructor(){
super("Juego");
}

preload(){
this.load.image("jas","../img/jas.jpg");

this.load.image("rojo","../img/rojo.jpg");
this.load.image("epis","../img/epis.jpg");
this.load.image("eps","../img/eps.jpg");
this.load.image("corola","../img/corola.jpg");
}

create(){

let g = this.make.graphics({x:0,y:0,add:false});
g.fillStyle(0xffffff,1);
g.fillCircle(32,32,32);
g.generateTexture("brush",64,64);
g.destroy();

this.premios=["corola","rojo","epis","eps"];
this.resultados=[];
this.tarjetas=[];
this.descubiertas=0;


// contador circular
this.grafica = this.add.graphics();
this.textoPorcentaje = this.add.text(430,70,"0%",{
fontSize:"28px",
color:"#ffffff"
});


let posiciones = [200,450,700];

if(Math.random() < 0.3){ 
    // 30% de probabilidad de ganar
    let premio = Phaser.Utils.Array.GetRandom(this.premios);
    this.resultados = [premio, premio, premio];
}else{
    // pierde
    this.resultados = [
        Phaser.Utils.Array.GetRandom(this.premios),
        Phaser.Utils.Array.GetRandom(this.premios),
        Phaser.Utils.Array.GetRandom(this.premios)
    ];
}

for(let i=0; i<3; i++){
let premio = this.resultados[i];
this.add.image(posiciones[i],350,premio).setScale(0.5);

let rt = this.add.renderTexture(
posiciones[i],
350,
200,
200
);

rt.draw("jas",0,0); 

let tarjeta=this.add.image(posiciones[i],350);

this.tarjetas.push({
rt:rt,
img:tarjeta,
porcentaje:0,
descubierta:false
});
}


// raspar
this.input.on("pointermove",(pointer)=>{
if(pointer.isDown){
this.tarjetas.forEach(t=>{
if(t.descubierta) return;

let localX=pointer.x-(t.img.x-100);
let localY=pointer.y-(t.img.y-100);

if(localX>0 && localX<200 && localY>0 && localY<200){

t.rt.erase("eps",localX,localY,1);

t.porcentaje = Math.min(t.porcentaje + 0.3, 100);

this.actualizarCirculo(t.porcentaje);

if(t.porcentaje>90){

t.descubierta=true;

t.rt.erase("eps",100,100,10);

t.rt.clear();

this.descubiertas++;

if(this.descubiertas===3){

this.verificarPremio();
}
}
}
});
}
});
}


// contador circular
actualizarCirculo(p){

this.grafica.clear();

this.grafica.lineStyle(10,0x00ff00);

this.grafica.beginPath();

this.grafica.arc(
450,
80,
40,
Phaser.Math.DegToRad(270),
Phaser.Math.DegToRad(270 + p * 3.6),
false
);

this.grafica.strokePath();

this.textoPorcentaje.setText(Math.floor(p)+"%");

}



// verificar premios
verificarPremio(){

let mensaje="";

if(
this.resultados[0]===this.resultados[1] &&
this.resultados[1]===this.resultados[2]

){
mensaje="GANASTE";
}else{
mensaje="Intenta otra vez";
}
this.add.text(360,200,mensaje,{
fontSize:"40px",
color:"#ff0000"
});
this.botonReiniciar();
}


// boton reiniciar
botonReiniciar(){
let boton=this.add.text(380,520,"de nuevo",{
fontSize:"32px",
backgroundColor:"#ff0000",
padding:10
})
.setInteractive();
boton.on("pointerdown",()=>{
this.scene.restart();
});
}
}
/*
// ------------------- ESCENA JUEGO -------------------
class Juego extends Phaser.Scene {

constructor(){
super("Juego");
}

preload(){
this.load.image("burgi","../img/burgi.jpg");
this.load.image("hams","../img/hams.jpg");

this.load.image("ji","../img/ji.jpg");
this.load.image("jos","../img/jos.jpg");
this.load.image("rana","../img/rana.jpg");
this.load.image("rana2","../img/rana2.jpg");
}

create(){

this.premios= ["burgi","hams","ji","jos"];

this.resultados=[];
this.tarjetas=[];
this.descubiertas=0;


// contador circular
this.grafica=this.add.graphics();
this.textoPorcentaje=this.add.text(430,70,"0%",{
fontSize:"28px",
color:"#77dd"
});


let posiciones=[200,450,700];

for(let i=0;i<3;i++){

let premio=Phaser.Utils.Array.GetRandom(this.premios);

this.resultados.push(premio);

this.add.image(posiciones[i],350,premio).setScale(0.5);

let rt = this.add.renderTexture(
posiciones[i],
350,
200,
200
);

rt.draw("burgi",100,100); 

let capa = this.add.image(100,100,"burgi");
capa.setDisplaySize(200,200);

rt.draw(capa);
capa.destroy();

let tarjeta=this.add.image(posiciones[i],350,rt);

this.tarjetas.push({
rt:rt,
img:tarjeta,
porcentaje:0,
descubierta:false
});

}


// raspar
this.input.on("pointermove",(pointer)=>{

if(pointer.isDown){

this.tarjetas.forEach(t=>{

if(t.descubierta) return;

let localX=pointer.x-(t.img.x-100);
let localY=pointer.y-(t.img.y-100);

if(localX>0 && localX<200 && localY>0 && localY<200){

t.rt.erase("rana2",localX,localY);

t.porcentaje+=0.5;

this.actualizarCirculo(t.porcentaje);

if(t.porcentaje>70){

t.descubierta=true;
t.img.destroy();

this.descubiertas++;

if(this.descubiertas===4){

this.verificarPremio();

}

}

}

});

}

});

}



// contador circular
actualizarCirculo(p){

this.grafica.clear();

this.grafica.lineStyle(10,0x00ff00);

this.grafica.beginPath();

this.grafica.arc(
450,
80,
40,
Phaser.Math.DegToRad(270),
Phaser.Math.DegToRad(270 + p*3.6),
false
);

this.grafica.strokePath();

this.textoPorcentaje.setText(Math.floor(p)+"%");

}



// verificar premios
verificarPremio(){

let mensaje="";

if(
this.resultados[0]===this.resultados[1] &&
this.resultados[1]===this.resultados[2]
){

mensaje="GANASTE ";

}else{

mensaje="Intenta de nuevo ";

}

this.add.text(360,200,mensaje,{
fontSize:"40px",
color:"#91e5f0"
});

this.botonReiniciar();

}



// boton reiniciar
botonReiniciar(){

let boton=this.add.text(380,520,"JUGAR OTRA VEZ",{
fontSize:"32px",
backgroundColor:"#967eff",
padding:10
})
.setInteractive();

boton.on("pointerdown",()=>{

this.scene.restart();

});

}

}
*/


// ------------------- CONFIGURACION -------------------
const config={

type:Phaser.AUTO,

width:900,
height:600,

scale:{
mode:Phaser.Scale.FIT,
autoCenter:Phaser.Scale.CENTER_BOTH
},

parent:"game",

scene:[Inicio,Juego]

};

const game = new Phaser.Game(config);