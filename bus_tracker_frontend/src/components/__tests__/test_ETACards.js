import React from "react";
import { render, screen } from "@testing-library/react";
import ETACards from "../ETACards";
import mockData from "../../data/mockData";

describe("ETACards", () => {
  const defaultProps = {
    buses: mockData.buses,
    stops: mockData.routes[0].stops,
    route: mockData.routes[0],
    language: "en",
  };

  it("renders ETA card(s) for buses matching the route", () => {
    render(<ETACards {...defaultProps} />);
    // There should be an ETA card for each bus on the selected route
    expect(screen.getAllByText(/ETA to/i).length).toBe(1);
    expect(screen.getByText(/Central Park/)).toBeInTheDocument();
    expect(screen.getByText(/7 min/)).toBeInTheDocument();
    expect(screen.getByText(/KA01 AB123/)).toBeInTheDocument();
  });

  it("renders correct message when there are no buses for the selected route", () => {
    render(
      <ETACards
        {...defaultProps}
        buses={[]} // empty bus list
      />
    );
    expect(screen.getByText(/No active buses/i)).toBeInTheDocument();
  });

  it("matches snapshot (single active bus, English)", () => {
    const { asFragment } = render(<ETACards {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows Hindi text if language=hi", () => {
    const props = { ...defaultProps, language: "hi", buses: [] };
    render(<ETACards {...props} />);
    expect(
      screen.getByText("कोई बस उपलब्ध नहीं")
    ).toBeInTheDocument();
  });

  it("renders ETA time and label with correct CSS class", () => {
    render(<ETACards {...defaultProps} />);
    const etaLabel = screen.getByText(/ETA to/).closest(".bt-eta-card");
    expect(etaLabel).toHaveClass("bt-eta-card");
  });
});
