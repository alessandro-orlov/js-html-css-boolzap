$(document).ready(
  function() {

    // ========================================================
    // === MOSTRO CONTATTO CLICCATO NELLA SEZIONE A DESTRA ====

    $('li.contact-js').click(
      function() {
        // Seleziono dati dell'utente su quale clicco
        // Seleziono Avatar
        var avatarSrc = $(this).find('img').attr('src');
        console.log(avatarSrc);
        // Seleziono Nome
        var contactName = $(this).find('.contact-name').text();
        console.log(contactName)

        // Sostituisco dati del ".active-contact" con quelli cliccati
        // Sostituisco Avatar
        var currentContactAvatar = $('.active-contact').find('img').attr('src', avatarSrc);
        console.log(currentContactAvatar)
        // Sostituisco il nome
        var currentContactName = $('.active-contact').find('.contact-name').text(contactName)
        console.log(currentContactName)

        // Aggiungo classe active al contatto cliccato e lo rimuovo a quello
        // attualmente attivo
        $(this).siblings().removeClass('active');
        $(this, 'li.contact-js').addClass('active');
    });


    // =======================================================
    // ========== MOSTRO CHAT DEL CONTATTO ATTIVO ===========

    // Seleziono la chat del contatto attivo
    $('li.contact-js').click(
      function() {
        // Seleziono attr di controllo sul contatto
        var dataContact = $(this).attr('data-contact');
        console.log(dataContact);

        var dataChat = '.chat-saved[data-chat="'+ dataContact +'"]';
        console.log('dataChat: ' + dataChat);
        $(dataChat).addClass('visible');
        $(dataChat).siblings().removeClass('visible');

      });






    // ===================================================
    // =========== INVIO IL MESSAGGIO ALLA CHAT ==========

    // Al click prendo il valore del input
    $('button.add-message-js').click(function() {
      // Prendo il vaolre dell'input
      var messaggioVal = $('.new-msg').val();
      var risposta = 'ok';
      // Aggiungo il messaggio tamplate alla chat
      if( messaggioVal !='' ) {
        myMessage(messaggioVal);

        setTimeout(function() {
          responseMessage(risposta)
        }, 1500);
      } // End if
    }); // End click on button event

    // Invio il messagio alla chat premendo l'invio
    $('.new-msg').keypress(function(event) {
      var messaggioVal = $('.new-msg').val();
      var risposta = 'Ciao';
      if( (messaggioVal !='' ) && (event.which === 13) ) {
        // Stampo il messagio nella chat window
        myMessage(messaggioVal);

        // Dopo 1.5s invio la risposta
        setTimeout(function() {
          responseMessage(risposta)
        }, 1500);
      } // End if

    }); // End keypress event

   // ===================================================
   // ========= ELIMINO IL MESSAGGIO DALLA CHAT ==========

    // Evento mouse enter sul messaggio nella chat
    $(document).on( 'mouseenter', '.message',
      function() {
        $(this).find('.msg-time .message-options').removeClass('hidden');

      // Al click sulla freccetta rimuovo classe .hidden delle opzioni
      $(this).find('.msg-time .message-options').click(
        function() {
          $(this).siblings('.msg-option-dropdown').toggleClass('hidden');
          // All click su "elimina messaggio" - elimino tutto il mesaggio
          $(this).siblings('.msg-option-dropdown').click(
            function() {
              $(this).parents('.message').remove();
          });
      });

    }); // End mouese enter event sul messaggio

    // Quando il mouse esce nascondo la freccetta
    $(document).on( 'mouseleave', '.message',
      function() {
        $(this).find('.msg-time .message-options').addClass('hidden');

         // Nascondo il dropdown delle opzioni messaggio qualora fosse aperto
         $(this).find('.msg-option-dropdown').addClass('hidden')
     });

     //==========================================
     //======== RICERCA TRA I CONTATTI ==========
     $('input.search-contact').keypress(function(event) {
       var searchResult = searcContactName();
       if(event.which === 13) {
         searchResult
       }
     });

  }); // End document ready



// ==============================================
// =============== FUNCTIONS ====================

  // Function invio del messaggio dell'utente
  function myMessage(testoMessaggio) {
    // Clone tamplate dal DOM html
    var messageTamplate = $('.tamplate .message.send').clone();
    var messageSendTime = getCurrentTime();

    // Aggiungo al Tamplate il valore del input
    messageTamplate.find('.msg-text').append(testoMessaggio);
    messageTamplate.find('.msg-send-time').append(messageSendTime);

    // Inserisco il messaggio alla chat
    $('.chat-window .visible').append(messageTamplate);

    // Resetto il valore iniziale (vuoto) dell'input
    testoMessaggio = $('.new-msg').val('');

    // Scroll to bottom
    $('.chat-window').scrollTop($('.chat-window').height());
    console.log($('.chat-window').height())
  }

  // Function risposta al messaggio
  function responseMessage(text) {
    var responseTamplate = $('.tamplate .message.recieved').clone();
    var responseTime = getCurrentTime();

    // Aggiungo la risposta con .text();
    responseTamplate.find('.msg-text').text(text);
    responseTamplate.find('.msg-send-time').append(responseTime);

    // Aggiungo il messaggi di risposta alla chat
    $('.chat-window .visible').append(responseTamplate);

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

  // Funzione per cercare il nome del utente o chat
  function searcContactName() {
    $('.search-contact').keyup( function() {
      var searchContact = $('input.search-contact').val().toLowerCase();
      var allContacts = $('li.contact-js');

      allContacts.each( function() {
        var contactName = $(this).find('.contact-name').text().toLowerCase();
        if( contactName.includes(searchContact) ) {
          $(this).show();
        } else {
          $(this).hide();
        }
      }); // End each
    }); // End keyup function
  } // End searcContactName() function
