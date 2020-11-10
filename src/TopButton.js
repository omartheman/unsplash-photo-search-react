import React, { Component } from "react";
import BackToTop from "react-back-to-top-button";
import Button from 'react-bootstrap/Button';


class TopButton extends Component {
  render() {
    return (
      <BackToTop
        className="back-to-top"
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
      >
        <Button 
          variant="success">
            Back to Top
        </Button>
      </BackToTop>
    );
  }
}

export default TopButton;