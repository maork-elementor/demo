async function fetchData(url: string, body?: any, options?: any): Promise<any> {
  try {
    const requestOptions: any = {
      ...options,
      method: options?.method || 'GET', // Default to 'GET' if method is not provided in options
    };

    if (body) {
      requestOptions.method = 'POST';
      requestOptions.headers = {
        ...requestOptions.headers,
        'Content-Type': 'application/json',
      };
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export { fetchData };