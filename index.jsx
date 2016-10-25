import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './app/App.jsx';

injectTapEventPlugin();

ReactDom.render((<App />), document.getElementById('react-app'));
