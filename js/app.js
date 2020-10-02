'use strict';

let $animalsTemplate = $('.animalsTemplate');
let $horns = $('.animals');

let imgArr = [];



function Hornsgallery(src) {
  this.src = src.image_url;
  // this.title = title;
  // this.description = description;
  // this.keyword = keyword;
  // this.horns = horns;
  imgArr.push(this);
}

Hornsgallery.prototype.renderJquery = function () {
  
  let $newUrl = $horns.clone();  
  $newUrl.find('img').attr('src', this.src);
  // $newUrl.text("test");
  $animalsTemplate.append($newUrl);  
};



//TODO: check the json as we went from 20 to 18 images.

// .hide()

$.ajax('./data/page-1.json', { method: 'get', datatype: 'json' })
  .then(potato => {
    potato.forEach(animalsVal => {
      new Hornsgallery(animalsVal).renderJquery();
      // imgArr.forEach(val => {
      //   val.renderJquery();
      // });
    });
  });
