
"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Page() {
   const router= useRouter()

    useEffect(()=>{
       
        
            router.replace('/erp/')
        
    },[])

  return (
    <div>Page</div>
  )
}

export default Page