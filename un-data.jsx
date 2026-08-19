// un-data.jsx — Sample data for the prototype

const UN_USER = {
  name: 'Adaeze Okafor',
  firstName: 'Adaeze',
  email: 'adaeze.okafor@email.com',
  username: '@adaeze',
  avatarColor: '#7A4A1A',
  joinedAt: 'May 2024',
  organizations: ['Lagos Tech Hub'],
};

const UN_EVENTS = [
  {
    id: 'e1', title: 'Annual Community Summit 2026', date: 'Sat, Jun 14 · 10:00 AM',
    location: 'Eko Hotel, Lagos', price: 50, capacity: 320, registered: 248, free: false,
    category: 'Summit', org: 'UNNG Central',
    blurb: 'A full-day gathering of UNNG members, partners, and friends. Keynotes, workshops, and an evening reception.',
  },
  {
    id: 'e2', title: 'Lagos Welcome Mixer', date: 'Thu, May 22 · 6:30 PM',
    location: 'The Civic Centre, Victoria Island', price: 0, capacity: 80, registered: 32, free: true,
    category: 'Networking', org: 'Lagos Chapter',
    blurb: 'A relaxed evening for new and returning members in Lagos. Light refreshments provided.',
  },
  {
    id: 'e3', title: 'Mentorship Mondays — Founders', date: 'Mon, Jun 9 · 5:00 PM',
    location: 'Online · Zoom', price: 0, capacity: 200, registered: 200, free: true, soldOut: true,
    category: 'Workshop', org: 'Mentor Network',
    blurb: 'Monthly small-group session for early-stage founders. Bring one specific question.',
  },
  {
    id: 'e4', title: 'Health & Wellness Saturday', date: 'Sat, Jun 7 · 9:00 AM',
    location: 'Freedom Park, Lagos', price: 15, capacity: 150, registered: 67, free: false,
    category: 'Wellness', org: 'Wellness Collective',
    blurb: 'Light yoga, walking circles, and a community brunch. All ages welcome.',
  },
  {
    id: 'e5', title: 'Tech for Good Hackathon', date: 'Fri–Sun, Jul 18–20', past: false,
    location: 'CcHUB, Yaba', price: 25, capacity: 120, registered: 95, free: false,
    category: 'Hackathon', org: 'Tech Hub',
    blurb: 'A weekend of building public-good tools alongside other UNNG members.',
  },
  {
    id: 'e6', title: 'Member Town Hall — Q1 Update', date: 'Wed, Apr 16 · 7:00 PM',
    location: 'Online · Zoom', price: 0, capacity: 500, registered: 412, past: true, free: true,
    category: 'Town Hall', org: 'UNNG Central',
    blurb: 'A recap of Q1 activity, treasury, and upcoming plans.',
  },
];

const UN_ORGS = [
  { id: 'o1', name: 'Lagos Tech Hub', category: 'Technology', members: 1240, blurb: 'Connecting Lagos technologists with mentorship and grants.', site: 'lagostechhub.ng', email: 'hello@lagostechhub.ng', active: true },
  { id: 'o2', name: 'Wellness Collective', category: 'Health', members: 612, blurb: 'A grassroots circle promoting mental and physical wellbeing.', site: 'wellnesscollective.org', email: 'team@wellnesscollective.org', active: true },
  { id: 'o3', name: 'Founders Network', category: 'Business', members: 880, blurb: 'For early-stage founders building in and across the diaspora.', site: 'foundersnetwork.ng', email: 'connect@foundersnetwork.ng', active: true },
  { id: 'o4', name: 'Heritage Arts Council', category: 'Arts & Culture', members: 305, blurb: 'Celebrating Nigerian heritage through performance and craft.', site: 'heritageartscouncil.org', email: 'arts@heritage.ng', active: true },
  { id: 'o5', name: 'Education First', category: 'Education', members: 224, blurb: 'Funding scholarships and mentor programs for first-gen students.', site: 'educationfirst.ng', email: 'info@educationfirst.ng', active: false },
];

const UN_FORUM_CATEGORIES = [
  { id: 'f1', name: 'Announcements', topics: 12, restricted: false, blurb: 'Official UNNG updates' },
  { id: 'f2', name: 'Members Lounge', topics: 84, restricted: true, blurb: 'Open conversation for members' },
  { id: 'f3', name: 'Events Discussion', topics: 36, restricted: false, blurb: 'Talk about upcoming meetups' },
  { id: 'f4', name: 'Job Board', topics: 41, restricted: true, blurb: 'Member-only opportunities' },
  { id: 'f5', name: 'Local Chapters', topics: 22, restricted: false, blurb: 'City-by-city threads' },
  { id: 'f6', name: 'Help & Feedback', topics: 18, restricted: false, blurb: 'Ask the team anything' },
];

