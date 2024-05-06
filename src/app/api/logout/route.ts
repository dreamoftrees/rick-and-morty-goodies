import { NextRequest } from 'next/server';

/**
 * Logout and flush the credentials (clear the cookies).
 * @param request
 * @param response
 * @constructor
 */
export async function GET (request: NextRequest, response: Response) {

  // Clear the authentication cookie
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // Set the 'name' cookie
  headers.append('Set-Cookie', `name=; Path=/; HttpOnly; SameSite=Strict`);

  // Set the 'title' cookie
  headers.append('Set-Cookie', `title=; Path=/; HttpOnly; SameSite=Strict`);

  return new Response('{}', {
    status: 200,
    headers,
  });
}
