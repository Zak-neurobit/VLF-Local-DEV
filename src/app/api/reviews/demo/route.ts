import { NextResponse } from 'next/server';

// Demo data for testing when APIs are not available
const demoReviews = [
  {
    id: 'google-demo-1',
    author: 'Maria Rodriguez',
    authorImage:
      'https://images.unsplash.com/photo-1494790108755-2616b68b2d7a?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Vasquez Law Firm helped me through a very difficult immigration case. William and his team were professional, knowledgeable, and supportive throughout the entire process. I highly recommend their services!',
    date: '2024-06-15T10:30:00Z',
    source: 'google' as const,
    location: 'charlotte',
  },
  {
    id: 'google-demo-2',
    author: 'John Smith',
    authorImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: "Outstanding legal representation! After my car accident, Vasquez Law Firm fought hard for me and got me a settlement that exceeded my expectations. Their personal injury team really knows what they're doing.",
    date: '2024-06-10T14:20:00Z',
    source: 'google' as const,
    location: 'raleigh',
  },
  {
    id: 'google-demo-3',
    author: 'Carmen Gonzalez',
    authorImage:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Excelente servicio! El equipo de Vasquez Law Firm me ayudó con mi caso de compensación laboral. Son muy profesionales y hablan español, lo cual fue muy importante para mí.',
    date: '2024-06-05T09:15:00Z',
    source: 'google' as const,
    location: 'orlando',
  },
  {
    id: 'google-demo-4',
    author: 'Robert Johnson',
    authorImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Top-notch criminal defense attorneys. They handled my DWI case with expertise and got the charges reduced significantly. Very responsive and kept me informed every step of the way.',
    date: '2024-05-28T16:45:00Z',
    source: 'google' as const,
    location: 'smithfield',
  },
  {
    id: 'google-demo-5',
    author: 'Lisa Chen',
    authorImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Vasquez Law Firm helped my family with a complex family law matter. They were compassionate, understanding, and achieved a great outcome for us. Would definitely recommend to anyone needing legal help.',
    date: '2024-05-20T11:30:00Z',
    source: 'google' as const,
    location: 'charlotte',
  },
  {
    id: 'google-demo-6',
    author: 'Michael Davis',
    authorImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    text: 'Great experience with their workers compensation team. They handled my workplace injury claim professionally and kept me updated throughout the process. Very satisfied with the outcome.',
    date: '2024-05-15T13:20:00Z',
    source: 'google' as const,
    location: 'raleigh',
  },
];

const demoSummary = {
  totalReviews: demoReviews.length,
  averageRating: 4.8,
  sourceBreakdown: {
    google: 6,
  },
  ratingDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 5,
  },
};

export async function GET() {
  try {
    return NextResponse.json({
      reviews: demoReviews,
      summary: demoSummary,
      pagination: {
        page: 1,
        limit: 10,
        total: demoReviews.length,
        totalPages: 1,
      },
      serviceStatus: {
        google: false,
        anyAvailable: false,
      },
      requestedAt: new Date().toISOString(),
      demo: true,
      message:
        'This is demo data. Configure GOOGLE_PLACES_API_KEY environment variable to fetch real reviews.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate demo data' }, { status: 500 });
  }
}
