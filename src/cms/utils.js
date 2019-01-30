import React from 'react';
import { Linkedin } from 'styled-icons/fa-brands/Linkedin';
import { Profile } from 'styled-icons/icomoon/Profile';
// import Resizer from 'react-image-file-resizer';

const capitalize = word => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};

export const toCapitalizedWords = name => {
  var words = name.match(/[A-Za-z][a-z]*/g) || [];

  return words.map(capitalize).join(' ');
};

export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(String(email).toLowerCase());
};

export const validatePhone = phone => {
  return phone.replace(/\D/g, '').length >= 9;
};

export const toTitleCase = str => {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const resolveSocialIconByURL = (url, className) => {
  switch (true) {
    case Boolean(url.match(/^https:\/\/www.linkedin.com/i)):
      return <Linkedin className={className} />;
    default:
      return <Profile className={className} />;
  }
};

export const youtubeEmbedTransformer = urlStr => {
  return urlStr ? `https://www.youtube-nocookie.com/embed/${urlStr.split('/').pop().split('v=').pop()}` : '';
};

export const imageTransformer = (imgFile, options) => {
  const dataURLToBlob = (dataURL) => {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      const parts = dataURL.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = parts[1];

      return new Blob([raw], { type: contentType });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  return new Promise(resolve => {
    // Load the image
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = (imageEvent) => {
        // Resize the image
        const canvas = document.createElement('canvas');
        const maxSize = options.maxSize;
        let width = image.width;
        let height = image.height;
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL(imgFile.type);
        const resizedImage = dataURLToBlob(dataUrl);
        resolve(new File([resizedImage], imgFile.name, {
          type: imgFile.type,
        }));
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(imgFile);
  });
};
