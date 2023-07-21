import React from 'react';
import Icon from '../../images/icon-03.svg';
import { useState, useEffect } from "react";
import axios from "axios";

function DashboardCard03() {
  const [count, setCount] = useState([])
  
  useEffect(() => {
      axios.get('http://localhost:8080/company/getAllDetailsCount'
      )
        .then(function (response) {
          if (response.data.success) {
            setCount(response.data.count)
          } else {
            console.log(response.data.message)
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    
  }, [])

    return (
        <div className="flex flex-col h-44 col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
          <div className="px-5 pt-5">
            <header className="flex justify-between items-start mb-2">
              <img src={Icon} width="32" height="32" alt="Icon 01" />
            </header>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Companies</h2>
            <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Count</div>
            <div className="flex items-start">
              <div className="text-3xl font-bold text-slate-800 mr-2">{count}</div>
              <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">Live</div>
            </div>
          </div>
          
        </div>
      );
    }

export default DashboardCard03;