import { ChartConfig } from '@/components/ui/chart';
import dashboard from '../../../public/assets/sidebar-icons/dashboard.svg';
import order from '../../../public/assets/sidebar-icons/order.svg';
import orderDetails from '../../../public/assets/sidebar-icons/order-details.svg';
import customer from '../../../public/assets/sidebar-icons/customer.svg';
import analytics from '../../../public/assets/sidebar-icons/analytics.svg';
import review from '../../../public/assets/sidebar-icons/review.svg';
import task from '../../../public/assets/sidebar-icons/task.svg';
import chef from '../../../public/assets/sidebar-icons/chef.svg';
import chefReq from '../../../public/assets/sidebar-icons/chefRequest.png';

// Sidebar items
export const sidebarItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: dashboard,
  },
  {
    title: 'Order',
    url: '/order',
    icon: order,
  },
  // {
  //   title: 'Order Details',
  //   url: '/order/123',
  //   icon: orderDetails,
  // },
  {
    title: 'Chef Request',
    url: '/chef-request',
    icon: chefReq,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: analytics,
  },
  {
    title: 'Review',
    url: '/review',
    icon: review,
  },
  // {
  //   title: 'Task',
  //   url: '#',
  //   icon: task,
  // },
  {
    title: 'Chef',
    url: '/chef-document',
    icon: chef,
  },
];

export const chartData = [
  { browser: 'speakers', visitors: 300, fill: '#3F527A' },
  { browser: 'exhibitors', visitors: 200, fill: '#D96A46' },
  { browser: 'attendees', visitors: 287, fill: '#166DFB' },
  { browser: 'sessions', visitors: 173, fill: '#F3CD6B' },
];

export const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  speakers: {
    label: 'Speakers',
    color: '#3F527A',
  },
  exhibitors: {
    label: 'Exhibitors',
    color: '#D96A46',
  },
  attendees: {
    label: 'Attendees',
    color: '#166DFB',
  },
  sessions: {
    label: 'Sessions',
    color: '#F3CD6B',
  },
} satisfies ChartConfig;

export const eventData = {
  image: '/assets/images/event.png',
  title: 'Tech Innovators Summit 2024',
  description:
    'Join the world’s leading innovators, tech enthusiasts explorer and entrepreneurs at the annual Tech Innovators Summit. ',
  startDate: '25 Nov, 2024',
  endDate: '5 Dec, 2024',
  location: 'Hall A, Tech Expo Center',
};

export const analyticsData = (data: any) => [
  {
    title: 'Total Menus',
    image: '/assets/icons/menu.svg',
    value: `${data['totalMenu']}`,
    progress: 77,
  },
  {
    title: 'Total Chef',
    image: '/assets/icons/revenue.svg',
    value: ` ${data['totalChef']}`,
    progress: 25,
  },
  {
    title: 'Total Customers',
    image: '/assets/icons/customer.svg',
    value: `${data['totalCustomer']}`,
    progress: 53,
  },
  {
    title: 'Total Orders',
    image: '/assets/icons/order.svg',
    value: `${data['totalOrders']}`,
    progress: 88,
  },
];

export const attendeesList = [
  {
    id: 1,
    name: 'John Doe',
    image: '/assets/avatars/avatar-3.jpg',
    email: 'johndoe@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: '/assets/avatars/avatar-2.jpeg',
    email: 'janesmith@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    image: '/assets/avatars/avatar-4.jpeg',
    email: 'michaeljohnson@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 4,
    name: 'Emily Davis',
    image: '/assets/avatars/avatar-1.jpg',
    email: 'emilydavis@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 5,
    name: 'David Wilson',
    image: '/assets/avatars/avatar-3.jpg',
    email: 'davidwilson@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 6,
    name: 'Sarah Thompson',
    image: '/assets/avatars/avatar-5.jpeg',
    email: 'sarahthompson@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 7,
    name: 'Robert Anderson',
    image: '/assets/avatars/avatar-4.jpeg',
    email: 'robertanderson@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 8,
    name: 'Olivia Martinez',
    image: '/assets/avatars/avatar-1.jpg',
    email: 'oliviamartinez@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 9,
    name: 'William Garcia',
    image: '/assets/avatars/avatar-3.jpg',
    email: 'williamgarcia@example.com',
    phone: '+34 612 345 678',
  },
  {
    id: 10,
    name: 'Sophia Rodriguez',
    image: '/assets/avatars/avatar-5.jpeg',
    email: 'sophiarodriguez@example.com',
    phone: '+34 612 345 678',
  },
];

