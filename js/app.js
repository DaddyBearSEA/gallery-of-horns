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
  // this.title = title;
  // this.description = description;
  // this.keyword = keyword;
  // this.horns = horns;
  imgArr.push(this);
}

Hornsgallery.prototype.renderJquery = function () {
  let $newUrl = $animalsTemplate.clone();
  $animalsTemplate.find('img').attr('src', this.src);
  // $newUrl.text(imageurl.image_url);
  $horns.append($newUrl);

};



