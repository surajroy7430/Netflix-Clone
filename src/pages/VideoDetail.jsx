import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoDetails, fetchRelatedVideos } from "../utils/youtubeApi";
import VideoPlayer from "../components/VideoPlayer";
import VideoCard from "../components/VideoCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useVideo } from "../context/VideoContext";

const VideoDetail = () => {
  const { videoId } = useParams();
  const {
    currentVideo,
    setCurrentVideo,
    relatedVideos,
    setRelatedVideos,
    loading,
    setLoading,
  } = useVideo();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadVideoData = async () => {
      if (!videoId) return;

      setLoading(true);
      const [videoData, related] = await Promise.all([
        fetchVideoDetails(videoId),
        fetchRelatedVideos(videoId),
      ]);

      setCurrentVideo(videoData);
      setRelatedVideos(related);
      setLoading(false);
    };

    loadVideoData();
  }, [videoId, setCurrentVideo, setRelatedVideos]);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      {/* <Sidebar isOpen={sidebarOpen} /> */}

      {/* Main content */}
      <main className="pt-14">
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Video player section */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="animate-pulse">
                <div className="bg-zinc-800 aspect-video rounded-xl mb-4" />
                <div className="h-6 bg-zinc-800 rounded w-3/4 mb-4" />
                <div className="h-20 bg-zinc-800 rounded" />
              </div>
            ) : (
              <VideoPlayer video={currentVideo} />
            )}
          </div>

          {/* Suggestions sidebar */}
          <aside className="w-full lg:w-96 space-y-2">
            {loading
              ? [...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-2">
                    <div className="w-40 aspect-video bg-zinc-800 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-zinc-800 rounded" />
                      <div className="h-3 bg-zinc-800 rounded w-2/3" />
                    </div>
                  </div>
                ))
              : relatedVideos.map((video) => (
                  <div
                    key={video.id.videoId || video.id}
                    className="flex gap-2"
                  >
                    <VideoCard
                      video={{ ...video, id: video.id.videoId || video.id }}
                    />
                  </div>
                ))}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default VideoDetail;
