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

        // Aggiungo classe active al contatto cliccato e lo rimuovo a quello attualmente attivo
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

        // Aggiungo classe visible alla chat del contatto cliccato
        $(dataChat).addClass('visible');
        // Rimuovo classe visibile a tutti gli altri
        $(dataChat).siblings().removeClass('visible');
    });


    // =====================================================
    // =========== INVIO IL MESSAGGIO ALLA CHAT ============

    // ================ BUTTON ==============
    // Al click sul pulasnte prendo il valore del input
    $('button.add-message-js').click(function() {
      // Prendo il valore per il messagio da stampare
      var messaggioVal = $('.new-msg').val();

      // Risposta in base al valore dell'input con la funzione(line: 255)
      var response = responseVariant(messaggioVal);

      // Prendo l'orario corrente con la funzione (line: 224)
      var lastSeenTime = getCurrentTime();

      // TAMPLATE
      var messageTamplate = $('.tamplate .message.send').clone();
      var responseTamplate = $('.tamplate .message.recieved').clone();

      // Aggiungo il messaggio tamplate alla chat
      if( messaggioVal !='' ) {
        // Stampo il messagio nella chat window message function (line: 128)
        message(messaggioVal, messageTamplate);

        // Dopo 0.5s Visualizzo che si sta digitando la risposta per 3.5s
        typingResponse(500, 3500, 7000, lastSeenTime);

        // Stampo il messaggio di risposta dopo 3.5s
        setTimeout(function() {
          message(response, responseTamplate);

          // Cambio il tempo dell'ultima visita del contatto attivo
          $('li.contact-js.active').find('.time-stamp').text(lastSeenTime);

        }, 3500);

      } // End if
    }); // End click on button event

    // ================ ENTER ==================
    // Invio il messagio alla chat premendo l'invio
    $('.new-msg').keypress(function(event) {
      // Prendo il valore per il messagio da stampare
      var messaggioVal = $('.new-msg').val();

      // Risposta in base al valore dell'input con la funzione(line: 255)
      var response = responseVariant(messaggioVal);

      // Inserisco l'orario corrente del messagio
      var lastSeenTime = getCurrentTime();

      // TAMPLATE
      var messageTamplate = $('.tamplate .message.send').clone();
      var responseTamplate = $('.tamplate .message.recieved').clone();

      if( (messaggioVal !='' ) && (event.which === 13) ) {
        // Stampo il messagio nella chat-window
        message(messaggioVal, messageTamplate);

        // Dopo 0.5s Visualizzo che si sta digitando la risposta per 2.5s
        typingResponse(500, 2500, 7000, lastSeenTime);

        // Ricevo la risposta dopo 2.5s
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

     // ==========================================
     // ============ Focus sul input =============
     $('.write-message input.new-msg').focus(
       function() {
         $('.send-normal-msg').addClass('active');
         $('.send-audio-msg').removeClass('active');
       }
     );
     $('.write-message input.new-msg').blur(
       function() {
         $('.send-normal-msg').removeClass('active');
         $('.send-audio-msg').addClass('active');
       }
     );
  }); // End document ready


// ==============================================
// =============== FUNCTIONS ====================

// Function messagio tamplate
function message(text, tamplate) {
  var responseTime = getCurrentTime();

  // Aggiungo la risposta con .text();
  tamplate.find('.msg-text').text(text);
  tamplate.find('.msg-send-time').replaceWith(responseTime);

  // Aggiungo il messaggi di risposta alla chat attualmente visualizzata ('.visible)
  $('.chat-window .visible').append(tamplate);

  // Resetto il valore iniziale (vuoto) dell'input
  text = $('.new-msg').val('');

  // Scroll to bottom
  $('.chat-window').scrollTop($('.chat-window').height());
  console.log($('.chat-window').height())
}

// Funzione risposta temporanea
function typingResponse(durationTime, onlineTime, afterTime, timeSeen) {
  setTimeout( function() {
    // Cambio la scritta per un tot di millesecondi (durationTime)
    $('.contact-last-seen').text('Sta scrivendo ... ')
  }, durationTime);

  setTimeout(function() {
    $('.contact-last-seen').text('Online ')
  }, onlineTime);

  setTimeout( function() {
    // Cambio i l'orario dell'ultima visita nella lista del contatto attivo
    $('li.contact-js.active').find('.time-stamp').text(timeSeen);

    // Campio nuovamente la scritta ripristinando il tag originale "last-time-seen"" dell'ultimo accesso
    $('.contact-last-seen').html('Ultimo accesso alle: <span class="last-time-seen"></span>');

    // Prendo l'orario aggiornato del conatto attivo e lo metto nel tag ripristinato
    $('.contact-last-seen').find('.last-time-seen').text(timeSeen);

  }, afterTime);


} // End funzione temporalResponse


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
      // Inserisco il valore da cercare
      var searchQuery = $('input.search-contact').val().toLowerCase();

      // Lista di tutti i contati
      var allContacts = $('li.contact-js');

      // Il ciclo di verifica per tutti i contatti
      allContacts.each( function() {

        // Seleziono il nome del contatto ('.contact-name')
        var contactName = $(this).find('.contact-name').text().toLowerCase();

        if( contactName.includes(searchQuery) ) {
          // Viusalizzo il contatto se contiene il valore inserito nella search
          $(this).show();
        } else {
          // Nascondo altri contatti
          $(this).hide();
        }
      }); // End each
    }); // End keyup function
  } // End searcContactName() function


  // Funzione per la risposta - stupid & minimal AI :D
  function responseVariant(value) {
    var response;

    // Modifico la risposta se il nel messaggio inviato dall'utente è presente un determinato carattere o parola
    switch (true) {
      case value.includes('?'), value.includes('musica'):
        response = 'Adoro la musica';
        break;
      case value.includes('!'):
        response = 'Si, ma stai calmo';
        break;
      case value.includes('ciao'), value.includes('mondo'):
        response = 'Hello World';
        break;
      case value.includes('ciao') || value.includes('buongiorno') :
        response = 'Ehila';
        break;
      case value.includes('?'):
        response = 'che?';
        break;
      case value.includes('ok'):
        response = 'okey';
        break;
      default:
        response = 'ok :)';
    }
    return response;
  };
