import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Settings, LogOut } from "lucide-react";
import { searchVideos } from "../utils/youtubeApi";
import { useVideo } from "../context/VideoContext";
import youtubeLogo from "../assets/youtube.png";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { setVideos, setLoading, searchQuery, setSearchQuery } = useVideo();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const displayName = user?.email?.split("@")[0];
  const formattedName = displayName
    ? displayName
        .replace(/\./g, " ")
        .replace(/(^\w|\s\w)/g, (c) => c.toUpperCase())
    : "";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const result = await searchVideos(searchQuery);
      setVideos(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 h-14">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
            aria-label="Menu"
          >
            <Menu />
          </button>
          <button
            onClick={() => navigate("/")}
            className="hidden items-center gap-1 sm:flex"
          >
            <img src={youtubeLogo} alt="Youtube" className="object-cover h-5" />
            <span className="text-xl font-semibold tracking-tighter">
              YouTube
            </span>
          </button>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-l-full focus:outline-none focus:border-sky-600"
            />
            <button
              type="submit"
              className="px-3 sm:px-6 py-2 bg-zinc-800 border border-l-0 border-zinc-800 rounded-r-full hover:bg-zinc-800/90 transition-colors"
            >
              <Search />
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative">
              {/* Avatar */}
              <div
                onClick={() => setOpen((prev) => !prev)}
                className="w-8 h-8 rounded-full bg-red-500 cursor-default flex items-center justify-center text-sm font-medium select-none"
              >
                {user.email?.[0].toUpperCase()}
              </div>

              {/* Popover */}
              {open && (
                <div
                  className={`absolute right-0 mt-2 w-64 bg-zinc-800 rounded-lg py-3 z-50 transition-all duration-200
                ${
                  open
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
                >
                  <div className="space-y-3">
                    <div className="flex gap-4 px-3">
                      <div className="w-8 h-8 rounded-full bg-red-500 cursor-default flex items-center justify-center text-sm font-medium">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span>{formattedName}</span>
                        <span>{user.email}</span>
                      </div>
                    </div>

                    <hr className="text-zinc-600" />

                    <div>
                      <div className="w-full px-3 py-2 transition-colors duration-300 inline-flex gap-2 items-center hover:bg-zinc-700 cursor-pointer">
                        <Settings className="h-5 w-5" /> Settings
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2 transition-colors duration-300 inline-flex gap-2 items-center hover:bg-zinc-700 cursor-pointer"
                      >
                        <LogOut className="h-5 w-5" /> Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
