import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProblemItem from '../../../component/problems/ProblemItem';
import { Provider } from 'react-redux';
import store from '../../../store/Store';

const simpleData = {
    "id": 144148,
    "unitCode": 31101118,
    "answerData": "",
    "problemLevel": 4,
    "problemType": "주관식",
    "problemURL": "https://s3.ap-northeast-2.amazonaws.com/mathflat/math_problems/d/9/h/1/1/01118/9_31101118_SVrl8_OBN_p.png",
    "unitName": "나머지정리",
    "needCheckLayout": 0,
    "source": 0,
    "hide": 0,
    "curriculumNumber": 9,
    "cebuCode": 0,
    "totalTimes": 32,
    "correctTimes": 12,
    "hwpExist": 1,
    "scorable": 0,
    "tagTop": null,
    "bookDataId": 0
}

export default {
    title: 'Component/ProblemItem',
    component: ProblemItem
} as ComponentMeta<typeof ProblemItem>;

const Template: ComponentStory<typeof ProblemItem> = (args) => {
    return (
        <Provider store={store}>
            <ProblemItem {...args}/>
        </Provider>
    );
}

export const ProblemItemPage = Template.bind({});
ProblemItemPage.args = {
    index: 0,
    obj: simpleData
}

