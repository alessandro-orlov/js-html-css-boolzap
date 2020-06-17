$(document).ready(
  function() {

    // Al click prendo il valore del input
   $('button.add-message-js').click(function() {
     // Prendo il vaolre dell'input
     var messagioVal = $('.new-msg').val();

     // Aggiungo il messaggio tamplate alla chat
     if(messagioVal.length === 0) {
       //non stampa niente se non è stato inserito alcun carattere
     } else {
       addElement(messagioVal);
     }
     console.log(messagioVal.length)
   });

   // Invio il messagio alla chat premendo l'invio
   $('.new-msg').keypress(function(event) {
     var messagioVal = $('.new-msg').val();
     if( messagioVal.length === 0) {
       // non stampa nulla
     } else if (event.which === 13) {
        addElement(messagioVal);
      }
   });


    // Al passaggio del mouse visualizzo freccetta
    $(document).on( 'mouseenter', '.tamplate',
      function() {
        $(this).find('.msg-time .message-options').removeClass('hidden');

      // Al click sulla freccetta rimuovo classe .hidden delle opzioni
      $(this).find('.msg-time .message-options').click(
        function() {
          $(this).siblings('.dropdown-canc-msg').toggleClass('hidden')

          // All click su "elimina messaggio" - elimino tutto il mesaggio
          $(this).siblings('.dropdown-canc-msg').click(
            function() {
              $(this).parents('.tamplate').remove();
          });
      });
    }); // End mouese enter event sul messaggio

    // Quando il mouse esce nascondo la freccetta
    $(document).on( 'mouseleave', '.tamplate',
      function() {
        $(this).find('.msg-time .message-options').addClass('hidden');

         // Nascondo il dropdown delle opzioni messaggio qualora fosse aperto
         $(this).find('.dropdown-canc-msg').addClass('hidden')
     });





  }); // End document ready

// ==============================================
// =============== FUNCTIONS ====================

// // Function aggiungi l'elemento con il tamplate
  function addElement(value) {
    // Clone tamplate dal DOM html
    var messageTamplate = $('.flexy .tamplate').clone();

    // Aggiungo al Tamplate il valore del input
    messageTamplate.prepend('<div class="msg-text">' + value + '</div>');

    // Inserisco il messaggio alla chat
    $('.chat-window').append(messageTamplate);

    // Resetto il valore iniziale (vuoto) dell'input
    value = $('.new-msg').val('');
  }
