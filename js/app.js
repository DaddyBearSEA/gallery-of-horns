'use strict';

let $animalsTemplate = $('.animalsTemplate');
let $horns = $('.animals');
let keywordArray = [];
let imgArr = [];

function loadPage1() {
  $('main').empty();
  imgArr = [];
  $.ajax('./data/page-1.json', { method: 'get', datatype: 'json' })
    .then(page1 => {
      page1.forEach(animalsVal => {
        new Hornsgallery(animalsVal).createHTML();
      });

      populateDropdown();
      // hornSort();  //Sort by Number of Horns

      imgArr.forEach((typeOfAnimal) => {
        $('main').append(typeOfAnimal.createHTML());
      });
    }
    );
};

function loadPage2() {

  $('main').empty();
  imgArr = [];
  $.ajax('./data/page-2.json', { method: 'get', datatype: 'json' })
    .then(page2 => {
      page2.forEach(animalsVal => {
        new Hornsgallery(animalsVal).createHTML();
      });

      populateDropdown();
      // hornSort();  //Sort by Number of Horns

      imgArr.forEach((typeOfAnimal) => {
        $('main').append(typeOfAnimal.createHTML());
      });
    }
    );

}





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

// target keyword on change, change the display to choice
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


loadPage1();
/*  --------  Load page based on page number click ----- */
document.getElementById('button1').addEventListener('click', loadPage1);
document.getElementById('button2').addEventListener('click', loadPage2);



// ======  Setup Page 2 ============//
/* 
1. onclick eventlisterner to change to the second page
  a. eventlistner on page 2
  b. display all images from json2 
  c. sort on Keyword on page 2

2. onclick eventListner change back to page 1

3. wrap each click event with a function
  a. call page 1 function at the bottom of the page
  b - STRETCH GOAL - put a varaible into the function based on click and load.

*/
document.getElementById('button2').addEventListener('click', loadPage2);

function loadPage2() {

  $('main').empty();
  imgArr = [];
  $.ajax('./data/page-2.json', { method: 'get', datatype: 'json' })
    .then(potato => {
      potato.forEach(animalsVal => {
        new Hornsgallery(animalsVal).createHTML();
      });

      populateDropdown();
      // hornSort();  //Sort by Number of Horns

      imgArr.forEach((typeOfAnimal) => {
        $('main').append(typeOfAnimal.createHTML());
      });
    }
    );

}


// -----  Sort on number of horns -----//




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



// Hornsgallery.prototype.renderJquery = function () {
//   let $newUrl = $horns.clone();
//   $newUrl.attr('class', `${this.keyword}`);
//   $newUrl.find('h2').text(this.title);
//   $newUrl.find('img').attr('src', this.src);
//   $newUrl.find('p').text(this.description);
//   $animalsTemplate.append($newUrl);
// };
