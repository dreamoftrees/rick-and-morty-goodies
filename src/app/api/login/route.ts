import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Login and set the name / title credentials as cookies.
 * @param request
 * @constructor
 */
export async function POST (request: NextRequest) {

  // TODO: Validation of the request body should be implemented to ensure the request is properly formatted.
  // Scheme validation via a library like Zod would be ideal.
  const { name, title } = await request.json();
  const responseBody = JSON.stringify({ name, title });

  // Store credentials in stateless (browser cookies) as quick option for now.
  // Ideally this would be stored in a secure, stateful session store (Redis / Memcached / etc).
  // A Session ID encrypted JWT token would be a good option to store as a cookie.
  cookies().set('name', name, { path: '/', httpOnly: true, sameSite: 'strict' });
  cookies().set('title', title, { path: '/', httpOnly: true, sameSite: 'strict' });

  return new Response(responseBody, {
    status: 200,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}
