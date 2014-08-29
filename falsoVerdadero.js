/**
 * Created by adib on 27/08/14.
 */
var buenas = 0;
var bodyOriginal;
function Pregunta(objetoConDatos) {
    this.datos = objetoConDatos;
    Pregunta.conjunto.push(this);
}
Pregunta.conjunto = [];//Aquí se almacenan las preguntas
new Pregunta({texto:"<b>1.</b> Los peces est&aacute;n muriendo a causa de la contaminaci&oacute;n.", valor:true, retro:"<b>Sí</b>. La oración se encuentra sustentada en hechos que son comprobables en la realidad, conociendo a priori que la contaminación puede provocar la muerte de los seres vivos; a posteriori es posible corroborarlo y concluir que la oración describe la realidad."});
new Pregunta({texto:"<b>2.</b> La lluvia enfr&iacute;a el palpitar de mi coraz&oacute;n.", valor:false, retro:"<b>No</b>. Palpitar es una acción fisiológica del órgano denominado corazón; no existe relación directa entre las condiciones climatológicas y el funcionamiento del corazón."});
new Pregunta({texto:"<b>3.</b> Fumar es nocivo para la salud.", valor:true, retro:"<b>Sí</b>. Fumar daña la salud de las personas que lo hacen, incluyendo a los denominados fumadores pasivos; esta apreciación es posible reconocerla a partir de la observación del desarrollo de la salud física y psicológica de los fumadores."});
new Pregunta({texto:"<b>4.</b> Las escaleras s&oacute;lo son &uacute;tiles para bajar.", valor:false, retro:"<b>No</b>. Las escaleras son útiles en ambos sentidos; cuando decidimos subir es porque nos encontramos abajo en función de algo; por lo tanto, al subir estaremos arriba en función de donde partimos."});
new Pregunta({texto:"<b>5.</b> Observamos s&oacute;lo lo que la luz refleja.", valor:true, retro:"<b>Sí</b>. Los colores, las formas y todo lo que literalmente vemos, se explica por el uso de las células fotorreceptoras que tenemos en el ojo y que transforman el reflejo de la luz en impulsos eléctricos que son enviados vía el nervio óptico hacia nuestro cerebro."});
new Pregunta({texto:"<b>6.</b> Dios existe en los corazones de cada ser humano.", valor:false, retro:"<b>No</b>. El concepto de Dios no ha podido ser comprobado en la realidad, considerando además la imposibilidad que algo pueda habitar un musculo, cuya función es vital para el funcionamiento del organismo del ser humano."});
new Pregunta({texto:"<b>7.</b> La pobreza causa desnutrici&oacute;n.", valor:false, retro:"<b>No</b>. La desnutrición se puede explicar a partir de los hábitos de las personas y grupos, debiendo considerar en su análisis no sólo aspectos económicos, sino también aspectos culturales y psicológicos."});
new Pregunta({texto:"<b>8.</b> Rezar permite que ocurran los milagros.", valor:false, retro:"<b>No</b>. La realidad se entreteje a partir de una cadena de eventos, en donde interviene una gran cantidad de factores, sujetos, elementos y decisiones; por lo que es innegable que cualquier hecho, puede ser corroborado desde dicha cadena de eventos."});
new Pregunta({texto:"<b>9.</b> La gravedad atrae a todos los cuerpos al centro de la tierra. ", valor:true, retro:"<b>Sí</b>. La fuerza que mantiene a todos los cuerpos con masa en la tierra, y que requiere de un impulso para vencer su resistencia, es la gravedad; aun antes de que pudiera ser explicada, ésta ya existía y nos permite comprender el funcionamiento de nuestro sistema solar y el universo."});
new Pregunta({texto:"<b>10.</b> La conciencia de la conciencia nos distingue en el reino animal.", valor:true, retro:"<b>Sí</b>. La conciencia del ser no es exclusiva del ser humano, ya que la podemos encontrar en algunos otros mamíferos; sin embargo, el uso de ésta, para el desarrollo de la humanidad, es exclusivo de la especie humana; el sentido de moral, ética y la trascendencia, sólo es posible explicarlos en función de ella."});

window.addEventListener("load", alCargar,false);
function alCargar(e){
    //alert("cargó :)");
    //Pregunta.conjunto = shuffle(Pregunta.conjunto);//Remover esta l&iacute;nea si no se quiere revolver
    for (var i=0; i<Pregunta.conjunto.length; i++) {
        document.getElementById("cuerpoPreguntas").innerHTML += "<tr class='setPregunta'><td class='preguntaOpciones'><img class='palomita' style='display:none' src='palomita.png' /><img class='tache' style='display:none' src='tache.png' /><input type='radio' name='pregunta"+i+"' value='true'> </td><td class='preguntaOpciones'><input type='radio' name='pregunta"+i+"' value='false'> </td><td class='preguntaTexto'>" + Pregunta.conjunto[i].datos.texto + "</td></tr><tr class='retroInactiva'><td colspan='3'>"+Pregunta.conjunto[i].datos.retro+"</td></tr>";
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
    document.getElementById("botonRevisor").addEventListener("click",revisar,false);
}
function reiniciar(){
    document.body.innerHTML = bodyOriginal;
    iniciar();
}
function radioBotonApretar(evento){
    evento.target.parentNode.parentNode.nextSibling.className = "retroActiva";
    var pregunta = evento.target.name.substr(8,2);
    revisarReactivo(parseInt(pregunta));
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
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            //alert(radios[i].value+ " - " + Pregunta.conjunto[numero].valor);
            // only one radio can be logically checked, don't check the rest
            if(radios[i].value.toString() == Pregunta.conjunto[numero].datos.valor.toString()){
                buenas++;
                document.getElementsByClassName('palomita').item(numero).style.display = "";
            } else {
                document.getElementsByClassName('tache').item(numero).style.display = "";
            }
            break;
        }
    }
}

function retroalimentar(texto){
    document.getElementById("retroalimentacion").innerHTML = texto;
    document.getElementById("retroalimentacion").scrollIntoView();
}

function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;
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