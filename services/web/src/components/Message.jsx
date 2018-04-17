import React from 'react';
import PropTypes from 'prop-types';

const Message = props => (
  <p>
    {props.owner}: {props.body}
  </p>
);

Message.propTypes = {
  owner: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default Message;
