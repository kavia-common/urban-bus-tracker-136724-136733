import React from "react";
import { render, screen } from "@testing-library/react";
import MapSection from "../MapSection";
import mockData from "../../data/mockData";

describe("MapSection", () => {
  const busesForRoute = mockData.buses.filter(
    (b) => b.route === mockData.routes[0].route_no
  );
  it("renders placeholder map & correct number of stop markers", () => {
    render(
      <MapSection
        buses={mockData.buses}
        stops={mockData.routes[0].stops}
        route={mockData.routes[0]}
      />
    );
    expect(screen.getByText(/Map Loading/)).toBeInTheDocument();
    expect(screen.getAllByTitle(/Main Station|College Point|Central Park|City Market/).length).toBe(
      mockData.routes[0].stops.length
    );
  });

  it("renders correct bus marker for bus on current route", () => {
    render(
      <MapSection
        buses={mockData.buses}
        stops={mockData.routes[0].stops}
        route={mockData.routes[0]}
      />
    );
    // Look for ARIA label with route's bus
    const marker = screen.getByLabelText(/Bus KA01 AB123/);
    expect(marker).toBeInTheDocument();
    expect(marker.className).toContain("bt-bus-marker");
  });

  it("renders no bus markers if no bus on selected route", () => {
    const noBus = [];
    render(
      <MapSection buses={noBus} stops={mockData.routes[0].stops} route={mockData.routes[0]} />
    );
    expect(screen.queryByLabelText(/Bus/)).not.toBeInTheDocument();
  });

  it("matches snapshot (all markers, stops and buses)", () => {
    const { asFragment } = render(
      <MapSection
        buses={mockData.buses}
        stops={mockData.routes[0].stops}
        route={mockData.routes[0]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("has accessibility roles set for section", () => {
    render(
      <MapSection
        buses={mockData.buses}
        stops={mockData.routes[0].stops}
        route={mockData.routes[0]}
      />
    );
    const section = screen.getByLabelText(/map section/i);
    expect(section).toBeInTheDocument();
  });
});
