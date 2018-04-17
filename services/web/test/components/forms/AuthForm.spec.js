import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import AuthForm from '../../../src/components/forms/Auth';
import AuthService from '../../../src/services/Auth';
import Toast from '../../../src/components/Toast';

describe('<AuthForm />', () => {
  it('should render <form />', (done) => {
    const wrapper = shallow(<AuthForm action="signIn" nextAction="SignUp" history={{}} />);
    expect(wrapper.find('form')).to.have.length(1);
    done();
  });

  it('should handle input and clear error onChange', (done) => {
    const spy = sinon.spy(AuthForm.prototype, 'onChange');
    const wrapper = shallow(<AuthForm action="signIn" nextAction="SignUp" history={{}} />).setState({ errors: { nickname: 'some error' } });
    wrapper
      .find('input#nickname')
      .simulate('change', { target: { name: 'nickname', value: 'someman' } });
    expect(spy).have.been.calledOnce;
    expect(wrapper.state('nickname')).to.eql('someman');
    expect(wrapper.state('errors').nickname).to.be.a('undefined');
    done();
  });

  it('should render error if any validation not pass', (done) => {
    const wrapper = shallow(<AuthForm action="signIn" nextAction="SignUp" history={{}} />).setState({ nickname: 'someman', password: '' });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    setImmediate(() => {
      wrapper.update();
      const passwordLabel = wrapper.find('input#password').closest('label');
      expect(passwordLabel).to.have.lengthOf(1);
      done();
    });
  });

  it('should render notification when authService reject', (done) => {
    const stub = sinon
      .stub(AuthService.prototype, 'signIn')
      .callsFake(() => new Promise((resolve, reject) => reject({ notification: 'some error' })));
    const wrapper = shallow(<AuthForm action="signIn" nextAction="SignUp" history={{}} />).setState({ nickname: 'someman', password: 'password' });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    setImmediate(() => {
      wrapper.update();
      const toast = wrapper.find(Toast);
      expect(toast).to.have.lengthOf(1);
      expect(toast.props().content).to.eql('some error');
      stub.restore();
      done();
    });
  });

  it('should hide notification after 5 seconds', (done) => {
    const stub = sinon
      .stub(AuthService.prototype, 'signIn')
      .callsFake(() => new Promise((resolve, reject) => reject({ notification: 'some error' })));
    const clock = sinon.useFakeTimers();
    const wrapper = shallow(<AuthForm action="signIn" nextAction="SignUp" history={{}} />).setState({ nickname: 'someman', password: 'password' });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    clock.tick(5000);
    wrapper.update();
    const toast = wrapper.find(Toast);
    expect(toast).to.have.lengthOf(0);
    stub.restore();
    clock.restore();
    done();
  });

  it('should call moveToChat when authService resolve', (done) => {
    const spy = sinon.spy(AuthForm.prototype, 'moveToChat');
    const stub = sinon
      .stub(AuthService.prototype, 'signIn')
      .callsFake(() => new Promise(resolve => resolve()));
    const wrapper = shallow(<AuthForm action="signIn" nextAction="SignUp" history={{}} />).setState({ nickname: 'someman', password: 'password' });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    setImmediate(() => {
      expect(spy).to.have.been.calledOnce;
      spy.restore();
      stub.restore();
      done();
    });
  });
});
