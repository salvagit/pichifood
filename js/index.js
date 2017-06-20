// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

var autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('addrHome')),
      {types: ['geocode'],
      componentRestrictions: {country: 'ar'}});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', function (a,b) {
    // Get the place details from the autocomplete object.
    var place = this.getPlace();
    Main.location = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    };
    Main.submitForm();
    console.log(Main);
  });
}

var Main = {
  form: {},
  init: function () {
    this.form = document.getElementById('searchForm');
    this.bindActions();
    this.pingService();
  },
  bindActions: function () {

    this.form.addEventListener('submit', function(e) {
      e.preventDefault();
      window.location = './alimentos-por-zona.html?q=' +
                         encodeURI(this.getElementsByTagName('input')[0].value) +
                         '&lat=' + Main.location.latitude + '&lng=' + Main.location.longitude;
    });

    document.querySelector('#pichiContact').addEventListener('submit', function(e){
      e.preventDefault();
      var data = [];
      this.querySelectorAll('* > *').forEach(function(el) {
        if (el && el.name) data[el.name] = el.value;
      });
      $.ajax({
        url: Main.globals.apiUrl + '/contact/',
        method: 'post',
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        },
        success: function (data) {
          console.info(data);
          document.querySelectorAll('#pichiContact')[0].reset();
        },
        error: function (err) {console.error(err);}
      });
    });
  },
  submitForm: function () {
    var submitForm = new Event('submit');
    this.form.dispatchEvent(submitForm);
  },
  pingService: function() {
    $.get('https://pichifood.herokuapp.com/getFoodByLocation/-58.44537639999999/-34.5496618',
          function(data){console.log(data);});
  }
};

(function () {
  "use strict";
  Main.init();
})();
