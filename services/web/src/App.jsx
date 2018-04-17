import React from 'react';
import ReactDOM from 'react-dom';

import withAuth from './withAuth';
import Router from './Router';

const RouterWithAuth = withAuth(Router);
const App = () => <RouterWithAuth />;

ReactDOM.render(<App />, document.getElementById('root'));
