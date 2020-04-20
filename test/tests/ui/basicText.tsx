import React from 'react';
import { mount } from 'enzyme';

test('Basic react text', () => {
 const wrapper = mount(<p>Hello Jest!</p>);
 expect(wrapper.text()).toMatch('Hello Jest!');
});