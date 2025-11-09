import { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const value = {
    videos,
    setVideos,
    currentVideo,
    setCurrentVideo,
    relatedVideos,
    setRelatedVideos,
    loading,
    setLoading,
    searchQuery,
    setSearchQuery,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};
