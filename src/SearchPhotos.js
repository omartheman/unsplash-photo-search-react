import React, {useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import Button from 'react-bootstrap/Button';
import Masonry from 'react-masonry-css';
import LightboxItem from './Lightbox';

const unsplash = new Unsplash({
  accessKey:"1P3Oawyt_niJXYQ3WSsOs1AyKtTjDaAQw6ZpJ1kNaBE"
})

let counter = 2;
let loadMore = null;
let searched = false;
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};
let isOpen = false;
let photoIndex = 0;

export default function SearchPhotos ()

{
  console.log('fucntion rendered ')
  const [query, setQuery] = useState('');
  const [pics, setPics] = useState([]);
  const searchPhotos = async (e, multiplier) => {
    searched = true;
    console.log('multiplier', multiplier)
    e.preventDefault();
    if (multiplier !== 1) {
      counter++;
    }
    console.log('counter in searchPhotos: ', counter)
    unsplash.search
      .photos(query, 1, multiplier*20)
      .then(toJson)
      .then((json) => {
        console.log(json);
        setPics(json.results);
      });
  };
  const openLightbox = async (e) => {
    isOpen = true;
    photoIndex = Number(e.target.id);
    console.log(photoIndex)
  };
  if (searched === true) {
    loadMore = 
      <form
        onSubmit={(e) => searchPhotos(e, counter)}
        className="search-form"
      >
        <Button 
          className="search-button load-more" 
          variant="outline-secondary"
          type="submit"
        >
          Load More
        </Button>
      </form>
  }
  const images = 
    pics
  ;
  console.log('images: ',images);
  console.log('isopen in searchphotos', isOpen)
  return(
    <>
      <LightboxItem
        images={images}
        isOpen={isOpen}
        photoIndex={photoIndex}
      />
      <form
        onSubmit={(e) => searchPhotos(e, 1)}
        className="search-form"
      >
        <label></label>
        <input
          type="text"
          name="query"
          className="search-input input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
        {pics.map((pic, index) => 
            <div 
            // Make div open lightbox with id_key on click
              key={pic.id} 
            >
              <img 
                alt={pic.alt_description}
                src={pic.urls.small}
                id={index}
                onClick={(e) => {
                  openLightbox(e);
                }}
              />
            </div>
          )
        }
      </Masonry>
      {loadMore}
    </>
  )
}