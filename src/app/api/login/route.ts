import { NextRequest } from 'next/server';

/**
 * Login and set the name / title credentials as cookies.
 * @param request
 * @constructor
 */
export async function POST (request: NextRequest) {

  // TODO: Validation of the request body should be implemented to ensure the request is properly formatted.
  const { name, title } = await request.json();
  const responseBody = JSON.stringify({ name, title });
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // Set the 'name' cookie
  headers.append('Set-Cookie', `name=${encodeURIComponent(name)}; Path=/; HttpOnly; SameSite=Strict`);

  // Set the 'title' cookie
  headers.append('Set-Cookie', `title=${encodeURIComponent(title)}; Path=/; HttpOnly; SameSite=Strict`);

  return new Response(responseBody, {
    status: 200,
    headers,
  });
}
