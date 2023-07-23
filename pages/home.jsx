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


  const Rating = (stars) => {
    stars = parseInt(stars);
    const svgs = [];
    for (let i = 0; i < stars; i++) {
      svgs.push(
        <li key={i}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='#e4a11c'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            className='mr-1 h-5 w-5 text-warning'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
            />
          </svg>
        </li>
      );
    }
    return svgs;
  };


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
                className='hotel flex flex-col md:flex-row bg-white mb-4 rounded-lg shadow-lg'
              >
                <div className='w-full md:w-1/2'>
                  <img
                    src={hotelImage}
                    alt={hotelName}
                    className='hotel-image'
                    onError={e => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/228x152'
                    }}
                  />
                </div>

                <div className='w-full md:w-1/2 p-4'>
                  <h2 className='hotel-name'>{hotelName}</h2>

                  <p>
                    <ul className='flex justify-left'>
                      {Rating(hotelRating)}
                    </ul>
                  </p>
                </div>

                <div className='w-full md:w-1/3 p-4 align-bottom hotel-price'>
                  <p className='text-right align-bottom'>{hotelPrice}</p>
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
