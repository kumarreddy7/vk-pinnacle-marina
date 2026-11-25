export type GalleryCategory =
  | 'Project Photos'
  | 'Site Progress'
  | 'Launch Events'
  | 'News & Announcements';

export interface GalleryItem {
  id: string;
  title: string;
  project: string;
  category: GalleryCategory;
  date: string;
  image: string;
  caption: string;
}

export interface VideoItem {
  id: string;
  title: string;
  project: string;
  tag: string;
  src: string;
  poster: string;
  description: string;
}

export const SITE_VIDEOS: VideoItem[] = [
  {
    id: 'vid-site-layout',
    title: 'Marina Site Layout, Boundary Wall & Road Walkthrough',
    project: 'MARINA – LP NO: 1101_0009_LP_MTM_2026',
    tag: 'Live Project Progress',
    src: './videos/site-tour-2.mp4',
    poster: './images/video-2-poster.jpg',
    description:
      'Actual on-ground footage showing boundary wall construction, internal road development, and site work in progress at Marina by VK Pinnacle.',
  },
  {
    id: 'vid-port-corridor',
    title: 'Machilipatnam Port & 12-Lane Highway Growth Corridor',
    project: '600m from Marina to Port Connecting Road',
    tag: 'Aerial Port View',
    src: './videos/site-tour-1.mp4',
    poster: './images/video-1-poster.jpg',
    description:
      'Aerial view of the Machilipatnam Port development just 2 km (3 mins) from Marina, powering rapid coastal infrastructure growth.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Boundary Wall & Internal Road Development',
    project: 'MARINA – VK Pinnacle',
    category: 'Site Progress',
    date: 'November 2026',
    image: './images/video-2-poster.jpg',
    caption:
      'Live on-ground progress: secured compound wall construction, wide internal road formation, and site work in progress.',
  },
  {
    id: 'gal-2',
    title: 'Machilipatnam Port Breakwater & Growth Zone',
    project: 'MARINA – VK Pinnacle',
    category: 'Site Progress',
    date: 'November 2026',
    image: './images/video-1-poster.jpg',
    caption:
      'Machilipatnam Port development just 2 km (3 mins) away, connecting directly via the 12-Lane Port Highway 600m from the site.',
  },
  {
    id: 'gal-3',
    title: 'Grand Entrance Arch & Master-Planned Avenue',
    project: 'MARINA – VK Pinnacle',
    category: 'Project Photos',
    date: 'October 2026',
    image: './images/hero-township.jpg',
    caption:
      'Grand entrance arch welcoming residents to 40 ft & 30 ft BT roads, landscaped parks, and open green spaces.',
  },
  {
    id: 'gal-4',
    title: '40 ft Main BT Road & 6 ft Walking Tracks',
    project: 'MARINA – VK Pinnacle',
    category: 'Project Photos',
    date: 'October 2026',
    image: './images/project-plots.jpg',
    caption:
      'Durable blacktop roads with 6 ft walking tracks on both sides, solar street lights, and clear plot demarcation.',
  },
  {
    id: 'gal-5',
    title: 'Landscaped Parks & Outdoor Amenities',
    project: 'MARINA – VK Pinnacle',
    category: 'Project Photos',
    date: 'September 2026',
    image: './images/project-clubhouse.jpg',
    caption:
      'Dedicated open space park area featuring kids play area, outdoor gym & fitness zone, and walking tracks.',
  },
  {
    id: 'gal-6',
    title: 'Commercial Frontage (Plots 1–10)',
    project: 'MARINA – Commercial',
    category: 'Launch Events',
    date: 'August 2026',
    image: './images/project-commercial.jpg',
    caption:
      'High-visibility commercial plots positioned 600 metres from the 12-Lane Port Highway.',
  },
];

export const ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    date: '25 Nov 2026',
    tag: 'MUDA Approved',
    title: 'Marina Layout Approved – LP NO: 1101_0009_LP_MTM_2026',
    summary:
      'Spot registration and bank loans from all leading banks are now open for Residential Plots (11–57) and Commercial Plots (1–10).',
  },
  {
    id: 'ann-2',
    date: '15 Nov 2026',
    tag: 'Live Progress',
    title: 'Boundary Wall & Internal Road Works Progressing Rapidly',
    summary:
      'On-ground compound wall construction and 40 ft / 30 ft internal road development are actively underway at 16.203896, 81.179123.',
  },
  {
    id: 'ann-3',
    date: '01 Nov 2026',
    tag: 'Port Connectivity',
    title: 'Just 600 Metres from the 12-Lane Port Highway',
    summary:
      'Marina sits 2 km (3 mins) from Machilipatnam Port, 1 km from Engineering College, and 3 km from Medical College.',
  },
];
