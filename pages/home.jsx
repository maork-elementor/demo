import React from 'react'
import { getData }  from '../utils/data'
import PropTypes from 'prop-types';
import Products from '../components/UI/products'

export default function Home ({ data }) {
  return (
    <div className='max-w-screen-xl flex flex-wrap justify-between mx-auto'>
      <div className='w-full md:w-1/4 p-4 bg-blue-200'></div>
      <div className='w-full md:w-1/4 p-4 bg-red-200'>
      {/* {data.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          </div>
      ))} */}
      </div>
      <div className='w-full md:w-1/4 p-4 bg-blue-200'>
        <Products />
      </div>
      <div className='w-full md:w-1/4 p-4 bg-red-200'>
        
      </div>
    </div>
  )
}

export async function getServerSideProps () {
  const data = await getData()

  return { props: { data } }
}

Home.propTypes = {
  data: PropTypes.array.isRequired,
};