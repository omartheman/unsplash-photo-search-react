import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
 
export default class LightboxItem extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }
 
  render() {
    const { photoIndex, isOpen } = this.state;
    const { images } = this.props;
    console.log('images from lightbox', images)
    return (
      <div>
        {/* We need to call this function when we click on an image */}
        {/* When you click on an img, set the state of Lightbox. */}
        <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button>
 
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex].urls.regular}
            nextSrc={images[(photoIndex + 1) % images.length].urls.regular}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].urls.regular}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}
