import React, { useEffect, useState } from 'react'

const Products = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [offset, setOffset] = useState(0)

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${offset}&select=title,price`
      )
      const newData = await response.json()
      // debugger
      setData(prevData => [...prevData, ...newData.products])
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [offset])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setOffset(prevoffset => prevoffset + 10)
      setIsLoading(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div>
        {data.map(item => (
          <div
            key={item.id}
            style={{
              height: '100px'
            }}
          >
            <h1>{item.title}</h1>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className='border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto'>
          <div className='animate-pulse flex space-x-4'>
            <div className='rounded-full bg-slate-200 h-10 w-10'></div>
            <div className='flex-1 space-y-6 py-1'>
              <div className='h-2 bg-slate-200 rounded'></div>
              <div className='space-y-3'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='h-2 bg-slate-200 rounded col-span-2'></div>
                  <div className='h-2 bg-slate-200 rounded col-span-1'></div>
                </div>
                <div className='h-2 bg-slate-200 rounded'></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Products
