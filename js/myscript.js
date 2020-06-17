$(document).ready(
  function() {

    // ===================================================
    // =========== INVIO IL MESSAGGIO ALLA CHAT ==========

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

   // ===================================================
   // ========= ELIMINO IL MESSAGGIO ALLA CHAT ==========

    // Evento mouse enter sul messaggio nella chat
    $(document).on( 'mouseenter', '.tamplate',
      function() {
        $(this).find('.msg-time .message-options').removeClass('hidden');

      // Al click sulla freccetta rimuovo classe .hidden delle opzioni
      $(this).find('.msg-time .message-options').click(
        function() {
          $(this).siblings('.msg-option-dropdown').removeClass('hidden')

          // All click su "elimina messaggio" - elimino tutto il mesaggio
          $(this).siblings('.msg-option-dropdown').click(
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
         $(this).find('.msg-option-dropdown').addClass('hidden')
     });


     // RICERCA TRA I CONTATTI
     $('input.search-contact').keypress(function(event) {
       var searchResult = searcContactName();
       if(event.which === 13) {
         searchResult
       }
     });


     // // DEBUG:
     // $('.search-contact').keypress(
     //   function(event) {
     //     if(event.which === 13) {
     //       var searchContact = $('input.search-contact').val().toLowerCase();
     //       console.log(searchContact);
     //       var contactName = $('.contact-name').each(function() {
     //         $(this).find(this)
     //         console.log(contactName);
     //       });
     //
     //     }
     //   }
     // );
     //
     // var searchContact = $('.search-contact').val();
     // console.log(searchContact)


  }); // End document ready

// ==============================================
// =============== FUNCTIONS ====================

  // Function aggiungi l'elemento con il tamplate
  function addElement(value) {
    // Clone tamplate dal DOM html
    var messageTamplate = $('.hidden .tamplate').clone();
    var messageSendTime = getCurrentTime();

    // Aggiungo al Tamplate il valore del input
    messageTamplate.find('.msg-text').append(value);
    messageTamplate.find('.msg-send-time').append(messageSendTime);

    // Inserisco il messaggio alla chat
    $('.chat-window').append(messageTamplate);

    // Resetto il valore iniziale (vuoto) dell'input
    value = $('.new-msg').val('');

    // Scroll to bottom
    $('.chat-window').scrollTop($('.chat-window').height());
    console.log($('.chat-window').height())
  }

  // Prendo l'ora corrente
  function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = zeroBeforeMinutes(date.getMinutes());
    var time = hours + ':' + minutes;

    return time
  }

  // Zero prima dei minuti
  function zeroBeforeMinutes(minute) {
    if(minute < 10) {
      minute = '0' + minute
    }
    return minute
  }

  function searcContactName() {
    $('.search-contact').keyup(
      function() {
      var searchContact = $('input.search-contact').val().toLowerCase();
        $('li').each( function() {

          var contactName = $(this).find('.contact-name').text().toLowerCase();
          if( contactName.includes(searchContact) ) {
            $(this).show();
          } else {
            $(this).hide();
          }
        }); // end each
      } //keypress function

    ); // keypress end
  } // end function
