import React from "react";
import { render, screen } from "@testing-library/react";
import store from "../../../store/Store";
import Problems from "../../../component/problems/Problems";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';

describe("<Problems />", () => {
    it("render Problems", () => {
        const { getByText } = render(
        <Provider store={store}>
            <Problems />
        </Provider>
        );
        const headerTitle = getByText("학습지 상세 편집");
        expect(headerTitle).toBeInTheDocument();
    });
});