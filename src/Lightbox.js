import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
 
export default class LightboxItem extends Component {
  render() {
    const { photoIndex, images, isOpen, closeLightbox, changeLightbox } = this.props;
    return (
      <div>
        {/* We need to call this function when we click on an image */}
        {/* When you click on an img, set the state of Lightbox. */}
        <a href="https://google.com">
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex].urls.regular}
            nextSrc={images[(photoIndex + 1) % images.length].urls.regular}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].urls.regular}
            onCloseRequest={() => {closeLightbox()}}
            onMovePrevRequest={() => {
              const previousImage = (photoIndex + images.length - 1) % images.length;
              changeLightbox(previousImage)}
            }
            onMoveNextRequest={() =>{
              const previousImage = (photoIndex + 1) % images.length;
              changeLightbox(previousImage)}
            }
          />
        )}
        </a>
      </div>
    );
  }
}
