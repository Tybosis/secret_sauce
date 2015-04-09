var encoder = {
  setMessage: function() {
    message = $("textarea#message").val();
  },
  getPassword: function() {
    $("form").remove();
    $("p").remove();
    $("<p>Please enter a password:</p>").appendTo("#openModal div");
    $('<form>Password: <input type="password" class="password"></form>').appendTo("#openModal div");
    $( "form" ).submit(function( event ) {
      event.preventDefault();
      password = $("form .password").val();
      url = encoder.encrypt();
      var current_url = "localhost:3000/decoder.html";
      $('<p>Your encrypted message is available to anyone with the passphrase at:</p>').appendTo("#openModal div");
      $('<p id=secreturl>' + current_url + "?key=" + url + '</p>').appendTo("#openModal div");
    });
  },
  setUrl: function() {
    url = encoder.encrypt();
  },
  replaceMessageWithUrl: function () {

  },
  encrypt: function() {
    this.cypher = CryptoJS.AES.encrypt(message, password);
    return this.cypher;
  },
  protect: function() {
    this.setMessage();
    this.getPassword();
    this.setUrl();
    this.replaceMessageWithUrl();
  },
  decrypt: function() {
    var password = prompt('Please enter the correct password');
    var full_url = window.location.toString().match(/\=(.*)/)[1];
    alert(CryptoJS.AES.decrypt(full_url.toString(), password).toString(CryptoJS.enc.Utf8));
  }
};

$("button#encrypt").on('click', function() {
  window.location = "http://localhost:3000#openModal";
  encoder.protect();
});

$("button#decrypt").on('click', function() {
  encoder.decrypt();
});
