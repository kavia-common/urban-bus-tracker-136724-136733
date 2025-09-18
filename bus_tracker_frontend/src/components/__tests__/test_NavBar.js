import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";

// Dummy handler that tracks invocation
function createHandler() {
  const fn = jest.fn();
  return fn;
}

describe("NavBar", () => {
  it("renders with expected brand, logo, and language selector", () => {
    render(
      <NavBar language="en" onLanguageChange={() => {}} onSidebarToggle={() => {}} />
    );
    expect(screen.getByText(/Urban Bus Tracker/)).toBeInTheDocument();
    expect(screen.getByLabelText(/bus logo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select UI Language/)).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("matches snapshot (structure & UI)", () => {
    const { asFragment } = render(
      <NavBar language="hi" onLanguageChange={() => {}} onSidebarToggle={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("invokes onLanguageChange with new value when user switches language", () => {
    const onLanguageChange = createHandler();
    render(
      <NavBar language="en" onLanguageChange={onLanguageChange} onSidebarToggle={() => {}} />
    );
    fireEvent.change(screen.getByLabelText(/Select UI Language/), { target: { value: "kn" } });
    expect(onLanguageChange).toHaveBeenCalledWith("kn");
  });

  it("invokes onSidebarToggle when button is clicked", () => {
    const onSidebarToggle = createHandler();
    render(
      <NavBar language="en" onLanguageChange={() => {}} onSidebarToggle={onSidebarToggle} />
    );
    const btn = screen.getByRole("button", { name: /open navigation menu/i });
    fireEvent.click(btn);
    expect(onSidebarToggle).toHaveBeenCalled();
  });

  it("has correct aria-label for accessibility", () => {
    render(
      <NavBar language="en" onLanguageChange={() => {}} onSidebarToggle={() => {}} />
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", expect.stringContaining("Navbar"));
  });
});
