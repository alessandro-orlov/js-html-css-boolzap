$(document).ready(
  function() {

    // ========================================================
    // === MOSTRO CONTATTO CLICCATO NELLA SEZIONE A DESTRA ====

    $('li.contact-js').click(
      function() {
        // Seleziono dati dell'utente su quale clicco
        // Seleziono Avatar
        var avatarSrc = $(this).find('img').attr('src');

        // Seleziono Nome
        var contactName = $(this).find('.contact-name').text();

        // Seleziono l'orario dell'ultima volta online
        var lastTimeSeen = $(this).find('.time-stamp').text();
        console.log(lastTimeSeen)

        // Sostituisco dati del ".active-contact" con quelli cliccati
        // Sostituisco Avatar
        $('.active-contact').find('img').attr('src', avatarSrc);

        // Sostituisco il nome
        $('.active-contact').find('.contact-name').text(contactName);

        // Sostituisco l'orraio dell'ultima visita
        $('.active-contact').find('.last-time-seen').text(lastTimeSeen);

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
        var dataChat = '.chat-saved[data-chat="'+ dataContact +'"]';

        $(dataChat).addClass('visible');
        $(dataChat).siblings().removeClass('visible');

    });


    // ===================================================
    // =========== INVIO IL MESSAGGIO ALLA CHAT ==========

    // Al click sul pulasnte prendo il valore del input
    $('button.add-message-js').click(function() {
      // Prendo il valore per il messagio da stampare
      var messaggioVal = $('.new-msg').val();
      var response = 'ok';

      var lastSeenTime = getCurrentTime();

      // TAMPLATE
      var messageTamplate = $('.tamplate .message.send').clone();
      var responseTamplate = $('.tamplate .message.recieved').clone();

      // Aggiungo il messaggio tamplate alla chat
      if( messaggioVal !='' ) {
        // Stampo il messagio nella chat window (riga JS 128)
        message(messaggioVal, messageTamplate);

        temporalResponse(500, 3500, lastSeenTime);

        // Ricevo la risposta dopo 3.5s
        setTimeout(function() {
          message(response, responseTamplate);

          // Cambio il tempo dell'ultima visita del contatto attivo
          $('li.contact-js.active').find('.time-stamp').text(lastSeenTime);


        }, 3500);




      } // End if
    }); // End click on button event

    // Invio il messagio alla chat premendo l'invio (enter sulla tastiera)
    $('.new-msg').keypress(function(event) {
      // Prendo il valore per il messagio da stampare
      var messaggioVal = $('.new-msg').val();
      var response = 'Ciao';
      var lastSeenTime = getCurrentTime();

      // TAMPLATE
      var messageTamplate = $('.tamplate .message.send').clone();
      var responseTamplate = $('.tamplate .message.recieved').clone();

      if( (messaggioVal !='' ) && (event.which === 13) ) {
        // Stampo il messagio nella chat-window
        message(messaggioVal, messageTamplate);

        temporalResponse(500, 2500, lastSeenTime);

        // Ricevo la risposta dopo 1.5sW
        setTimeout(function() {
          message(response, responseTamplate);

          // Cambio il tempo dell'ultima visita del contatto attivo
          $('li.contact-js.active').find('.time-stamp').text(lastSeenTime);

        }, 2500);
      } // End if

    }); // End keypress event

    // ===================================================
    // ========= ELIMINO IL MESSAGGIO DALLA CHAT ==========

    // Al click sulla freccetta rimuovo classe .hidden delle opzioni
    $(document).on('click', '.msg-time .message-options',
      function() {
        // Nascondo altri opzioni qualora fossero aperti e gli chiudo ver.1
        $(this).parents('.message').siblings().find('.msg-option-dropdown').removeClass('active');

        // // Nascondo altri opzioni qualora fossero aperti e gli chiudo ver.2
        // $(this).parent().parent().siblings().find('.msg-option-dropdown').removeClass('active');

        // Nascondo altri opzioni qualora fossero aperti e li chiudo ver.2
        $(this).parent().parent().siblings().find('.msg-option-dropdown').removeClass('active');

        // Visualizzo e nascondo opzione del messaggio al click sulla frecetta
        $(this).siblings('.msg-option-dropdown').toggleClass('active');

        // All click su "elimina messaggio" - elimino tutto il mesaggio (riga JS 158)
        eliminaMessaggio()
    });


     //==========================================
     //======== RICERCA TRA I CONTATTI ==========
     // Invoco la funzione di ricerca (riga JS 185)
     searcContactName();


  }); // End document ready


// ==============================================
// =============== FUNCTIONS ====================

// Function messagio tamplate
function message(text, tamplate) {
  var responseTime = getCurrentTime();

  // Aggiungo la risposta con .text();
  tamplate.find('.msg-text').text(text);
  tamplate.find('.msg-send-time').replaceWith(responseTime);

  // Aggiungo il messaggi di risposta alla chat
  $('.chat-window .visible').append(tamplate);

  // Resetto il valore iniziale (vuoto) dell'input
  text = $('.new-msg').val('');

  // Scroll to bottom
  $('.chat-window').scrollTop($('.chat-window').height());
  console.log($('.chat-window').height())
}

// Funzione risposta temporanea
function temporalResponse(durationTime, afterTime, timeSeen) {
  setTimeout( function() {
    $('.contact-last-seen').text('sta rispondendo ... ')
  }, durationTime);

  setTimeout( function() {

    $('li.contact-js.active').find('.time-stamp').text(timeSeen);
    $('.contact-last-seen').html('Ultimo accesso alle: <span class="last-time-seen"></span>')
    $('.contact-last-seen').find('.last-time-seen').text(timeSeen);

  }, afterTime);


}


  // Funzione Elimina messaggio
  function eliminaMessaggio() {
    $('.msg-time .message-options').siblings('.msg-option-dropdown').click(
      function() {
        $(this).parents('.message').remove();
    });
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


  // Funzione di ricerca per il nome dell'utente o chat
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
