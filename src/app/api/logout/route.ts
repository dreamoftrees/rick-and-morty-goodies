import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Logout and flush the credentials (clear the cookies).
 * @param request
 * @param response
 * @constructor
 */
export async function POST (request: NextRequest, response: Response) {

  // Clear the authentication cookie
  cookies().delete('name');
  cookies().delete('title');

  return new Response(null, {
    status: 200,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}
