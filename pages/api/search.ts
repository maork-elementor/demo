export default async function handler (req, res) {
  if (req.method === 'GET') {
    const activeProviders = process.env.ACTIVE_PROVIDERS.split(',').filter(
      provider => provider.trim() !== ''
    )

    try {

    // Every provider should be a module in utils/providers , this way we can load them dynamically
    // Also cupsulate the logic of every provider in a different file
    
      const providers = activeProviders.map(async providerName => {
        try {
          const providerModule = await import(
            `../../utils/providers/${providerName}`
          )
          return providerModule
        } catch (error) {
          console.error(`Error loading provider '${providerName}':`, error)
          return null 
        }
      })

      const providerModules = await Promise.all(providers)
      const searchResults = []

      for (const providerModule of providerModules) {
        const { Search } = providerModule

        // Search shold be an interface with a methods, that every provider should implement
        const providerResult = await Search(req.query)
        searchResults.push(providerResult)
      }

      return res.json(searchResults) // Return the results when all promises are resolved
    } catch (error) {
      console.error('Error while processing providers:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
