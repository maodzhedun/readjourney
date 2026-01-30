import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/services/api';
import { isAxiosError } from 'axios';

async function proxyRequest(
  req: NextRequest,
  params: { path: string[] },
  method: 'GET' | 'POST' | 'DELETE'
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const path = `/books/${params.path.join('/')}`;
    const url = new URL(req.url);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: Object.fromEntries(url.searchParams),
    };

    let response;
    if (method === 'GET') {
      response = await api.get(path, config);
    } else if (method === 'POST') {
      const body = await req.json().catch(() => ({}));
      response = await api.post(path, body, config);
    } else {
      response = await api.delete(path, config);
    }

    return NextResponse.json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Request failed' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, await params, 'GET');
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, await params, 'POST');
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, await params, 'DELETE');
}
