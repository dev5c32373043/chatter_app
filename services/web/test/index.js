import chai from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

chai.use(require('sinon-chai'));

configure({ adapter: new Adapter() });
