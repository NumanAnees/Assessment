import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Heading from "@/components/Heading";

describe("Heading component", () => {
  const mockHandleAddJob = jest.fn();

  test("renders heading with correct text", () => {
    render(
      <Heading
        main="Test Main"
        sub="Test Sub"
        handleAddJob={mockHandleAddJob}
      />
    );

    expect(screen.getByText("Test Main")).toBeInTheDocument();
    expect(screen.getByText("Test Sub")).toBeInTheDocument();
  });

  test("calls handleAddJob when button is clicked", () => {
    render(
      <Heading
        main="Test Main"
        sub="Test Sub"
        handleAddJob={mockHandleAddJob}
      />
    );

    fireEvent.click(screen.getByText("+ Add Job"));
    expect(mockHandleAddJob).toHaveBeenCalledTimes(1);
  });
});
