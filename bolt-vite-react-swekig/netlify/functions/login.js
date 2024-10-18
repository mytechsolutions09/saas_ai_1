exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    // Here you would typically validate the user against your database
    // For this example, we'll just check if the email contains 'test'
    if (email.includes('test') && password === 'password') {
      return {
        statusCode: 200,
        body: JSON.stringify({ name: 'Test User', email: email })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};