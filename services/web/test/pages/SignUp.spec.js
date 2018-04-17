import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SignUp from '../../src/pages/SignUp';
import AuthForm from '../../src/components/forms/Auth';

describe('<SignUp />', () => {
  it('should render <Auth /> with correct props', (done) => {
    const wrapper = shallow(<SignUp history={{}} />);
    expect(wrapper.find(AuthForm)).to.have.length(1);
    expect(wrapper.find(AuthForm).props()).to.eql({
      history: {},
      action: 'signUp',
      nextAction: 'SignIn',
    });
    done();
  });
});
