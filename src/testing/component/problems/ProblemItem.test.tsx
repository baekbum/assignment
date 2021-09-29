import React from "react";
import { render, fireEvent } from "@testing-library/react";
import store from "../../../store/Store";
import ProblemItem from "../../../component/problems/ProblemItem";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';

const data = {
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

describe("Problems", () => {
    const { getByText } = render(
        <Provider store={store}>
            <ProblemItem index={1} obj={data}/>
        </Provider>
    );
    const type = getByText("주관식");
    const unitName = getByText("나머지정리");
    const simliarBtn = getByText("유사문항");
    const deleteBtn = getByText("삭제");

    it("render Problems", () => {
        expect(type).toBeInTheDocument();
        expect(unitName).toBeInTheDocument();
        expect(simliarBtn).toBeTruthy();
        expect(deleteBtn).toBeTruthy();
    });

    it("click simliarBtn", () => {
        const onClick = jest.fn();
        expect(simliarBtn).toBeTruthy();

        simliarBtn.addEventListener('click', onClick);

        expect(onClick).toHaveBeenCalledTimes(0);

        fireEvent.click(simliarBtn);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("click deleteBtn", () => {
        const onClick = jest.fn();
        expect(deleteBtn).toBeTruthy();

        deleteBtn.addEventListener('click', onClick);

        expect(onClick).toHaveBeenCalledTimes(0);

        fireEvent.click(deleteBtn);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});