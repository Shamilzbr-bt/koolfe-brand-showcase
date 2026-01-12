import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

// Mock resize observer which is not available in jsdom
beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

test("renders hero section", () => {
    render(<App />);
    const heroText = screen.getByText(/Pure Tradition/i);
    expect(heroText).toBeInTheDocument();
});
