import React from 'react'

const ShowCase = () => {
  return (
    <div className='h-[1200px] w-[98vw] sm:w-[96vw] md:w-[95vw] mx-auto grid grid-cols-2 gap-4 grid-rows-2'>
        <div className='col-span-1 rounded-[10px] md:rounded-[15px] row-span-1 bg-red-500'></div>
        <div className='col-span-1 rounded-[10px] md:rounded-[15px] row-span-1 bg-red-500'></div>
        <div className='col-span-2 rounded-[10px] md:rounded-[15px] row-span-1 bg-red-500'></div>
    </div>
  )
}

export default ShowCase