import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Problems from '../../../component/problems/Problems';
import { Provider } from 'react-redux';
import store from '../../../store/Store';

export default {
    title: 'Component/Problems',
    component: Problems
} as ComponentMeta<typeof Problems>;

const Template: ComponentStory<typeof Problems> = () => {
    return (
        <Provider store={store}>
            <Problems />
        </Provider>
    );
}

export const ProblemPage = Template.bind({});

