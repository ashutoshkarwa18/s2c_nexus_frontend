import React, { useState } from 'react';

function Search(props) {

    const [search, setSearch] = useState("")
    const handleSearchChange = (e)=> {
        const {value} = e.target
        setSearch(value) 
    }
    const handleSearch =()=> {
        props.handleSearch(search)
    }
  return (

    <div className="flex items-center">
            <div className="flex border my-6 mx-8 w-1/2 border-[#0f172a] rounded">
                <input
                onChange={handleSearchChange}
                    type="text"
                    className="block w-full px-4 py-2 text-[#0f172a] bg-white border rounded-md focus:border-[#0f172a] focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                />
                <button onClick={handleSearch} className="px-4 text-white bg-[#0f172a] border-l rounded ">
                    Search
                </button>
            </div>
        </div>
  
  );
}

export default Search;