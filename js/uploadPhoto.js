'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadAvatarButton = document.querySelector('input#avatar');
  var previewAvatarPhoto = document.querySelector('.ad-form-header__preview');

  var uploadAdvertPhoto = document.querySelector('input#images');
  var previewAdvertPhoto = document.querySelector('.ad-form__photo');

  var imgUploadMap = {
    'avatar': previewAvatarPhoto,
    'images': previewAdvertPhoto
  };

  var onChangePhoto = function (evt) {
    var uploadButton = evt.target;
    var imgSource = imgUploadMap[evt.target.id];
    var files = Array.from(uploadButton.files);
    var fileNames;
    files.forEach(function (item) {
      fileNames = item.name.toLowerCase();
    });

    var onLoadPhoto = function () {
      if (imgSource === previewAvatarPhoto) {
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

    if (files) {
      var matches = FILE_TYPES.some(function (it) {
        return fileNames.endsWith(it);
      });
    }

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', onLoadPhoto);
      files.forEach(function (item) {
        reader.readAsDataURL(item);
      });
    }
  };

  uploadAvatarButton.addEventListener('change', onChangePhoto);
  uploadAdvertPhoto.addEventListener('change', onChangePhoto);

})();
