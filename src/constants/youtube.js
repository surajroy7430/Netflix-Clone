export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
export const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

export const YOUTUBE_ENDPOINTS = {
  POPULAR_VIDEOS: `${YOUTUBE_BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=50&key=${YOUTUBE_API_KEY}`,
  SEARCH_VIDEOS: `${YOUTUBE_BASE_URL}/search?part=snippet&type=video&maxResults=20&key=${YOUTUBE_API_KEY}`,
  VIDEO_DETAILS: `${YOUTUBE_BASE_URL}/videos?part=snippet,statistics&key=${YOUTUBE_API_KEY}`,
  RELATED_VIDEOS: `${YOUTUBE_BASE_URL}/search?part=snippet&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`,
};
