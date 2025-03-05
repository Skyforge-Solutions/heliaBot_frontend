import { NextResponse } from 'next/server';

// Mock user data for profile page
const userData = {
  name: 'Emma Johnson',
  email: 'emma.johnson@example.com',
  isVerified: true,
  dob: '1992-07-15',
  preferences: {
    communicationStyle: 'Friendly',
    timeWithChildren: '5+hrs',
    gender: 'Female',
    techExpertise: 'Intermediate',
  },
  children: [
    {
      name: 'Sophia',
      age: 8,
      gender: 'Female',
      description: 'Loves drawing and reading books.',
    },
    {
      name: 'Liam',
      age: 6,
      gender: 'Male',
      description: 'Enjoys playing with toy cars and legos.',
    },
    {
      name: 'Olivia',
      age: 4,
      gender: 'Female',
      description: 'Loves animals and playing outside.',
    },
  ],
};

export async function GET() {
  // In a real application, this would fetch the user data from a database
  return NextResponse.json(userData);
}

export async function PUT(request: Request) {
  // In a real application, this would update the user data in a database
  const data = await request.json();
  
  // Mock successful update
  return NextResponse.json({ 
    ...userData, 
    ...data,
    updatedAt: new Date().toISOString() 
  });
}
