import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SignIn from '../../src/pages/SignIn';
import AuthForm from '../../src/components/forms/Auth';

describe('<SignIn />', () => {
  it('should render <Auth /> with correct props', (done) => {
    const wrapper = shallow(<SignIn history={{}} />);
    expect(wrapper.find(AuthForm)).to.have.length(1);
    expect(wrapper.find(AuthForm).props()).to.eql({
      history: {},
      action: 'signIn',
      nextAction: 'SignUp',
    });
    done();
  });
});
