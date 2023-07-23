import { fetchData } from '../api'

const Search = async (queryParams: any): Promise<any> => {
  try {
    const url = process.env.WESKI_TEST_API

    const data = await fetchData(url, {
      method: 'GET',
      query: queryParams
    })

    const expandedResults = await expendResults(queryParams)

    return {
        ...data,
        ...expandedResults
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}


// For this demo we will add this logic only if case of 2 "group_size" expend to 3-4 limit resutls by 50
const expendResults = async (queryParams: any): Promise<any> => {
    const groupSize = queryParams.group_size;
  
    if (groupSize === 2) {
      const url = process.env.WESKI_TEST_API;
      const [dataGroupSize3, dataGroupSize4] = await Promise.all([
        fetchData(url, {
          method: 'GET',
          query: {
            ...queryParams,
            group_size: 3,
          },
        }),
        fetchData(url, {
          method: 'GET',
          query: {
            ...queryParams,
            group_size: 4,
          },
        }),
      ]);
  
      return {
        ...dataGroupSize3,
        ...dataGroupSize4,
      };
    }
  };


export { Search }
