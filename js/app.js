'use strict';

let keywordArray = [];
let imgArr = [];


/* ----  Loading page 1 and page 2 JSON files by Function */

function loadPage1() {
  $('main').empty();
  $('select').empty();
  imgArr = [];
  keywordArray = [];

  $.ajax('./data/page-1.json', { method: 'get', datatype: 'json' })
    .then(page1 => {
      page1.forEach(animalsVal => {
        new Hornsgallery(animalsVal).createHTML();
      });
      populateDropdown();
      renderHTML(imgArr);
    }
    );
}

function loadPage2() {

  $('main').empty();
  $('select').empty();
  imgArr = [];
  keywordArray = [];

  $.ajax('./data/page-2.json', { method: 'get', datatype: 'json' })
    .then(page2 => {
      page2.forEach(animalsVal => {
        new Hornsgallery(animalsVal).createHTML();
      });
      populateDropdown();
      renderHTML(imgArr);
    });

}

/* constructor and Prototype to diplay pages  */

function Hornsgallery(src) {
  this.src = src.image_url;
  this.title = src.title;
  this.description = src.description;
  this.keyword = src.keyword;
  this.horns = src.horns;

  imgArr.push(this);
}

Hornsgallery.prototype.createHTML = function(){
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
};

const populateDropdown = () => {
  const $default = $('select');
  imgArr.forEach((animal) => {
    if (keywordArray.includes(animal.keyword) === false) {
      keywordArray.push(animal.keyword);
    }
  });
  keywordArray.forEach((keyword) => {
    const $newDefault = $(`<option value='${keyword}'> ${keyword} </option>`);
    $default.append($newDefault);
  });

};

/* target keyword on change, change the display to choice */

$('select').on('change', function () {
  $('section').hide();
  $('section').remove('.class');
  $('section').each((index, element) => {
    if (this.value === $(element).attr('class')) {
      $(element).show();
    }
    else if (this.value === 'default') {
      $('section').show();
    }
  });
});

/* ---- Sorting by Alpha   -----*/
function sortImages() {
  console.log('your hit sortImages');
  imgArr.sort(function (a, b) {
    let firstElement = a.title.toLowerCase();
    let secondElement = b.title.toLowerCase();
    if (firstElement < secondElement) {
      return -1;
    }
    if (firstElement > secondElement) {
      return 1;
    }
    return 0;
  });
  renderHTML(imgArr);
}

/* ---- Sorting by Number of Horns  -----*/
function sortHorns() {
  imgArr.sort(function (a, b) {
    let firstElement = a.horns
    let secondElement = b.horns
    if (firstElement < secondElement) {
      return -1;
    }
    if (firstElement > secondElement) {
      return 1;
    }
    return 0;
  });
  renderHTML(imgArr);
}

/* -----------   Render HTML function ------------ */
function renderHTML(imgArr) {
  $('main').empty(); 
  imgArr.forEach((typeOfAnimal) => {
    $('main').append(typeOfAnimal.createHTML());
  });
}

/*  -----------------  function calls and event listerner ---------*/

loadPage1();

/*  --------  Load page based on page number click ----- */
document.getElementById('button1').addEventListener('click', loadPage1);
document.getElementById('button2').addEventListener('click', loadPage2);
document.getElementById('buttonHorns').addEventListener('click', sortHorns);
document.getElementById('buttonTitle').addEventListener('click', sortImages);


/* 
 TODO:  STRETCH GOAL - put a varaible into the function based on click and load. [dry code]

*/