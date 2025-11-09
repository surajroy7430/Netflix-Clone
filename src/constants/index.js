import {
  SiYoutubeshorts,
  SiYoutube,
  SiYoutubekids,
  SiYoutubestudio,
  SiYoutubemusic,
} from "react-icons/si";
import { BiLike, BiSolidHome } from "react-icons/bi";
import {
  MdHistory,
  MdOutlineWatchLater,
  MdSubscriptions,
  MdVideoLibrary,
} from "react-icons/md";

export const menuItems = [
  { Icon: BiSolidHome, label: "Home", path: "/" },
  { Icon: SiYoutubeshorts, label: "Shorts" },
  { Icon: MdSubscriptions, label: "Subscriptions" },
];
export const libraryItems = [
  { Icon: MdHistory, label: "History" },
  { Icon: MdVideoLibrary, label: "Your videos" },
  { Icon: BiLike, label: "Liked videos" },
  { Icon: MdOutlineWatchLater, label: "Watch later" },
];
export const youtubeMore = [
  { Icon: SiYoutube, label: "YouTube Premium" },
  { Icon: SiYoutubestudio, label: "YouTube Studio" },
  { Icon: SiYoutubemusic, label: "YouTube Music" },
  { Icon: SiYoutubekids, label: "YouTube Kids" },
];
