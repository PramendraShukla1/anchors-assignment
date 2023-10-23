import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import {
  FaPhoneAlt,
  FaMedal,
  FaRegEye,
  FaThumbsUp,
  FaCommentAlt,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { FcApproval } from "react-icons/fc";
import axios from "axios";

const Earning = () => {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [earning, setEarning] = useState("");
  const [upload, setUpload] = useState("");
  const [comments, setComments] = useState("");
  const [related, setRelated] = useState([]);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const youtubeAPIKey = "AIzaSyAPjge1aL3hLJad2NtuKPtFLSCjnBTKA0g";

  const { id } = useParams();
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?key=${youtubeAPIKey}&id=${id}&part=snippet,statistics`
        );
        const channelId = response.data.items[0].snippet.channelId;
        const videoChannel =
          await axios.get(`https://www.googleapis.com/youtube/v3/channels?key=${youtubeAPIKey}&id=${channelId}&part=statistics
`);
        const relatedVideos =
          await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}&channelId=${channelId}&part=snippet&type=video&order=viewCount&maxResults=11 
`);

        // console.log(relatedVideos);

        setRelated(relatedVideos.data.items);
        console.log(related);

        const videoImg = response.data.items[0].snippet.thumbnails.high.url;
        const videoTitle = response.data.items[0].snippet.title;
        const videoViews = response.data.items[0].statistics.viewCount;
        const videoLikes = response.data.items[0].statistics.likeCount;
        const videoComments = response.data.items[0].statistics.commentCount;
        const subscriber =
          videoChannel.data.items[0].statistics.subscriberCount;
        const videoDate = response.data.items[0].snippet.publishedAt;
        const datefns = new Date(videoDate);
        const formattedDate = datefns.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const videoEarning =
          Math.min(subscriber, videoViews) +
          10 * videoComments +
          5 * videoLikes;

        setThumbnail(videoImg);
        setTitle(videoTitle);
        setViews(videoViews);
        setLikes(videoLikes);
        setComments(videoComments);
        setEarning(videoEarning);
        setUpload(formattedDate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideoDetails();
  }, []);

  return (
    <div className="bg-[#101010] min-h-screen">
      {/* Navbar */}
      <div className="flex lg:justify-between justify-center flex-row lg:px-10 lg:py-5 px-2 py-5">
        <div>
          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              className="lg:h-[80px] h-[50px] md:h-[100px] w-auto object-cover "
            />
          </Link>
        </div>
        <div
          className="flex  gap-3 items-center border border-gray-600 rounded-full lg:p-6 py-4 px-3 lg:h-[10px] h-[5px] hover:cursor-pointer hover:opacity-80"
          onClick={() => handleOpen("sm")}
          variant="gradient"
        >
          <FaPhoneAlt className="text-white" />
          <span className="text-white text-xs lg:text-lg">
            Request a call back
          </span>
        </div>
      </div>
      {/* Navbar */}

      {/* Video Card */}

      <div className="flex justify-center w-full px-10 lg:p-0 ">
        <div className="lg:w-[900px] lg:h-[300px] bg-[#1e1e1e] rounded-xl px-10 py-5 mb-10">
          <div className="lg:h-50px flex justify-center lg:justify-start">
            <div className="flex flex-row gap-3 items-center bg-[#707070] w-[170px] h-8 p-2 rounded-md">
              <FaMedal className="text-white" />
              <span className="text-white">Top earner video</span>
            </div>
          </div>
          <div className="flex lg:justify-between lg:flex-row flex-col justify-center mt-5">
            <div className="flex items-center justify-center lg:justify-start">
              <img
                src={thumbnail}
                alt=""
                className="h-32 w-[250px] object-cover rounded-xl"
              />
            </div>
            <div className="text-white lg:ml-10">
              <h1 className="text-xl font-normal text-center lg:text-start mt-3 lg:mt-0">
                {title}
              </h1>
              <div className="">
                <div className="flex flex-row flex-wrap gap-3 items-center justify-center lg:justify-start mt-2">
                  <p className="gap-3">
                    <FaRegEye className="w-auto h-auto" />
                  </p>
                  <span className="text-gray-600">{views}</span>
                </div>
                <div className="flex flex-row flex-wrap gap-3 justify-center lg:justify-start items-center mt-2">
                  <p className="gap-3">
                    <FaThumbsUp className="w-4 h-4" />
                  </p>
                  <span className="text-gray-600">{likes}</span>
                </div>
                <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-3 mb-5 lg:mb-0 items-center mt-2">
                  <p className="gap-3">
                    <FaCommentAlt className="w-4 h-4" />
                  </p>
                  <span className="text-gray-600">{comments}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-[#282828]  w-[250px] rounded-xl">
                <div className="w-full flex lg:mt-10 mt-5 flex-col items-center">
                  <p className="font-normal text-white text-3xl">
                    &#8377; {earning}
                  </p>
                  <button className="bg-white rounded-full p-3 h-8 w-24 flex items-center place-content-center mt-3 mb-4 lg:mb-0 hover:opacity-80">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            <p className="text-gray-500 mt-3 text-sm lg:text-md">
              Uploaded on - {upload}
            </p>
          </div>
        </div>
      </div>

      {/* Video Card */}

      {/* Suggested Video List */}

      <div className="hidden lg:flex lg:flex-col flex-row justify-center items-center mt-36">
        <div className="mb-5">
          <p className="text-gray-500 text-lg">Other Videos Potentials</p>
        </div>
        <div className="lg:w-[900px] lg:h-auto bg-[#1e1e1e]  rounded-md px-10 py-5 flex items-center">
          <table className="w-full">
            <thead>
              <tr className="flex justify-between text-white text-sm flex-col lg:flex-row gap-10 lg:gap-0">
                <th>Rank</th>
                <th>Title</th>
                <th>Thumbnail</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Comment</th>
                <th>Uploaded on</th>
                <th>*Estimated Earning</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="lg:w-[900px] lg:h-auto bg-[#171717] rounded-md px-10 py-5 mt-2">
          <div className="flex flex-col gap-4 text-sm">
            {related.map((video,index) => (
              <table key={video.id.videoId} className="w-full">
                <tr className="flex justify-between  text-white items-center">
                  <td className="text-gray-500">{
                    index+1
                 }</td>
                  <td className="text-gray-500">
                    {video.snippet.title.length > 12
                      ? video.snippet.title.slice(0, 15) + "..."
                      : video.snippet.title}
                  </td>

                  <td>
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt=""
                      className="h-12 w-auto"
                    />
                    {console.log(video)}
                  </td>
                  <td className="text-gray-500">123748</td>
                  <td className="text-gray-500">12340</td>
                  <td className="text-gray-500">1342</td>
                  <td className="text-gray-500">
                    {new Date(video.snippet.publishedAt).toLocaleDateString(
                      "en-US"
                    )}
                  </td>

                  <td className="text-gray-500">239893</td>
                </tr>
              </table>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Video List */}

      {/* Dialog Box */}
      {!submit ? (
        <Dialog
          open={open}
          handler={handleOpen}
          size="xs"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader className="flex text-center justify-center font-normal text-lg bg-[#282828] text-white rounded-t-md">
            Request a call back
          </DialogHeader>
          <DialogBody className="bg-[#282828] flex flex-col flex-wrap w-full rounded-b-md">
            <form className="flex flex-col w-full justify-center">
              <label htmlFor="text" className="flex justify-center">
                <input
                  type="text"
                  className="bg-inherit border border-gray-600 rounded-lg placeholder:text-sm placeholder:text-gray-600 px-3 py-1 outline-none text-white w-[300px] h-[50px]"
                  placeholder="Enter Name"
                  required
                />
              </label>
              <label htmlFor="number" className="flex justify-center mt-3">
                <input
                  type="number"
                  className="bg-inherit border border-gray-600 rounded-lg placeholder:text-sm placeholder:text-gray-600 px-3 py-1 outline-none text-white w-[300px] h-[50px]"
                  placeholder="Mobile Number"
                  required
                />
              </label>

              <label htmlFor="time" className="flex justify-center mt-3">
                <input
                  type="time"
                  className="bg-inherit border border-gray-600 rounded-lg placeholder:text-sm placeholder:text-gray-600 px-3 py-1 outline-none text-white lg:w-[300px] w-full h-[50px]"
                  placeholder="Preferred callback time"
                  required
                />
              </label>

              <label htmlFor="textarea" className="flex justify-center mt-3">
                <textarea
                  id="textarea"
                  className="bg-inherit border border-gray-600 rounded-lg placeholder:text-sm placeholder:text-gray-600 px-3 py-1 outline-none text-white w-[300px]"
                  placeholder="Any additional comments or questions"
                  required
                />
              </label>
              <div className="mt-5 flex justify-center mb-10">
                <button
                  className="bg-white text-black rounded-full px-7 py-2"
                 onClick={()=>setSubmit(true)}
                >
                  Request a Call Back
                </button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          handler={handleOpen}
          size="xs"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader className="flex text-center justify-center font-normal text-lg bg-[#282828] text-white rounded-t-md flex-col gap-4">
            <FcApproval className="" size={70} />
            Request a call back
          </DialogHeader>
          <DialogBody className="bg-[#282828] flex flex-col flex-wrap w-full rounded-b-md text-center place-content-center">
            <div className="w-[250px] flex flex-col">
              <p className="text-white text-md w-full">
                Our Team will call you shortly in 12-24 hrs{" "}
              </p>
              <p className="text-white text-md w-full">
                Can't you wait for call?
              </p>
            </div>

            <div className="mt-5 flex justify-center mb-10 flex-row">
              <button
                className="bg-[#ff0a00] text-white font-normal rounded-full px-7 py-2 flex gap-2 items-center outline-none"
                onClick={() => navigate("/")}
              >
                Check another video
                <FaArrowRightLong />
              </button>
            </div>
          </DialogBody>
        </Dialog>
      )}
      {/* Dialog Box */}
    </div>
  );
};

export default Earning;
