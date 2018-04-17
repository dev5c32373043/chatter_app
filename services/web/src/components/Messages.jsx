import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const Messages = props => (
  <div className="messages">
    {props.messages.map(message => <Message key={message._id} {...message} />)}
  </div>
);

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Messages;
