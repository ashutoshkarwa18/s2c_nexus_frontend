import React from "react";
export default function AdminNavbar() {
  return (
    <div class="main">
      <nav class="border-b  p-3 bg-[#0f172a] fixed w-full  z-50 top-0 left-0  dark:bg-gray-800 dark:border-gray-700 ">
        <div class="container w-full m-0  flex  justify-between items-center ">
          <div class="flex flex-column w-3/4 ">
            <img
              class="rounded-full border border-gray-100 shadow-sm h-10 mx-3"
              src="./images/login.png"


            />

            <span class="mx-3 text-white text-xl font-semibold my-2">S2C Nexus</span>
          </div>
          {/* class=" text-xl font-semibold  whitespace-nowrap dark:text-white" */}
          <div class=" w-full m-0 md:block md:w-auto " id="navbar-solid-bg">
            <ul class="flex  flex-col justify-between items-end mt-4 bg-gray-50 p-0 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
