import { useState, useEffect } from "react";
import { fetchPopularVideos } from "../utils/youtubeApi";
import VideoCard from "../components/VideoCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useVideo } from "../context/VideoContext";

const Home = () => {
  const { videos, setVideos, loading, setLoading } = useVideo();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadVideos = async () => {
    setLoading(true);
    const data = await fetchPopularVideos();
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    if (videos.length === 0) loadVideos();
  }, [videos.length, setVideos, setLoading]);

  return (
    <div className="min-h-screen">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} popularVideos={loadVideos} />

      {/* Main content */}
      <main className="flex-1 pt-14 lg:pl-60">
        <div className="p-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-zinc-800 aspect-video rounded-xl mb-3" />
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-zinc-800 rounded" />
                      <div className="h-3 bg-zinc-800 rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No videos found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
