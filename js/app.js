'use strict';

let $animalsTemplate = $('.animalsTemplate');
let $horns = $('.animals');

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
  $newUrl.find('img').attr('src', this.src);
  // $newUrl.text("test");
  $animalsTemplate.append($newUrl);  
};

const populateDropdown = () => {
  const keywordArray = [];
  console.log(keywordArray);
  imgArr.forEach((animal) => {
    if (keywordArray.includes(animal.keyword) === false) {
      keywordArray.push(animal.keyword);
    }
  });
// TODO: populated keyword dropdown not working??
  keywordArray.forEach((keyword) => {
    console.log(keyword);
    let defaultKeyword = document.createElement('keywordOption');
      defaultKeyword.text = keywordArray[i].keyword;


      $('#dropdown').append("<option value = " + keyword + "> +  </option>");
   
  });

};

/*
https://stackoverflow.com/questions/36469696/how-to-get-distinct-value-in-dropdown
 
var usedNames = [];  // Line 40 keywordArray
$.each(obj, function(key, value) {
    if (usedNames.indexOf(value.name) == -1) {
        $("#dropdown1").append("<option value=" + key + ">" + value.name + "</option>");
        usedNames.push(value.name);
    }
});
*/


/* TODO:  Filter by Keyword
1. User clicks on Dropdown - eventHandler?
2. User Selects .select()  unique keywords from json file  --   DONE
  a. load the drop down with the unique keyword
  b. load  " hide old /new images " when keyword is selected.

*/



// .hide() for when clicked and re-create the html.

