/**
 * Creado por Adib Abud Jaso el 27/08/14.
 * Modificado por Adib Abud Jaso el 06/11/14.
 */
var buenas = 0;
var bodyOriginal;
function Pregunta(objetoConDatos) {
    this.datos = objetoConDatos;
    this.contestada = false;
    Pregunta.conjunto.push(this);
}
Pregunta.conjunto = [];//Aquí se almacenan las preguntas
Pregunta.haTerminado = function(){
    var p;
    for(p = 0; p < this.conjunto.length; p++){
        if(!this.conjunto[p].contestada){
            return false;
        }
    }
    return true;
};
new Pregunta({texto:"<b>1.</b> Los peces est&aacute;n muriendo a causa de la contaminaci&oacute;n.", valor:true, retro:{bien:"Muy bien!", mal:"Muy mal!"}});
new Pregunta({texto:"<b>2.</b> La lluvia enfr&iacute;a el palpitar de mi coraz&oacute;n.", valor:false, retro:{bien:"correcto", mal:"Incorrecto"}});
new Pregunta({texto:"<b>3.</b> Fumar es nocivo para la salud.", valor:true, retro:{bien:"bien", mal:"mal"}});
new Pregunta({texto:"<b>4.</b> Las escaleras s&oacute;lo son &uacute;tiles para bajar.", valor:false, retro:{bien:"Excelente!", mal:"Pésimo!"}});

window.addEventListener("load", alCargar,false);
function alCargar(e){
    //alert("cargó :)");
    //Pregunta.conjunto = shuffle(Pregunta.conjunto);//Remover esta l&iacute;nea si no se quiere revolver
    for (var i=0; i<Pregunta.conjunto.length; i++) {
        document.getElementById("cuerpoPreguntas").innerHTML += "<tr class='setPregunta'><td class='preguntaOpciones'><img class='palomita' style='display:none' src='css/palomita.png' /><img class='tache' style='display:none' src='css/tache.png' /><input type='radio' name='pregunta"+i+"' value='true'> </td><td class='preguntaOpciones'><input type='radio' name='pregunta"+i+"' value='false'> </td><td class='preguntaTexto'>" + Pregunta.conjunto[i].datos.texto + "</td></tr><tr class='retroInactiva'><td colspan='3'><span class='respRetro correcta'>"+Pregunta.conjunto[i].datos.retro.bien+"</span><span class='respRetro incorrecta'>"+Pregunta.conjunto[i].datos.retro.mal+"</span></td></tr>";
    }
    bodyOriginal = document.body.innerHTML;
    iniciar();
}
function iniciar(){
    var inputs = document.getElementsByTagName("input");
    for (var i=0; i<inputs.length; i++){
        if(inputs[i].getAttribute("type") == "radio"){
            inputs[i].addEventListener("click", radioBotonApretar, false);
        }
    }
    //document.getElementById("botonRevisor").addEventListener("click",revisar,false);
}
function reiniciar(){
    for(var p = 0; p < Pregunta.conjunto.length; p++){
        Pregunta.conjunto[p].contestada = false;
    }
    document.body.innerHTML = bodyOriginal;
    iniciar();
}
function radioBotonApretar(evento){
    var nodoRetro = evento.target.parentNode.parentNode.nextSibling;
    nodoRetro.className = "retroActiva";
    var pregunta = evento.target.name.substr(8,2);
    if(revisarReactivo(parseInt(pregunta))){
        nodoRetro.querySelector("span.respRetro.incorrecta").style.display = "none";
        nodoRetro.querySelector("span.respRetro.correcta").style.display = "";
    } else {
        nodoRetro.querySelector("span.respRetro.correcta").style.display = "none";
        nodoRetro.querySelector("span.respRetro.incorrecta").style.display = "";
    }
    if(Pregunta.haTerminado()){
        revisar();
    }
}
function revisar(){
    //console.log("revisando");
    buenas = 0;
    for(var i = 0; i<Pregunta.conjunto.length; i++){
        revisarReactivo(i);
    }
    retroalimentar('Obtuviste '+ buenas + " de " + Pregunta.conjunto.length +'. <input type="button" value="Otra vez" onClick="reiniciar()">');
}
function revisarReactivo(numero){
    var radios = document.getElementsByName('pregunta'+numero);
    document.getElementsByClassName('palomita').item(numero).style.display = "none";
    document.getElementsByClassName('tache').item(numero).style.display = "none";
    var bien;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            //alert(radios[i].value+ " - " + Pregunta.conjunto[numero].valor);
            // only one radio can be logically checked, don't check the rest
            if(radios[i].value.toString() == Pregunta.conjunto[numero].datos.valor.toString()){
                buenas++;
                document.getElementsByClassName('palomita').item(numero).style.display = "";
                bien = true;
            } else {
                document.getElementsByClassName('tache').item(numero).style.display = "";
                bien = false;
            }
            Pregunta.conjunto[numero].contestada = true;//Si tiene algún radiobotón checked, está contestada
            break;
        }
    }
    return bien;
}
function retroalimentar(texto){
    document.getElementById("retroalimentacion").innerHTML = texto;
    document.getElementById("retroalimentacion").scrollIntoView();
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}