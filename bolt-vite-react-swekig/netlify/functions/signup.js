exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, password } = JSON.parse(event.body);

    // Here you would typically save the user to your database
    // For this example, we'll just log the information and return a success message
    console.log('New user signup:', { name, email });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User registered successfully' })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};