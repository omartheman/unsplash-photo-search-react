import React, {useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import Button from 'react-bootstrap/Button';
import Masonry from 'react-masonry-css';

const unsplash = new Unsplash({
  accessKey:"1P3Oawyt_niJXYQ3WSsOs1AyKtTjDaAQw6ZpJ1kNaBE"
})
let counter = 2;
let loadMore = null;
let searched = false;
export default function SearchPhotos(){
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
  
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  
  return(
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {pics.map((pic) => 
            <div key={pic.id}>
              <img 
                alt={pic.alt_description}
                src={pic.urls.small}
              />
            </div>
          )
        }
      </Masonry>
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
      <div className="pic-all-pics">
        {pics.map((pic) => 
          <div 
            key={pic.id}          
            className="pic-container"
          >
            <img 
              className="pic-img"
              alt={pic.alt_description}
              src={pic.urls.small}
            />
          </div>)
        }
      </div>
      {loadMore}
    </>
  )
}