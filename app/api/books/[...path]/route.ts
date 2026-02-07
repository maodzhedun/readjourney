//app/api/books/[...path]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api, getErrorMessage, getErrorStatus } from '@/app/api/api';

type Props = {
  params: Promise<{ path: string[] }>;
};

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function GET(request: NextRequest, { params }: Props) {
  const { path } = await params;
  const apiPath = `/books/${path.join('/')}`;

  const searchParams = request.nextUrl.searchParams;
  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get(apiPath, { params: queryParams, headers });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}

export async function POST(request: NextRequest, { params }: Props) {
  const { path } = await params;
  const apiPath = `/books/${path.join('/')}`;

  try {
    const headers = await getAuthHeaders();
    let body = null;
    try {
      body = await request.json();
    } catch {
      // Reqest witout body
    }

    const { data } = await api.post(apiPath, body, { headers });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { path } = await params;
  const apiPath = `/books/${path.join('/')}`;

  const searchParams = request.nextUrl.searchParams;
  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  try {
    const headers = await getAuthHeaders();
    const { data } = await api.delete(apiPath, {
      params: queryParams,
      headers,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}