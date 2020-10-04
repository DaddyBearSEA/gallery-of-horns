'use strict';
//global array each animal pushed into
let animalArray = [];

// -------------------------------AJAX Calls----------------------------//
$.ajax('data/page-1.json', { method: 'GET', datatype: 'JSON' })
  .then(data => {
    data.forEach(animalObject => {
      let newHornAnimal = new Animal(animalObject);
      newHornAnimal.list();
      newHornAnimal.class = 'pageOne';
    })
  });

$.ajax('data/page-2.json', { method: 'GET', datatype: 'JSON' })
  .then(data => {
    data.forEach(animalObject => {
      let newHornAnimal = new Animal(animalObject);
      newHornAnimal.list();
      newHornAnimal.class = 'pageTwo';
    })
    sortByTitle();
    createElements();
    $('.pageTwo').hide();
  });

// ------------------------------- FUNCTIONS------------------------------//
function sortByTitle() {
  animalArray.sort(function (a, b) {
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    }
  });
  console.log('animal array', animalArray);
}

function sortByHorns() {
  animalArray.sort(function (a, b) {
    if (a.hornCount > b.hornCount) {
      return 1;
    } else if (a.hornCount < b.hornCount) {
      return -1;
    }
  });
  console.log('animal array', animalArray);
}

function createElements() {
  animalArray.forEach(obj => {
    $('main').append(obj.createHTML());
  });
}
function clearElements() {
  $('main').empty();
}

//-----------------------------CONSTRUCTOR-----------------------------//
// constructor function builds animal obnject
function Animal(object) {
  this.name = object.keyword;
  this.image = object.image_url;
  this.description = object.description;
  this.hornCount = object.horns;
  this.title = object.title;

  animalArray.push(this);
}

Animal.prototype.list = function () {
  //Remove duplicate images
  //https://stackoverflow.com/questions/2822962/jquery-remove-duplicate-elements
  //Collaborated with Tia and David
  let seen = {};

  const $options = $(`<option value="${this.name}">${this.name.toUpperCase()}</option>`);

  $('select').append($options);

  $('option').each(function () {
    let txt = $(this).text().toLocaleUpperCase();
    if (seen[txt]) {
      $(this).remove();
    }
    else
      seen[txt] = true;
  });
};

Animal.prototype.createHTML = function () {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
};

//---------------------------EVENT LISTENERS---------------------------//
$('#buttonTitle').on('click', () => {
  clearElements();
  sortByTitle();
  createElements();
});

$('#buttonHorns').on('click', () => {
  clearElements();
  sortByHorns();
  createElements();
});

$('#button1').on('click', function () {
  $('.pageOne').show();
  $('.pageTwo').hide();
});

$('#button2').on('click', function () {
  $('.pageTwo').show();
  $('.pageOne').hide();
});

$('select').on('change', function () {
  $('section').hide();
  $('section').each((index, element) => {
    if (this.value === $(element).attr('data-keyword')) {
      $(element).show();
    }
    else if (this.value === 'default') {
      $('section').show();
    }
  });
});
