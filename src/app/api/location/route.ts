import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  try {
    // Mock location data based on coordinates
    // In a real implementation, you'd use a geocoding service
    const mockLocationData = {
      city: 'Charlotte',
      state: 'NC',
      timezone: 'America/New_York',
      coordinates: [parseFloat(lat), parseFloat(lon)]
    };

    // Determine location based on rough coordinates
    if (parseFloat(lat) > 35.0 && parseFloat(lat) < 36.0) {
      if (parseFloat(lon) > -81.0 && parseFloat(lon) < -80.0) {
        mockLocationData.city = 'Charlotte';
      } else if (parseFloat(lon) > -79.0 && parseFloat(lon) < -78.0) {
        mockLocationData.city = 'Raleigh';
      } else if (parseFloat(lon) > -79.5 && parseFloat(lon) < -78.5) {
        mockLocationData.city = 'Durham';
      }
    } else if (parseFloat(lat) > 28.0 && parseFloat(lat) < 29.0) {
      mockLocationData.city = 'Orlando';
      mockLocationData.state = 'FL';
    }

    return NextResponse.json(mockLocationData);
  } catch (error) {
    console.error('Location API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location data' },
      { status: 500 }
    );
  }
}