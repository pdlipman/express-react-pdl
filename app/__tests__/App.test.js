import React from 'react';
import TestUtils from 'react-addons-test-utils';

import App from '../App.jsx';


describe('App', () => {
    test('loads properly', () => {
        const component = TestUtils.renderIntoDocument( <App /> );
        expect(TestUtils.isCompositeComponent(component)).toBeTruthy();
    });
});