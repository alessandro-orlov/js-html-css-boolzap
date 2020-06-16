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


   // All passaggio del mouse visualizzo opzione elimina messaggio
   $(document).on( 'mouseenter', '.tamplate',
    function() {
      $(this).find('i').removeClass('hidden');
      // Al click appare dropdown per eliminare il messaggio
    });

  // Quando il mouse esce scompare l'opzione elimina messagio
  $(document).on( 'mouseleave', '.tamplate',
   function() {
     $(this).find('i').addClass('hidden');
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
