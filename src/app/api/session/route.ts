import { NextRequest } from 'next/server';

/**
 * Retrieve the current user session via cookies.
 * @param request
 * @constructor
 */
export async function GET (request: NextRequest) {
  const nameToken = request.cookies.get('name');
  const titleToken = request.cookies.get('title');

  // If no existing session respond with 404
  if (!nameToken && !titleToken) {
    const errorResponse = JSON.stringify({ error: 'No session found' });
    return new Response(errorResponse, {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Respond with the session data
  const responseBody = JSON.stringify({ name: nameToken?.value, title: titleToken?.value });
  return new Response(responseBody, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
