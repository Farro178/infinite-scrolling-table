import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Topbar from "./Topbar";

describe("Topbar", () => {
  it("renders link", () => {
    render(<Topbar isTableMirrored={false} setIsTableMirrored={() => {}} />);

    const link = screen.getByText("Infinity Scroll");

    expect(link).toHaveAccessibleName("Infinity Scroll");
  });

  it("toggles isTableMirrored state on button click", () => {
    let isTableMirrored = false;

    const setIsTableMirrored = () => {
      isTableMirrored = !isTableMirrored;
    };

    const { getByLabelText } = render(
      <Topbar
        isTableMirrored={isTableMirrored}
        setIsTableMirrored={setIsTableMirrored}
      />
    );

    const button = getByLabelText("Toggle mirrored table");
    fireEvent.click(button);

    expect(isTableMirrored).toBe(true);

    fireEvent.click(button);

    expect(isTableMirrored).toBe(false);
  });
});
