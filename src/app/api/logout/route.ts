import { NextRequest } from 'next/server';

/**
 * Logout and flush the credentials (clear the cookies).
 * @param request
 * @param response
 * @constructor
 */
export async function POST (request: NextRequest, response: Response) {

  // Clear the authentication cookie
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // Set the 'name' cookie
  headers.append('Set-Cookie', `name=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);

  // Set the 'title' cookie
  headers.append('Set-Cookie', `title=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);

  return new Response('{}', {
    status: 200,
    headers,
  });
}
