import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Messages from '../../src/components/Messages';
import Message from '../../src/components/Message';

describe('<Messages />', () => {
  it('should render <Message /> with correct props', (done) => {
    const messages = [{ _id: 1, owner: 'someman', body: 'test' }];
    const wrapper = shallow(<Messages messages={messages} />);
    expect(wrapper.find(Message)).to.have.length(1);
    const messageProps = wrapper.find(Message).props();
    expect(messageProps.owner).to.eql('someman');
    expect(messageProps.body).to.eql('test');
    done();
  });
});
