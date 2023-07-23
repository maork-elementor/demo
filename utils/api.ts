/**
 * Fetches data from an API using the fetch function.
 *
 * @param {string} url - The URL of the API endpoint to fetch data from.
 * @param {Object} [options] - (Optional) An object containing various options to configure the HTTP request.
 * @returns {Promise<any>} - A Promise that resolves to the parsed JSON response data from the API.
 * @throws {Error} - An error is thrown if the request fails or the response is not OK.
 */

async function fetchData (url: string, options?: any): Promise<any> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`)
  }
}

export { 
  fetchData 
}