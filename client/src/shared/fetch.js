// TODO: We must set this parameter as configurable
// Now, it uses the same domain
const API_URL = '';

// Generate the URL
const apiUrl = (endpoint, team = true) => {
  // Clean the endpoint
  if (endpoint.length > 0 && endpoint.charAt(0) === '/') {
    endpoint = endpoint.substring(1);
  }
  // Return the correct endpoint
  return `${API_URL}/api/${endpoint}`;
}

// Convert the response to an Object. You can get it from body
const parseResponse = response => {
  return response.json().then(json => {
    return Promise.resolve({
      body: json,
      status: response.status,
      error: (response.status < 200 || response.status >= 300)
    })
  })
}

// Improve the JSON errors
const jsonError = error => {
  if (error.message.indexOf('JSON') > -1) {
    // Update the error to be more explicit
    error = new Error(error.message);
    error.name = 'JSONFormatError';
  }
  // Throw the error
  throw error;
}

// Default params for the request
const defaultParams = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}


// Return a powerful version of fetch! :D
export default function(endpoint, params = {}) {
  try {
    // Build the URL
    let url = apiUrl(endpoint);

    if (params.body !== undefined && typeof params.body === 'object') {
      params.body = JSON.stringify(params.body);
    }

    return window.fetch(url, Object.assign({}, defaultParams, params))
      .then(parseResponse)
      // TODO: Handle more type of errors
      .catch(jsonError)
  } catch(error) {
    // Always return a promise
    return Promise.resolve({ body: { error }, error: true });
  }
}
