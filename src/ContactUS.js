import React, { useState } from "react";
import Navbar from './components/company/dashboard/navBar.js'
import SideNav from "./components/company/dashboard/sideNav";


const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message Sent Successfully');
    // Handle submission logic here (e.g., sending the data to a server)
    console.log("Submitted data:", { name, email, message });

    // Clear input fields after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
    <SideNav />
      <Navbar />

      <div className="min-h-screen pr-9 ml-4">
        <div className="bg-white mt-6 ml-4 w-3/4 shadow-lg rounded-lg p-2">
          <h2 className="text-2xl ml-3 font-bold mb-4">Contact Us</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold ml-3 mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none border rounded w-4/5 ml-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold ml-3 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded w-4/5 ml-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 ml-3 font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="appearance-none border rounded w-4/5 ml-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                value={message}
                onChange={handleMessageChange}
                placeholder="Write your message here..."
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
