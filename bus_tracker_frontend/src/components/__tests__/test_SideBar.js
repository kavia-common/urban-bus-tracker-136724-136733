import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from "../SideBar";
import mockData from "../../data/mockData";

describe("SideBar", () => {
  const defaultProps = {
    routes: mockData.routes,
    selectedRoute: mockData.routes[0],
    onRouteSelect: jest.fn(),
    filter: "",
    onFilterChange: jest.fn(),
    visible: true,
    onClose: jest.fn()
  };

  it("renders all route names and titles from props", () => {
    render(<SideBar {...defaultProps} />);
    expect(screen.getByText(/Bus Routes/i)).toBeInTheDocument();
    mockData.routes.forEach(route =>
      expect(screen.getByText(route.route_no)).toBeInTheDocument()
    );
    expect(screen.getByPlaceholderText(/Find route/)).toBeInTheDocument();
  });

  it("matches snapshot (visible state)", () => {
    const { asFragment } = render(<SideBar {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls onClose when close button is clicked", () => {
    render(<SideBar {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/close sidebar/i));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onRouteSelect with correct route on click", () => {
    render(<SideBar {...defaultProps} />);
    const routeItem = screen.getByText(mockData.routes[1].route_no).closest('li');
    fireEvent.click(routeItem);
    expect(defaultProps.onRouteSelect).toHaveBeenCalledWith(mockData.routes[1]);
  });

  it("handles input filter and triggers callback", () => {
    render(<SideBar {...defaultProps} />);
    const input = screen.getByPlaceholderText(/Find route/);
    fireEvent.change(input, { target: { value: "55" } });
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith("55");
  });

  it("renders as invisible on mobile when visible is false", () => {
    // Only checks class includes or omits "visible"
    const { container } = render(<SideBar {...defaultProps} visible={false} />);
    const sidebar = container.querySelector(".bt-sidebar");
    expect(sidebar.className).not.toContain("visible");
  });

  it("applies aria-current to selected route", () => {
    render(<SideBar {...defaultProps} />);
    const selected = screen.getByRole('listitem', { current: 'page' });
    expect(selected).toBeInTheDocument();
    expect(selected.textContent).toContain(defaultProps.selectedRoute.route_no);
  });
});
