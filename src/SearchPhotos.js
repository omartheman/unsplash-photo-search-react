import React, {useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import Button from 'react-bootstrap/Button';

const unsplash = new Unsplash({
  accessKey:"1P3Oawyt_niJXYQ3WSsOs1AyKtTjDaAQw6ZpJ1kNaBE"
})

export default function SearchPhotos(){
  const [query, setQuery] = useState('');
  const [pics, setPics] = useState([]);
  const searchPhotos = async (e) => {
    e.preventDefault();
    unsplash.search
      .photos(query, 1, 20)
      .then(toJson)
      .then((json) => {
        console.log(json);
        setPics(json.results);
      });
  };
  console.log(query)
  return(
    <>
      <form
        onSubmit={searchPhotos}
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
      <Button className="load-more" variant="outline-success">Load More Results</Button>
    </>
  )
}