export const attendeesTableHeader = ['Name', 'Email', 'Phone Number'];

export const exhibitorsData = [
  {
    id: 1,
    image: '/assets/avatars/exh-1.png',
    title: 'Techno Solutions',
  },
  {
    id: 2,
    image: '/assets/avatars/exh-2.png',
    title: 'Tech Innovations',
  },
  {
    id: 3,
    image: '/assets/avatars/exh-3.png',
    title: 'Innovative Solutions',
  },
  {
    id: 4,
    image: '/assets/avatars/exh-1.png',
    title: 'Tech Innovators',
  },
  {
    id: 5,
    image: '/assets/avatars/exh-2.png',
    title: 'Tech Innovators',
  },
  {
    id: 6,
    image: '/assets/avatars/exh-3.png',
    title: 'Tech Innovators',
  },
  {
    id: 7,
    image: '/assets/avatars/exh-1.png',
    title: 'Tech Innovators',
  },
  {
    id: 8,
    image: '/assets/avatars/exh-2.png',
    title: 'Tech Innovators',
  },
  {
    id: 9,
    image: '/assets/avatars/exh-3.png',
    title: 'Tech Innovators',
  },
];

export const sessionsData = [
  {
    id: 1,
    title: 'The Future of AI in Healthcare',
    sessionDates: [
      {
        date: '18 May 2025',
        startTime: '9:00 AM',
        endTime: '10:00 AM',
      },
    ],
    location: 'Hall A, Tech Expo Center',
  },
  {
    id: 2,
    title: 'The JAVA Programming Language',
    sessionDates: [
      {
        date: '10 June 2025',
        startTime: '9:00 AM',
        endTime: '10:00 AM',
      },
      {
        date: '11 June 2025',
        startTime: '9:00 AM',
        endTime: '10:00 AM',
      },
      {
        date: '12 June 2025',
        startTime: '6:00 PM',
        endTime: '8:00 PM',
      },
    ],
    location: 'Hall B, Tech Expo Center',
  },
  {
    id: 3,
    title: 'Future of Quantum Computing',
    sessionDates: [
      {
        date: '27 July 2025',
        startTime: '8:00 AM',
        endTime: '11:00 AM',
      },
      {
        date: '30 July 2025',
        startTime: '12:00 PM',
        endTime: '3:00 PM',
      },
    ],
    location: 'Hall 2, Arts Council',
  },
  {
    id: 4,
    title: 'Coke Studio Concert',
    sessionDates: [
      {
        date: '14 August 2025',
        startTime: '7:00 PM',
        endTime: '11:00 PM',
      },
    ],
    location: 'Redbull Arena, Dubai',
  },
  {
    id: 5,
    title: 'Impact of Social Media on Society',
    sessionDates: [
      {
        date: '25 August 2025',
        startTime: '10:00 AM',
        endTime: '4:00 PM',
      },
      {
        date: '26 August 2025',
        startTime: '10:00 AM',
        endTime: '4:00 PM',
      },
    ],
    location: 'Opera House, Sydney',
  },
];

export const areaChartData = [
  { time: '08:00', revenue: 15 },
  { time: '09:00', revenue: 35 },
  { time: '10:00', revenue: 50 },
  { time: '11:00', revenue: 30 },
  { time: '12:00', revenue: 50 },
  { time: '13:00', revenue: 15 },
  { time: '14:00', revenue: 30 },
];
export const areaChartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#FFC71F',
  },
} satisfies ChartConfig;
