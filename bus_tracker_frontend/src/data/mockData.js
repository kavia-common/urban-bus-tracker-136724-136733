const mockData = {
  routes: [
    {
      id: 'R1',
      route_no: '21A',
      name: 'Main Station - City Market',
      color: '#2563EB',
      stops: [
        { id: 'S1', name: 'Main Station', lat: 12.901, lng: 77.601 },
        { id: 'S2', name: 'College Point', lat: 12.903, lng: 77.604 },
        { id: 'S3', name: 'Central Park', lat: 12.905, lng: 77.607 },
        { id: 'S4', name: 'City Market', lat: 12.908, lng: 77.612 },
      ],
    },
    {
      id: 'R2',
      route_no: '55',
      name: 'Ring Road Circular',
      color: '#F59E0B',
      stops: [
        { id: 'S5', name: 'Old Bus Stand', lat: 12.911, lng: 77.615 },
        { id: 'S6', name: 'School Circle', lat: 12.913, lng: 77.618 },
        { id: 'S7', name: 'North End', lat: 12.918, lng: 77.629 },
      ],
    }
  ],
  buses: [
    {
      id: 'B1',
      label: 'KA01 AB123',
      route: '21A',
      current_stop: 'Central Park',
      eta_minutes: 7,
      lat: 12.904,
      lng: 77.606,
      direction: 'to Market',
    },
    {
      id: 'B2',
      label: 'KA21 CB160',
      route: '55',
      current_stop: 'School Circle',
      eta_minutes: 12,
      lat: 12.9135,
      lng: 77.619,
      direction: 'Circle',
    }
  ],
  notifications: [
    {
      id: 'N1',
      type: 'info',
      message: 'Next bus on Route 21A arriving in 7 minutes at Central Park.',
    },
    {
      id: 'N2',
      type: 'alert',
      message: 'Temporary traffic delay reported near Market circle.',
    }
  ],
};

export default mockData;
