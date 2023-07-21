import React from 'react'
import { useNavigate } from 'react-router'

export const StudentOffers = () => {
    const navigate = useNavigate()
    const interview=()=>{
        navigate("https://s2c-nexus-jwao.onrender.com") 
    }
    
    return (
        <>
            <div>
                <div className='font-open-sans'>
                    <div className="left-0 w-5/5 shadow-xl  mx-2 my-10 focus:outline-none border-none 
            bg-[#C2D3E4] border font-bold text-[#1F2937] text-lg  py-2 px-4 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 mb-0.5 inline-block">
                            <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                        </svg>
                        <span>Student Interview Section</span></div>
                </div>
                <button class="mx-5 bg-green-500 text-white font-bold py-2 px-4 border border-black-700 rounded">
                    Active Interviews!
                </button>

                <div className='mx-5 mt-2 grid grid-cols-2 gap-4'>
    
          <div class="border cols-span-2 p-2 bg-[#C2D3E4]">
          <div><b>Company: Tata Consultancy Services</b> </div>
          
          
        </div>
        <a href="https://s2c-nexus-jwao.onrender.com" target="_blank">
        
        <button class="bg-green-500 w-1/3 text-white font-bold py-2 px-1 border border-black-700 rounded">
        Join Interview
        </button>
        </a>
      </div>

            </div>
        </>
    )
}
