import React from 'react';
import TestUtils from 'react-addons-test-utils';

import App from '../App.jsx';

describe('App', () => {
    test('loads properly', () => {
        const component = TestUtils.renderIntoDocument( <App /> );

        expect(TestUtils.isCompositeComponent(component)).toBeTruthy();
        expect(TestUtils.isCompositeComponentWithType(component, App)).toBeTruthy();
        expect(typeof component.props.title).toBe('string');
        expect(component.props.title).toBe('Express React App');

    });
});