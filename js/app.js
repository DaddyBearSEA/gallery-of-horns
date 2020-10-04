'use strict';

let $animalsTemplate = $('.animalsTemplate');
let $horns = $('.animals');
let keywordArray = [];
let imgArr = [];

$.ajax('./data/page-1.json', { method: 'get', datatype: 'json' })
  .then(potato => {
    potato.forEach(animalsVal => {
      new Hornsgallery(animalsVal).renderJquery();
    });

    populateDropdown();

    // numberSort();  //Sort by Number of Horns
    imgArr.forEach((typeOfAnimal) => {
      $('main').append(typeOfAnimal.createHTML());
    });
  }
  );

function Hornsgallery(src) {
  this.src = src.image_url;
  this.title = src.title;
  this.description = src.description;
  this.keyword = src.keyword;

  this.horns = src.horns;

  imgArr.push(this);
}

Hornsgallery.prototype.renderJquery = function () {
  let $newUrl = $horns.clone();
  $newUrl.attr('class', `${this.keyword}`);
  $newUrl.find('h2').text(this.title);
  $newUrl.find('img').attr('src', this.src);
  $newUrl.find('p').text(this.description);
  $animalsTemplate.append($newUrl);
};

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

// target keyword on change, change the display to 
$('select').on('change', function(){
  $('section').hide();
  $('section').each((index, element) => {
    if (this.value === $(element).attr('data-keyword')){
      $(element).show();
      console.log(element);
    }
    else if (this.value === 'default'){
      console.log(element);
      $('section').show();
    }
  });
});

// imgArr.forEach(function(storedImages){
//   if('rhino' === storedImages.keyword){
//     const imageTitle = storedImages.title;
//     const imageListItems = $('li');
//     imageListItems.each(function(){
//       console.log(imageTitle);
//       if($(this).find('h2').text() === imageTitle){
//         $(this).show();
//         console.log($(this), 'i found it');
//       }
//     });
//   }
// });


// function sortbyKeyword(keyword) {
//   console.log('test');
//   clearElements();
//   let filteredArr = [];
//   for (let i = 0; i < imgArr.length; i++) {
//     if (imgArr[i].keyword === keyword){
//       filteredArr.push(imgArr[i]);
//     }
//   }
//   filteredArr.forEach((typeOfAnimal) => {
//     $('main').append(typeOfAnimal.createHTML());
//   });
// }


// function clearElements() {
//   $('main').empty();
// }

/* TODO:  Filter by Keyword
1. User clicks on Dropdown - eventHandler?
2. User Selects .select()  unique keywords from json file  --   DONE
  a. load the drop down with the unique keyword
  b. load  " hide old /new images " when keyword is selected.
  
*/

// create new array with selected keywords


// .hide() for when clicked and re-create the html.
