const axios = require('axios');

exports.handler = async function(event, context) {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Extract the code from the request body
  try {
    const { code } = JSON.parse(event.body);
    
    if (!code) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No code provided' }) };
    }
    
    // Exchange the code for an access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }, {
      headers: {
        Accept: 'application/json'
      }
    });
    
    // Return the response from GitHub
    return {
      statusCode: 200,
      body: JSON.stringify(tokenResponse.data)
    };
  } catch (error) {
    console.error('Error in GitHub auth function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error exchanging code for token',
        details: error.message 
      })
    };
  }
};