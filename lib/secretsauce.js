var encoder = {
  setMessage: function() {
    this.message = $("textarea#message").val();
  },
  getPassword: function() {
    this.password = prompt("Please enter the password you would like to use");
  },
  setUrl: function() {
    this.url = encoder.encrypt();
  },
  replaceMessageWithUrl: function () {
    var current_url = "localhost:3000/decoder.html";
    var new_message = 'Your encrypted message is available to anyone with the passphrase at:\n\n';
    $("textarea#message").val(new_message + current_url + "?key=" + this.url);
  },
  encrypt: function() {
    this.cypher = CryptoJS.AES.encrypt(this.message, this.password);
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
  encoder.protect();
});

$("button#decrypt").on('click', function() {
  encoder.decrypt();
});
