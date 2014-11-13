var socket = io(); // Inicializamos socketIO en el cliente

    /**
     * Listener para el evento 'chat message'
     *   Notese que es el mismo evento que se envia 
     *   desde el servidor.
     * Agregamos el mensage entrante a la lista.
     */
     socket.on('chat message', function (msg) {
      $('#list-msgs').append( $('<li>').text(msg) );
  });
     
     socket.on('mostrar_reloj', function (msg) {
      $('#mostrar_reloj').text(msg);
  });
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

     $(document).on('click','#reloj', function (evt){
        socket.emit('reloj');
    });