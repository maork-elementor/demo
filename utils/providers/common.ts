const getActiveProviders = () => {
  const providers = process.env.ACTIVE_PROVIDERS.split(',')
  return providers
}

export {
    getActiveProviders
}
