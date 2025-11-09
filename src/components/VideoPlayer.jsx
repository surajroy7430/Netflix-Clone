import { useState } from "react";
import { formatViewCount, formatTimestamp } from "../utils/youtubeApi";
import { PiShareFat } from "react-icons/pi";
import { SlLike, SlDislike } from "react-icons/sl";

const VideoPlayer = ({ video }) => {
  if (!video) return null;
  const { snippet, statistics } = video;
  const [expanded, setExpanded] = useState(false);

  const formatDescription = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const hashRegex = /#[a-zA-Z0-9_]+/g;
    const mentionRegex = /@[a-zA-Z0-9_]+/g;

    return text.split(/(\s+)/).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500"
          >
            {part}
          </a>
        );
      }

      if (hashRegex.test(part)) {
        return (
          <span key={index} className="text-sky-500">
            {part}
          </span>
        );
      }

      if (mentionRegex.test(part)) {
        return (
          <span key={index} className="bg-zinc-700 p-0.5">
            {part}
          </span>
        );
      }

      return part;
    });
  };

  return (
    <div className="space-y-4">
      {/* Video iframe */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={snippet.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video title */}
      <h1 className="text-xl font-semibold">{snippet.title}</h1>

      {/* Video stats and actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4 ">
          {/* Channel info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center font-medium">
              {snippet.channelTitle?.[0] || "C"}
            </div>

            <div>
              <h3 className="font-semibold text-zinc-300">
                {snippet.channelTitle}
              </h3>
              <p className="text-xs font-medium text-zinc-500">
                1.2M subscribers
              </p>
            </div>
          </div>

          <button className="px-4 py-1.5 bg-zinc-200 text-black font-medium rounded-full hover:bg-zinc-300">
            Subscribe
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-800 rounded-full">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 rounded-l-full transition-colors">
              <SlLike className="h-5 w-5" strokeWidth={30} />
              <span className="text-sm font-medium">
                {formatViewCount(statistics?.likeCount || 0)}
              </span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 rounded-r-full transition-colors border-l border-zinc-600">
              <SlDislike className="h-5 w-5" strokeWidth={30} />
            </button>
          </div>

          <button className="inline-flex items-center space-x-2 px-4 py-1.5 font-medium bg-zinc-800 hover:bg-zinc-700 rounded-full">
            <PiShareFat className="h-5 w-5" strokeWidth={3} />
            <span>Share</span>
          </button>
        </div>
      </div>

      <hr className="text-zinc-700" />

      {/* Description */}
      <div className="bg-zinc-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm font-medium mb-2">
          <span>{formatViewCount(statistics?.viewCount || 0)} views</span>
          <span>•</span>
          <span>{formatTimestamp(snippet.publishedAt)}</span>
        </div>

        <div
          className={`text-sm whitespace-pre-wrap ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {formatDescription(snippet?.description || "")}
        </div>
        {snippet?.description?.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
