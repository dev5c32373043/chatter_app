import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Chat from '../../src/pages/Chat';
import Messages from '../../src/components/Messages';
import MessageForm from '../../src/components/forms/Message';

describe('<Chat />', () => {
  it('should render <Messages /> and <MessageForm /> correct', (done) => {
    sinon.stub(Chat.prototype, 'componentWillMount');
    const wrapper = shallow(<Chat history={{}} />).setState({ dataReceived: true });
    expect(wrapper.find(Messages)).to.have.length(1);
    expect(wrapper.find(MessageForm)).to.have.length(1);
    done();
  });
});