const UN_TOPICS = [
  { id: 't1', cat: 'Members Lounge', title: 'Anyone going to the Lagos Welcome Mixer next week?', author: 'Tunde A.', authorColor: '#0E5F4D', when: '2h', comments: 14, restricted: true, body: 'I just registered and would love to know who else is coming. Especially first-timers — drop a hello!' },
  { id: 't2', cat: 'Announcements', title: 'Q2 community grant applications now open', author: 'UNNG Team', authorColor: '#1B3A6B', when: '1d', comments: 8, restricted: false, pinned: true, body: 'Applications for the Q2 community grant cycle are now open. Funded organizations will receive support for events, programs, and operations through July.' },
  { id: 't3', cat: 'Events Discussion', title: 'Speaker suggestions for the summit?', author: 'Ngozi E.', authorColor: '#7A4A1A', when: '5h', comments: 22, restricted: false, body: 'We are finalizing the speaker list for the Annual Community Summit. Drop your dream guests below!' },
  { id: 't4', cat: 'Job Board', title: 'Senior Designer · Hybrid Lagos · Up to ₦9M', author: 'Bolaji R.', authorColor: '#274932', when: '3h', comments: 4, restricted: true, body: 'Our team is hiring a senior product designer with strong systems thinking. Hybrid Lagos with two days remote.' },
  { id: 't5', cat: 'Help & Feedback', title: 'Cannot update my profile photo on iOS', author: 'Deleted User', authorColor: '#5D6B66', when: '6h', comments: 3, restricted: false, deleted: true, body: 'This post was made by a user who has since left UNNG. Replies remain for context.' },
  { id: 't6', cat: 'Members Lounge', title: 'Reading list — what are you carrying into Q3?', author: 'Adaeze O.', authorColor: '#7A4A1A', when: '1d', comments: 11, restricted: true, body: 'I am rereading some old favorites. Share what is on your bedside table.' },
];

const UN_NOTIFICATIONS = [
  { id: 'n1', kind: 'comment', read: false, title: 'Tunde A. replied to your topic', body: '“I will be there — happy to do an intro round.”', when: '12m', avatar: 'Tunde A.' },
  { id: 'n2', kind: 'payment_success', read: false, title: 'Subscription renewed', body: 'Hero Subscription · $10.00', when: '2h', avatar: '$' },
  { id: 'n3', kind: 'event_reminder', read: false, title: 'Event tomorrow: Lagos Welcome Mixer', body: 'Thursday, 6:30 PM at The Civic Centre.', when: '4h', avatar: 'Mx' },
  { id: 'n4', kind: 'reply', read: true, title: 'Bolaji R. mentioned you in Job Board', body: '“Could be a great fit — @adaeze”', when: '1d', avatar: 'Bolaji R.' },
  { id: 'n5', kind: 'payment_failed', read: true, title: 'Payment was not completed', body: 'You were not charged. Try again or use another method.', when: '2d', avatar: '!' },
  { id: 'n6', kind: 'comment', read: true, title: 'New comment on a topic you follow', body: 'Ngozi E.: “Adding Yemi K. to the suggestions.”', when: '3d', avatar: 'Ngozi E.' },
];

const UN_TRANSACTIONS = [
  { id: 'tx1', type: 'subscription', label: 'Hero Subscription · Monthly', amount: 10, status: 'successful', date: 'May 4, 2026', method: 'Revolut Pay · •• 4421', ref: 'REV-9F8A1B' },
  { id: 'tx2', type: 'event', label: 'Lagos Welcome Mixer', amount: 0, status: 'successful', date: 'May 1, 2026', method: 'No payment required', ref: 'EVT-2231' },
  { id: 'tx3', type: 'donation', label: 'One-time donation', amount: 25, status: 'successful', date: 'Apr 22, 2026', method: 'Revolut Pay · •• 4421', ref: 'REV-7C2918' },
  { id: 'tx4', type: 'event', label: 'Health & Wellness Saturday', amount: 15, status: 'pending', date: 'Apr 18, 2026', method: 'Revolut Pay · •• 4421', ref: 'REV-4DAC0E' },
  { id: 'tx5', type: 'subscription', label: 'Hero Subscription · Monthly', amount: 10, status: 'successful', date: 'Apr 4, 2026', method: 'Revolut Pay · •• 4421', ref: 'REV-2BF902' },
  { id: 'tx6', type: 'donation', label: 'One-time donation', amount: 100, status: 'failed', date: 'Mar 28, 2026', method: 'Revolut Pay · •• 4421', ref: 'REV-91A7C2' },
  { id: 'tx7', type: 'event', label: 'Founders Roundtable', amount: 35, status: 'refunded', date: 'Feb 14, 2026', method: 'Revolut Pay · •• 4421', ref: 'REV-08CC11' },
  { id: 'tx8', type: 'subscription', label: 'Hero Subscription · Monthly', amount: 10, status: 'cancelled', date: 'Feb 4, 2026', method: 'Revolut Pay · •• 4421', ref: 'REV-7AA221' },
];

Object.assign(window, {
  UN_USER, UN_EVENTS, UN_ORGS, UN_FORUM_CATEGORIES, UN_TOPICS, UN_NOTIFICATIONS, UN_TRANSACTIONS,
});
