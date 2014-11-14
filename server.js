/**
 * Server.js
 * @author : octaedro | https://twitter.com/fermarichal
 * @Created on: 11 Nov, 2014
 */

/* Librerias necesarias para la aplicacion*/
var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var votos = 0;

var resultados = [0,0,0,0];
/** *** *** ***
 *  Configuramos el sistema de ruteo para las peticiones web
 *  de manera que sin importar la ruta que el usuario solicite
 *  siempre lo direccionaremos al html del sistema de chat.
 */
app.get('/', function(req, res) {
  res.sendFile( __dirname + '/views/chat.html');
});

app.get('/admin', function(req, res) {
  res.sendFile( __dirname + '/views/admin.html');
});

app.get('/files/js/script.js', function(req, res) {
  res.sendFile( __dirname + '/files/js/script.js');
});

app.get('/files/js/Chart.js', function(req, res) {
  res.sendFile( __dirname + '/files/js/Chart.js');
});

app.get('/files/css/styles.css', function(req, res) {
  res.sendFile( __dirname + '/files/css/styles.css');
});


/** *** *** ***
 *  Configuramos Socket.IO para estar a la escucha de
 *  nuevas conexiones.
 */
io.on('connection', function(socket) {

  
  console.log('New user connected');
  
  /**
   * Cada nuevo socket debera estar a la escucha
   * del evento 'chat message', el cual se activa
   * cada vez que un usuario envia un mensaje.
   * 
   * @param  msg : Los datos enviados desde el cliente a 
   *               travÃ©s del socket.
   */
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('reloj', function(msg) {
    reloj(60);
  });

  socket.on('votA', function() {
    resultados[0]=resultados[0]+1;
    io.emit('mostrar_grafica',resultados);
  });
  
  socket.on('votB', function() {
    resultados[1]=resultados[1]+1;
    io.emit('mostrar_grafica',resultados);
  });

  socket.on('votC', function() {
    resultados[2]=resultados[2]+1;
    io.emit('mostrar_grafica',resultados);
  });
  
  socket.on('votD', function() {
    resultados[3]=resultados[3]+1;
    io.emit('mostrar_grafica',resultados);
  });
/*
  socket.on('votsi', function() {
    votos++;
    io.emit('mostrar_votos',votos);
  });
  
  socket.on('votno', function() {
    votos--;
    io.emit('mostrar_votos',votos);
  });

  /**
   * Mostramos en consola cada vez que un usuario
   * se desconecte del sistema.
   */
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  
});


/**
 * Iniciamos la aplicaciÃ³n en el puerto 3000
 */
http.listen(3000, function() {
  console.log('listening on *:3000');
});

function reloj(i){    
    setInterval(function(){
      if(i<60){
        io.emit('mostrar_reloj',--i); 
      }
      else{
        clearInterval();
      }
    }, 1000);
}