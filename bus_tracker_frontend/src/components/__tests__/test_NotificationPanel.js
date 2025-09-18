import React from "react";
import { render, screen } from "@testing-library/react";
import NotificationPanel from "../NotificationPanel";
import mockData from "../../data/mockData";

describe("NotificationPanel", () => {
  it("renders no panel when notifications is empty", () => {
    const { container } = render(<NotificationPanel notifications={[]} />);
    expect(container.querySelector(".bt-notification-panel")).not.toBeInTheDocument();
  });

  it("renders all notifications and icons, info and alert", () => {
    render(<NotificationPanel notifications={mockData.notifications} />);
    // Info and alert messages
    expect(screen.getByText(/Next bus on Route 21A arriving/)).toBeInTheDocument();
    expect(screen.getByText(/Temporary traffic delay/)).toBeInTheDocument();
    // Icons (info and alert)
    expect(screen.getAllByRole("img", { hidden: true }).length).toBeGreaterThan(0);
  });

  it("displays alert messages with alert icon and correct styles", () => {
    render(<NotificationPanel notifications={mockData.notifications} />);
    const alertMsg = screen.getByText(/Temporary traffic delay/).closest(".bt-notification");
    expect(alertMsg).toHaveStyle("color: #b91c1c");
    // Should have warning icon for alert types
    expect(screen.getByLabelText("Warning")).toBeInTheDocument();
  });

  it("matches snapshot (info+alert shown)", () => {
    const { asFragment } = render(<NotificationPanel notifications={mockData.notifications} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("panel is aria-live polite and role=region for accessibility", () => {
    render(<NotificationPanel notifications={mockData.notifications} />);
    const panel = screen.getByRole("region");
    expect(panel).toHaveAttribute("aria-live", "polite");
  });
});
