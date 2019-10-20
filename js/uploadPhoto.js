'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadAvatarButton = document.querySelector('input#avatar');
  var previewAvatarPhoto = document.querySelector('.ad-form-header__preview');

  var uploadAdvertPhoto = document.querySelector('input#images');
  var previewAdvertPhoto = document.querySelector('.ad-form__photo');

  var onChangePhoto = function (uploadButton, previewBlock) {
    var file = uploadButton.files[0];
    var fileName = file.name.toLowerCase();
    var imgSource = previewBlock;

    var onLoadPhoto = function () {
      if (imgSource.hasChildNodes()) {
        var preview = imgSource.querySelector('img');
        preview.src = reader.result;
      } else {
        var advertImage = document.createElement('img');
        advertImage.src = reader.result;
        advertImage.style.width = 70 + 'px';
        advertImage.style.height = 70 + 'px';
        imgSource.appendChild(advertImage);
      }
    };

    if (file) {
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
    }

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', onLoadPhoto);
      reader.readAsDataURL(file);
    }
  };

  uploadAvatarButton.addEventListener('change', onChangePhoto.bind(this, uploadAvatarButton, previewAvatarPhoto));
  uploadAdvertPhoto.addEventListener('change', onChangePhoto.bind(this, uploadAdvertPhoto, previewAdvertPhoto));

})();
