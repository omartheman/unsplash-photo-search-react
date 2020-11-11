import React from 'react';
import Button from 'react-bootstrap/button';

export default function LoadMoreButton(props) {
  const {searchPhotos, counter} = props;
  return(
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
  )
}