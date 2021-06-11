import React from 'react';
import { Provider } from 'react-redux';
import { Story, Meta } from '@storybook/react';
import Problems from '../component/problems/Problems';
import store from '../store/Store';

interface IProps {
    state?: any;
};

export default {
    title: 'problems/Problems',
    component: Problems
} as Meta;

/* const Template: Story<IProps> = (args) => <Problems {...args} />; */
const Template: Story<IProps> = () => <Problems />;

export const ProblemsTest = Template.bind({});
/* Loading.args = {

}; */