$(document).ready(init);

var socket;

function init(){

	socket = io(); // Inicializamos socketIO en el cliente

    /**
     * Listener para el evento 'chat message'
     *   Notese que es el mismo evento que se envia 
     *   desde el servidor.cambios
     * Agregamos el mensage entrante a la lista.
     */
     socket.on('chat message', function (msg) {
      $('#list-msgs').append( $('<li>').text(msg) );
    });

     socket.on('mostrar_reloj', function (msg) {
      $('#mostrar_reloj').text(msg);
      actualizarBarra(msg);
    });

     socket.on('mostrar_votos', function (msg) {
      $('#mostrar_votos').text(msg);
    });

     socket.on('mostrar_grafica', function (resultados){
      var data={labels : ['Voto A','Voto B','Voto C','Voto D'],datasets : [{fillColor : "rgba(11,11,97,0.9)",strokeColor : "rgba(11,11,97,1)",pointColor : "rgba(11,11,97,1)",pointStrokeColor : "#fff",data : resultados}]};
      var ctx=document.getElementById('myChart').getContext('2d');
      new Chart(ctx).Bar(data, {showLegend: true});
    });

     socket.on('deshabilitar_votos',function(msg){
      deshabilitar_votos();
    });

     socket.on('habilitar_votos',function(){
       $('#votA').attr("disabled", false);
       $('#votB').attr("disabled", false);
       $('#votC').attr("disabled", false);
       $('#votD').attr("disabled", false);
     })
    /**
     * Emitimos un evento de tipo 'chat message' cada vez
     * que se presiona 'Enter' en el textarea y enviamos
     * su contenido como mensaje.
     */
     $('#new-msg').keyup(function (evt) {
      if (evt.keyCode === 13) {
        socket.emit('chat message', $('#new-msg').val());
        $('#new-msg').val('');
      }
    });
   }

   $(document).on('click','#reloj', function (evt){
    socket.emit('reloj');
  });

   $(document).on('click','#votA', function (evt){
    //deshabilitar_votos();
    socket.emit('votA');
  });

   $(document).on('click','#votB', function (evt){
    //deshabilitar_votos();
    socket.emit('votB');
  });

   $(document).on('click','#votC', function (evt){
    //deshabilitar_votos();
    socket.emit('votC');
  });

   $(document).on('click','#votD', function (evt){
    //deshabilitar_votos();
    socket.emit('votD');
  });

   function deshabilitar_votos(){
    $('#votA').attr("disabled", true);
    $('#votB').attr("disabled", true);
    $('#votC').attr("disabled", true);
    $('#votD').attr("disabled", true);
  }

  function actualizarBarra(msg){
    var porc=(60-msg)*100/60;
    var txt="<div class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: "+porc+"%;'></div>";
    $('#progress').empty();
    $('#progress').append(txt);
  }
/*
$(document).on('click','#votsi', function (evt){
    socket.emit('votsi');
});

 $(document).on('click','#votno', function (evt){
    socket.emit('votno');
});*/