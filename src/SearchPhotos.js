import React, {Component} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import Button from 'react-bootstrap/Button';
import Masonry from 'react-masonry-css';
import LightboxItem from './Lightbox';
import ScrollUp from './ScrollUp';
import LoadMoreButton from './LoadMoreButton';

const unsplash = new Unsplash({
  accessKey:"1P3Oawyt_niJXYQ3WSsOs1AyKtTjDaAQw6ZpJ1kNaBE"
})

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

class SearchPhotos extends Component{
  constructor(props){
    super(props);
    this.state={
      query: '',
      pics: [],
      searched: false,
      counter: 2,
      isOpen: false,
      photoIndex: 0
    }
    this.searchPhotos = this.searchPhotos.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.changeLightbox = this.changeLightbox.bind(this);
  }
  searchPhotos (e, multiplier){
    const {counter, query} = this.state;
    this.setState({searched: true});
    e.preventDefault();
    if (multiplier !== 1) {
      this.setState({counter: counter+1})
    }
    unsplash.search
      .photos(query, 1, multiplier*20)
      .then(toJson)
      .then((json) => {
        this.setState({pics: json.results});
      });
  };
  openLightbox(e){
    this.setState({
      isOpen: true, 
      photoIndex: Number(e.target.id)
    })
  };
  closeLightbox(){
    this.setState({isOpen: false})
  }
  changeLightbox(newIndex){
    this.setState({photoIndex: newIndex})
  }
  render(){
    const {images, query, pics, searched, counter, isOpen, photoIndex} = this.state;
    let loadMore = null;
    if (searched === true) {
      loadMore = <LoadMoreButton searchPhotos={this.searchPhotos} counter={counter}/>
    }
    let pictures = pics.map((pic, index) => 
      <div key={pic.id}>
        <img 
          alt={pic.alt_description}
          src={pic.urls.small}
          id={index}
          onClick={(e) => {
            this.openLightbox(e);
          }}
        />
      </div>
    );
    return(
      <>
        <LightboxItem
          images={pics}
          isOpen={isOpen}
          photoIndex={photoIndex}
          closeLightbox={this.closeLightbox}
          changeLightbox={this.changeLightbox}
        />
        <form
          onSubmit={(e) => this.searchPhotos(e, 1)}
          className="search-form"
        >
          <input
            type="text"
            name="query"
            className="search-input input"
            placeholder={`Try "dog" or "apple"`}
            value={query}
            onChange={(e) => this.setState({query: e.target.value})}
          >
          </input>
          <Button 
            className="search-button" 
            variant="outline-dark"
            type="submit"
          >
            Search
          </Button>
        </form>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {pictures}
        </Masonry>
        {loadMore}
        <ScrollUp></ScrollUp>
      </>
    )
  }
}




export default SearchPhotos;
