import React from "react";
import { render, waitFor } from "@testing-library/react";
import store from "../store/Store";
import App from "../App";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';

describe("App", () => {
    it("render App", async () => {
        await waitFor(() => {
            return (
                render(
                    <Provider store={store}>
                        <App />
                    </Provider>
                )
            )
        });
    });
});