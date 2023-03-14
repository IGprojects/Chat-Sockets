//S HA DE FICAR LA IP DEL ORDINADOR TEU LA DEL WIFI

var socket = io.connect('http://192.168.1.37:8310', { 'forceNew': true });
/*LLAVORS UN COP CONECTATS PODREM CONECTARNOS DES DE ALGUNA ALTRE DISPOSITIU QUE ESTIGUI EN LA 
MATEIXA RED POSANT LA URL http://192.168.1.37:8310*/

//REBRE I RENDERITZAR MISSATGE REBUT DEL SERVIDOR
socket.on('messages', (data) => {
    render(data);
});
//AIXO ES PER REBRE MISSATGES I 'MESSAGES' ES EL NOM DEL EVENT QUE LI POSAT EL SERVIDOR

function render(data) {//renderitza els missatges a la pagina html
    var html = data.map((dataRebuda) => {
        return (`<p class="messageNou"><a class="nickClass">${dataRebuda.nickname}</a> - ${dataRebuda.message}</p>`);
    }).join(' ');//PER EVITAR QUE U CONCATENI AMB COMA

    var ContenidorMessatges = document.getElementById('messages');

    ContenidorMessatges.innerHTML = html;
    var scroll = document.getElementsByClassName('code');
    scroll.scrollTop = scroll.scrollHeight;
}

function addMessage(e) {
    var message = {
        nickname: document.getElementById("nickname").value,
        message: document.getElementById("text").value,
    }

    document.getElementById("text").value = '';
    document.getElementById("nickname").style.display = 'none';

    socket.emit('add-message', message);
    //Li enviem al servidor el missatge pq despres l envii ha tots els clients conectats al servidor
    return false;
}