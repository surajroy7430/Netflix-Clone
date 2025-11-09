import axios from "axios";
import { YOUTUBE_ENDPOINTS } from "../constants/youtube";

export const fetchPopularVideos = async () => {
  try {
    const response = await axios.get(YOUTUBE_ENDPOINTS.POPULAR_VIDEOS);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await axios.get(
      `${YOUTUBE_ENDPOINTS.VIDEO_DETAILS}&id=${videoId}`
    );
    return response.data.items[0];
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
};

export const fetchRelatedVideos = async (videoId) => {
  try {
    const response = await axios.get(
      `${YOUTUBE_ENDPOINTS.RELATED_VIDEOS}&relatedToVideoId=${videoId}`
    );
    console.log("utils related:", response.data);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return [];
  }
};

export const searchVideos = async (query) => {
  try {
    const response = await axios.get(
      `${YOUTUBE_ENDPOINTS.SEARCH_VIDEOS}&q=${encodeURIComponent(query)}`
    );
    return response.data.items;
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
};

export const formatViewCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count;
};

export const formatTimestamp = (publishedAt) => {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffInSeconds = Math.floor((now - published) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;

  return published.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "").replace("M", "");
  const seconds = (match[3] || "").replace("S", "");

  if (hours) {
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  }
  return `${minutes || "0"}:${seconds.padStart(2, "0")}`;
};
