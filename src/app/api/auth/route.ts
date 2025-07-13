// app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  // ✅ Create a response object so we can set a cookie
  const response = NextResponse.json({
    success: true,
    user: { id: user.id, email: user.email },
  });

  // ✅ Set token in cookie
  response.cookies.set('token', 'authenticated', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
