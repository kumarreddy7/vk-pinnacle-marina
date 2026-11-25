export interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  propertyType: 'Residential Plots' | 'Villas / Homes' | 'Commercial Properties';
  rating: number;
  quote: string;
  verifiedDate: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Srinivasulu & Padmavathi G.',
    role: 'Homeowners',
    project: 'VK Pinnacle Bandar Greens',
    propertyType: 'Residential Plots',
    rating: 5,
    quote:
      'From our very first site visit to plot registration, the VK Pinnacle team was completely transparent with every document. Seeing the roads and compound wall delivered as promised gave us complete confidence.',
    verifiedDate: 'October 2026',
  },
  {
    id: 'test-2',
    name: 'Dr. Karthikeya Varma',
    role: 'Medical Specialist & Investor',
    project: 'MARINA – Premium MUDA Approved Layout',
    propertyType: 'Residential Plots',
    rating: 5,
    quote:
      'What stood out for me was the clarity of layout approvals and the pace of infrastructure work on the ground. The proximity to the Machilipatnam Port growth zone makes it a strong long-term investment.',
    verifiedDate: 'November 2026',
  },
  {
    id: 'test-3',
    name: 'Prashanthi & Naveen K.',
    role: 'Villa Buyers',
    project: 'VK Pinnacle Coastal Villas',
    propertyType: 'Villas / Homes',
    rating: 5,
    quote:
      'The architectural planning and spacious layout immediately won us over. Their relationship manager patiently walked us through every structural specification and milestone.',
    verifiedDate: 'November 2026',
  },
  {
    id: 'test-4',
    name: 'Venkateswara Rao P.',
    role: 'Business Owner',
    project: 'MARINA – Commercial Frontage Plots (1–10)',
    propertyType: 'Commercial Properties',
    rating: 5,
    quote:
      'Finding a commercial space with ample customer parking and clean road frontage in Machilipatnam was a priority for our business. VK Pinnacle Commerce Hub checked every box.',
    verifiedDate: 'September 2026',
  },
  {
    id: 'test-5',
    name: 'Meenakshi Sundaram',
    role: 'NRI Homebuyer',
    project: 'VK Pinnacle Port Enclave',
    propertyType: 'Residential Plots',
    rating: 5,
    quote:
      'Even while living abroad, I received regular site progress videos and clear guidance from the VK Pinnacle team for my family’s site visit.',
    verifiedDate: 'November 2026',
  },
];
