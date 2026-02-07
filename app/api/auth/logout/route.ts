import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (token) {
      await api.post('/users/signout', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    cookieStore.delete('accessToken');

    return NextResponse.json({ success: true });
  } catch {
    // Even if the server returned an error, delete the cookie
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    return NextResponse.json({ success: true });
  }
}
