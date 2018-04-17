import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import MessageForm from '../../../src/components/forms/Message';
import Toast from '../../../src/components/Toast';

describe('<MessageForm />', () => {
  it('should render <form />', (done) => {
    const wrapper = shallow(<MessageForm socket={{}} />);
    expect(wrapper.find('form')).to.have.length(1);
    done();
  });

  it('should handle input onChange', (done) => {
    const spy = sinon.spy(MessageForm.prototype, 'onChange');
    const wrapper = shallow(<MessageForm socket={{}} />);
    wrapper.find('input').simulate('change', { target: { value: 'some' } });
    expect(spy).have.been.calledOnce;
    expect(wrapper.state('message')).to.eql('some');
    spy.restore();
    done();
  });

  it('should show notification if message empty', (done) => {
    const wrapper = shallow(<MessageForm socket={{}} />);
    wrapper.find('form.message-form').simulate('submit', { preventDefault() {} });
    setImmediate(() => {
      wrapper.update();
      const toast = wrapper.find(Toast);
      expect(toast).to.have.lengthOf(1);
      expect(toast.props().content).to.eql('Message required!');
      done();
    });
  });

  it('should hide notification after 2 seconds', (done) => {
    const clock = sinon.useFakeTimers();
    const wrapper = shallow(<MessageForm socket={{}} />);
    wrapper.find('form.message-form').simulate('submit', { preventDefault() {} });
    clock.tick(2000);
    wrapper.update();
    const toast = wrapper.find(Toast);
    expect(toast).to.have.lengthOf(0);
    clock.restore();
    done();
  });

  it('should emit socket action onSubmit', (done) => {
    const socket = { emit(arg) {} };
    const spy = sinon.spy(socket, 'emit');
    const wrapper = shallow(<MessageForm socket={socket} />).setState({ message: 'some' });
    wrapper.find('form.message-form').simulate('submit', { preventDefault() {} });
    setImmediate(() => {
      wrapper.update();
      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith('newMessage', 'some');
      done();
    });
  });
});
