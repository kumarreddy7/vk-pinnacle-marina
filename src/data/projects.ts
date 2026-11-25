export type ProjectStatus = 'Ongoing' | 'Completed' | 'New Launch';
export type ProjectCategory =
  | 'Residential Plots'
  | 'Villas / Homes'
  | 'Commercial Properties';

export interface Project {
  id: string;
  slug: string;
  name: string;
  lpNumber?: string;
  location: string;
  corridor: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  heroImage: string;
  gallery: string[];
  videoUrl?: string;
  videoPoster?: string;
  shortDescription: string;
  overview: string;
  suitableFor: string;
  totalArea: string;
  unitOptions: string;
  facingOptions: string;
  approvalStatus: string;
  priceIndicator: string;
  amenities: string[];
  locationAdvantages: { landmark: string; distance: string }[];
  mapUrl: string;
  embedMapUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'marina-by-vk-pinnacle',
    slug: 'marina-by-vk-pinnacle',
    name: 'MARINA – Premium MUDA Approved Layout',
    lpNumber: 'LP NO: 1101_0009_LP_MTM_2026',
    location: '600m from 12-Lane Port Highway, Machilipatnam (16.203896, 81.179123)',
    corridor: 'Machilipatnam Port Growth Corridor',
    category: 'Residential Plots',
    status: 'Ongoing',
    featured: true,
    heroImage: './images/video-2-poster.jpg',
    gallery: [
      './images/video-2-poster.jpg',
      './images/video-1-poster.jpg',
      './images/project-plots.jpg',
      './images/site-progress.jpg',
      './images/hero-township.jpg',
    ],
    videoUrl: './videos/site-tour-2.mp4',
    videoPoster: './images/video-2-poster.jpg',
    shortDescription:
      'Premium MUDA Approved Residential & Commercial Layout (57 Plots) just 600 metres from the 12-Lane Port Highway to Machilipatnam Port. Spot registration & bank loans available.',
    overview:
      'Strategically located in one of Coastal Andhra’s fastest developing corridors, Marina by VK Pinnacle combines premium planning, seamless connectivity, and exceptional investment potential. With the upcoming Machilipatnam Port expansion and world-class infrastructure, Marina offers 47 residential plots (Plots 11–57) and 10 commercial plots (Plots 1–10) with dedicated open space park, 40 ft & 30 ft BT roads, and 6 ft walking tracks on both sides of every road.',
    suitableFor: 'Homebuilders, Port Corridor Investors & NRI Buyers',
    totalArea: '57 Plots (47 Residential + 10 Commercial + Park)',
    unitOptions: 'Residential Plots (11–57) & Commercial Plots (1–10)',
    facingOptions: 'East, West, North & Corner Plots (Vaastu Planned)',
    approvalStatus: 'MUDA Approved • LP NO: 1101_0009_LP_MTM_2026',
    priceIndicator: 'Spot Registration & Bank Loans Available from Leading Banks',
    amenities: [
      'Grand Entrance Arch & 24x7 CCTV Surveillance',
      '40 ft (12.00 M) Main BT Road + 6 ft Walking Tracks (52 ft ROW)',
      '30 ft (9.00 M) Internal BT Roads + 6 ft Walking Tracks (42 ft ROW)',
      'Underground Drainage & Tap Connection till Every Plot',
      'Overhead Water Tank & Solar LED Street Lights',
      'Secured Compound Wall All Around the Layout',
      'Beautifully Landscaped Parks & Open Green Spaces',
      'Outdoor Gym, Fitness Zone & Kids Play Area',
    ],
    locationAdvantages: [
      { landmark: '12-Lane Port Highway', distance: '600 Metres' },
      { landmark: 'Engineering College', distance: '1 KM | 2 Min' },
      { landmark: 'Machilipatnam Port', distance: '2 KM | 3 Min' },
      { landmark: 'Medical College', distance: '3 KM | 5 Min' },
      { landmark: 'Machilipatnam Town', distance: '18 KM' },
      { landmark: 'Gudivada', distance: '40 KM | 45 Min' },
      { landmark: 'Gannavaram Airport', distance: '65 KM | 60 Min' },
      { landmark: 'Vijayawada', distance: '70 KM | 65 Min' },
    ],
    mapUrl: 'https://maps.google.com/?q=16.203896,81.179123',
    embedMapUrl:
      'https://www.google.com/maps?q=16.203896,81.179123&z=15&output=embed',
  },
  {
    id: 'marina-commercial-frontage',
    slug: 'marina-commercial-frontage',
    name: 'MARINA – Commercial Frontage Plots (1–10)',
    lpNumber: 'LP NO: 1101_0009_LP_MTM_2026',
    location: '12-Lane Port Highway Approach, Machilipatnam',
    corridor: 'NH-216 & Port Highway Frontage',
    category: 'Commercial Properties',
    status: 'Ongoing',
    featured: true,
    heroImage: './images/project-commercial.jpg',
    gallery: [
      './images/project-commercial.jpg',
      './images/video-1-poster.jpg',
      './images/site-progress.jpg',
    ],
    videoUrl: './videos/site-tour-1.mp4',
    videoPoster: './images/video-1-poster.jpg',
    shortDescription:
      'Prime commercial plots (Plots 1 to 10) facing the 12-Lane Port Highway approach, ideal for logistics offices, retail showrooms, banks, and hospitality.',
    overview:
      'Part of the MUDA-approved Marina master plan (LP NO: 1101_0009_LP_MTM_2026), Plots 1 through 10 are designated commercial plots positioned along the front belt with 30 ft & 40 ft BT road access and direct proximity to Machilipatnam Port.',
    suitableFor: 'Retail Brands, Logistics Firms, Clinics & Commercial Investors',
    totalArea: '10 Commercial Plots (Plots 1–10)',
    unitOptions: 'Highway-Facing & Corner Commercial Plots',
    facingOptions: 'Main Approach & Corner Frontage',
    approvalStatus: 'MUDA Approved • LP NO: 1101_0009_LP_MTM_2026',
    priceIndicator: 'Spot Registration & Bank Finance Available',
    amenities: [
      'Direct 40 ft & 30 ft BT Road Access',
      '600 Metres from 12-Lane Port Highway',
      'Underground Drainage & Tap Water Connection',
      'Solar Street Lights & 24x7 CCTV Surveillance',
      'Secured Compound Wall Perimeter',
    ],
    locationAdvantages: [
      { landmark: '12-Lane Port Highway', distance: '600 Metres' },
      { landmark: 'Machilipatnam Port', distance: '2 KM | 3 Min' },
      { landmark: 'Engineering College', distance: '1 KM | 2 Min' },
      { landmark: 'Medical College', distance: '3 KM | 5 Min' },
    ],
    mapUrl: 'https://maps.google.com/?q=16.203896,81.179123',
    embedMapUrl:
      'https://www.google.com/maps?q=16.203896,81.179123&z=15&output=embed',
  },
  {
    id: 'vk-pinnacle-coastal-villas',
    slug: 'vk-pinnacle-coastal-villas',
    name: 'VK Pinnacle Coastal Villas',
    location: 'Chilakalapudi Gate – Machilipatnam–Tallapalem Road',
    corridor: 'Machilipatnam Residential Belt',
    category: 'Villas / Homes',
    status: 'New Launch',
    featured: true,
    heroImage: './images/project-villas.jpg',
    gallery: [
      './images/project-villas.jpg',
      './images/project-clubhouse.jpg',
      './images/hero-township.jpg',
    ],
    shortDescription:
      'Contemporary 3 & 4 BHK independent gated villas with landscaped lawns, modern elevation, and serene coastal living near Chilakalapudi Gate.',
    overview:
      'VK Pinnacle Coastal Villas brings modern architectural design and gated community security to Machilipatnam. Each independent home features spacious living rooms, cross-ventilation, private parking, and Vaastu-compliant planning.',
    suitableFor: 'Families Seeking Ready-Design Gated Villa Living',
    totalArea: '14 Acres (Gated Villa Community)',
    unitOptions: '3 BHK & 4 BHK Independent Villas',
    facingOptions: 'East & North Facing Vaastu-Compliant Homes',
    approvalStatus: 'MUDA Compliant Gated Community',
    priceIndicator: 'Bank Loans Available – Enquire for Floor Plans',
    amenities: [
      'Resident Clubhouse & Multipurpose Hall',
      'Landscaped Central Park & Walking Track',
      'Children’s Play Area & Outdoor Fitness Zone',
      'CCTV Perimeter Surveillance & Grand Entrance',
      'Solar Street Lighting & Overhead Water Tank',
    ],
    locationAdvantages: [
      { landmark: 'Engineering College', distance: '2 Min' },
      { landmark: 'Machilipatnam Port', distance: '5 Min' },
      { landmark: 'Medical College', distance: '5 Min' },
    ],
    mapUrl: 'https://maps.google.com/?q=16.203896,81.179123',
    embedMapUrl:
      'https://www.google.com/maps?q=16.203896,81.179123&z=14&output=embed',
  },
];
