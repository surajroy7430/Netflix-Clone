import { useNavigate } from "react-router-dom";
import {
  formatViewCount,
  formatTimestamp,
  formatDuration,
} from "../utils/youtubeApi";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const snippet = video.snippet;
  const statistics = video.statistics || {};
  const contentDetails = video.contentDetails || {};
  const videoId = video.id?.videoId || video.id;

  const thumbnailUrl =
    snippet?.thumbnails.high?.url ||
    snippet?.thumbnails.medium?.url ||
    `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <div
    className="cursor-pointer group"
      onClick={() => navigate(`/watch/${videoId}`)}
    >
      {/* Thumbnail*/}
      <div className="relative mb-3 rounded-xl overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={snippet.title}
          className="w-full aspect-video object-cover transition-transform duration-200 group-hover:scale-102"
        />
        {contentDetails.duration && (
          <span className="absolute bottom-2 right-2 px-1 py-0.5 bg-zinc-950/90 text-white text-xs font-semibold rounded">
            {formatDuration(contentDetails.duration)}
          </span>
        )}
      </div>

      {/* Video info */}
      <div className="flex gap-3">
        {/* Channel avatar */}
        <div className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-sm font-medium">
          {snippet.channelTitle?.[0] || "C"}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-sm font-medium line-clamp-2 mb-1"
            title={snippet.title}
          >
            {snippet.title}
          </h3>
          <p className="text-sm text-zinc-400 hover:text-white cursor-pointer">
            {snippet.channelTitle}
          </p>
          <div className="flex items-center gap-1 text-xs text-zinc-400 mt-0.5">
            {statistics.viewCount && (
              <span>{formatViewCount(statistics.viewCount)} views</span>
            )}
            {statistics.viewCount && snippet.publishedAt && <span>•</span>}
            {snippet.publishedAt && (
              <span>{formatTimestamp(snippet.publishedAt)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
