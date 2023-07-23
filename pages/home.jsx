import React from 'react'
import { useState } from 'react'
import { fetchData } from '../utils/api'

export default function Home ({}) {
  // For demo purposes, we'll use state to store the search params
  const [searchParams, setSearchParams] = useState({
    ski_site: 1,
    from_date: '01/08/2023',
    to_date: '01/12/2025',
    group_size: 2
  })

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  const search = async () => {
    setIsLoading(true)
    const endpoint = `/api/search?${new URLSearchParams(
      searchParams
    ).toString()}`

    const res = await fetchData(endpoint)
    setResults(res[0].body.accommodations)
    setIsLoading(false)
  }

  return (
    <>
      <nav className='bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a href='#' className='flex items-center'>
            <img src={'/images/logo.svg'} />
          </a>

          <div
            className={`hidden w-full md:block md:w-auto`}
            id='navbar-multi-level'
          >
            <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <button
                  onClick={search}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                >
                  Search Demo ( NO UI )
                </button>
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='max-w-screen-xl flex flex-wrap justify-between mx-auto'>
        <div className='w-full md:w-1/2 p-4'>
          {isLoading && <p>Loading...</p>}

          {results.map((result, index) => {
            const hotelName = result.HotelName
            const hotelRating = result.HotelInfo.Rating
            const hotelImage =
              result.HotelDescriptiveContent?.Images[0]?.URL ??
              'https://via.placeholder.com/150'
            const hotelPrice = result.PricesInfo.AmountBeforeTax

            return (
              <div
                key={index}
                className='flex flex-col md:flex-row bg-white mb-4'
              >
                <div className='w-full md:w-1/2'>
                  <img
                    src={hotelImage}
                    alt={hotelName}
                    onError={e => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/228x152'
                    }}
                  />
                </div>

                <div className='w-full md:w-1/2'>
                  <h2>{hotelName}</h2>
                  <p>{hotelRating}</p>
                </div>

                <div className='w-full md:w-1/3'>
                  <p>{hotelPrice}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className='w-full md:w-1/4 p-4 '></div>
        <div className='w-full md:w-1/4 p-4 '></div>
      </div>
    </>
  )
}

export async function getServerSideProps () {
  //return Nothing ( No SSR for this demo )
  return { props: {} }
}
