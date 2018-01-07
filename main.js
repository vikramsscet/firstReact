import React from 'react';
import {render as re, unmountComponentAtNode as unmount} from 'react-dom';
import App from './jsFiles/App';

re(<App />, document.getElementById('app'));

setTimeout(() => {
 unmount(document.getElementById('app'));}, 500000);