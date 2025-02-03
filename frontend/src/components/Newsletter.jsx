import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Newsletter = () => {
    const [loading,setLoading] = useState(false)
    const handleSubmit = (e) => { 
        setLoading((prev)=>true)
        
        e.preventDefault()
        toast.success("Successfully subscribed to our news letter",{
            position:"top-center"
        })
        setLoading((prev)=>false)
    }
  return (
    <>
     <section className="items-center my-12 max-w-screen-xl mx-auto px-6 gap-4 md:flex md:px-8 xl:gap-12">
            <div className="flex-1 space-y-3">
                <h3 className="text-2xl text-gray-800 font-bold lg:text-3xl">
                    Subscribe to our newsletter
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Stay up to date with the roadmap progress, announcements and exclusive updates feel free to sign up with your email.  
                </p>
            </div>
            <div className="mt-6 flex-1">
                <div 
                    
                    className="items-center justify-center sm:flex">
                    <input 
                        type="email"
                        placeholder="Enter your email"
                        className="text-gray-500 w-full p-3 rounded-md border outline-none border-gray-600 focus:border-2 focus:border-[#2f0601]"
                    />
                    <button
                        className="w-full mt-3 px-5 py-3 rounded-md text-white hover:text-[#2f0601] active:text-white bg-[#2f0601] hover:bg-white active:bg-[#2f0601] duration-150 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-[#2f0601] sm:mt-0 sm:ml-3 sm:w-auto"
                        onClick={handleSubmit}
                    >
                        {loading?<ClipLoader
                            color={"white"}
                            size={30}
                        />:"Subscribe"}
                    </button>
                </div>
                <p className="mt-3 text-[15px] text-gray-400">
                    Product updates, announcements.
                    Read our <a className="text-[#2f0601] underline" href="#"> Privacy Policy </a>
                </p>
            </div>
        </section>
    </>
  )
}

export default Newsletter