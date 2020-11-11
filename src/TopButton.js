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
        <div className="btn btn-success">
            Back to Top
        </div>
      </BackToTop>
    );
  }
}

export default TopButton;