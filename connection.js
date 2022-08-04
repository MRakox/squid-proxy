import fetch from 'node-fetch';
import ora from 'ora';
import start from './proxy.js';

/**
 * Connect the proxy to the main server
 */
export async function connect() {
  // Inform the user that the application is connecting to the server
  const spinner = ora('Connecting the application to the API server').start();
  try {
    // Prepare the request payload
    const payload = {
      proxy: await start(),
      username: process.env.MINECRAFT_USERNAME,
    };

    // Send the request
    const response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json());

    // Handle the response
    if (response.error) throw response.error;
    return spinner.succeed(`Successfully connected to the API server (uid=${response.ip})`) && response;
  } catch (error) {
    // Inform the user that an error occured & exit the application
    spinner.fail('An error occured while connecting to the API server');
    console.error(error);
    process.exit(1);
  }
}

export function disconnect() {}
