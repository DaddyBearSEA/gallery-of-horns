'use strict';

let $animalsTemplate = $('.animalsTemplate');
let $horns = $('.animals');

let imgArr = [];

$.ajax('./data/page-1.json', { method: 'get', datatype: 'json' })
  .then(potato => {
    potato.forEach(animalsVal => {
      new Hornsgallery(animalsVal).renderJquery();
    });
  });

function Hornsgallery(src) {
  this.src = src.image_url;
  this.title = src.title;
  this.description = src.description;
  this.keyword = src.keyword;
  this.hoyrns = src.horns;
  imgArr.push(this);
}

Hornsgallery.prototype.renderJquery = function () {
  let $newUrl = $horns.clone();
  $newUrl.find('img').attr('src', this.src);
  // $newUrl.text('test');
  $animalsTemplate.append($newUrl);
};
