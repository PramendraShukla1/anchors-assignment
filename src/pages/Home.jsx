import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaYoutube } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [videoId, setVideoId] = useState("");
const navigate = useNavigate()
  const youtubeAPIKey = "AIzaSyAPjge1aL3hLJad2NtuKPtFLSCjnBTKA0g";

  const youtubeUrl = videoId;
  const videoURL = youtubeUrl.split("v=")[1];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const videoDetailsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=${youtubeAPIKey}&id=${videoURL}&part=snippet,statistics`
      )
if(videoDetailsResponse.data.pageInfo.resultsPerPage === 0){
  toast.error('Please enter a valid URL', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
    setVideoId("")
}else{
  navigate(`/earning-predictor/${videoURL}`)
}

    } catch (error) {
      console.error("Error fetching video data:", error);
    
    
    }
  };

  return (
    <div className="bg-[#101010] h-screen">
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
      <div className="lg:h-[200px]">
        <img
          src={logo}
          alt="logo"
          className="lg:h-[100px] h-[50px] md:h-[100px] w-auto object-cover "
        />
      </div>
      <div className="mt-36">
        <div className="flex justify-center items-center w-full flex-wrap">
          <div className="w-[600px]">
            <h1 className="text-white font-semibold lg:text-5xl text-3xl md:text-5xl text-center leading-[50px] lg:leading-[70px]">
              Discover your earning potential
            </h1>
            <p className="text-gray-400 md:text-2xl md:mt-10 lg:mt-10 mt-5 p-2 lg:text-2xl text-md text-center ">
              Turn your Youtube expertise into a lucrative income through
              resource sharing
            </p>
            <div className="flex flex-row flex-wrap lg:gap-5 lg:justify-between justify-center lg:mt-10 mt-5 p-2">
              <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center lg:gap-5">
                
                <label
                  htmlFor="text"
                  className="relative text-gray-400 focus-within:text-gray-600 block lg:w-[400px] w-full"
                >
                  <FaYoutube className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
                  <input
                    type="text"
                    placeholder="Enter youtube video link"
                    class="border border-gray-900 py-3 px-4 bg-inherit rounded-full  placeholder-gray-800 text-gray-500 w-full pl-14 focus:outline-none"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                  />
                </label>

                <button
                  className="bg-[#ff2021] w-[160px] h-[50px] mt-5 lg:mt-0 rounded-full text-white text-xl font-normal outline-none"
                  type="submit"
                >
                  Check Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
