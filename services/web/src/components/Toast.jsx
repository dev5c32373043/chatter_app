import React from 'react';
import PropTypes from 'prop-types';

const Toast = props => <div className="toast">{props.content}</div>;

Toast.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Toast;
