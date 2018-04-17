import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not_found_container">
    <div className="c">
      <div className="_error_code">404</div>
      <hr />
      <div className="_1">THE PAGE</div>
      <div className="_2">WAS NOT FOUND</div>
      <Link className="back-button" to="/">
        COME BACK HOME
      </Link>
    </div>
  </div>
);

export default NotFound;
