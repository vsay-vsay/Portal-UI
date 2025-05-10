import { LoaderCircle } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className=' h-screen flex justify-center flex-col gap-2 items-center w-full'>
        <LoaderCircle className='animate-spin  transition-all' size={50} />
        <p className='font-semibold text-lg'>Loading...</p>
    </div>
  )
}

export default Loading