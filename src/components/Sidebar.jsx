import { useNavigate } from "react-router-dom";
import { ChevronRight, Copyright } from "lucide-react";
import { libraryItems, menuItems, youtubeMore } from "../constants";

const Sidebar = ({ isOpen, onClose, popularVideos }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-950 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-14 bottom-0 z-40 w-64 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent
          transform transition-transform duration-200 overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4">
          {/* Main menu */}
          <nav className="space-y-1 pb-2">
            {menuItems.map(({ Icon, label, path }, index) => (
              <button
                key={index}
                onClick={() => {
                  if (path) {
                    navigate(path);
                    popularVideos();
                  }
                }}
                className="w-full inline-flex items-center gap-6 px-3 py-3 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </nav>

          <hr className="text-zinc-700" />

          {/* Library */}
          <nav className="py-2">
            {libraryItems.map(({ Icon, label }, index) => (
              <button
                key={index}
                className="w-full inline-flex items-center gap-6 px-3 py-3 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </nav>

          <hr className="text-zinc-700" />

          {/* Subscriptions section */}
          <div className="py-2">
            <h3 className="flex items-center gap-1 font-semibold w-full p-3 hover:bg-zinc-800 rounded transition-colors cursor-pointer tracking-wider">
              Subscriptions <ChevronRight className="h-5 w-5" />
            </h3>
            <nav className="space-y-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 rounded transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-xs">
                    C{i}
                  </div>
                  <span className="text-sm text-zinc-300">Channel {i}</span>
                </button>
              ))}
            </nav>
          </div>

          <hr className="text-zinc-700" />

          {/* YouTube More */}
          <div className="py-2">
            <h3 className="font-semibold w-full px-3 py-2 tracking-wider">
              More from YouTube
            </h3>
            <nav className="space-y-1">
              {youtubeMore.map(({ Icon, label }, index) => (
                <button
                  key={index}
                  className="w-full inline-flex items-center gap-6 px-3 py-3 rounded-md hover:bg-zinc-800 transition-colors"
                >
                  <Icon className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-zinc-300">
                    {label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <hr className="text-zinc-700" />

          <div className="space-y-3 py-2 px-3">
            <p className="flex flex-wrap space-x-2">
              {[
                "About",
                "Press",
                "Copyright",
                "Contact us",
                "Creators",
                "Advertise",
                "Developers",
              ].map((item, i) => (
                <span
                  key={i}
                  className="text-[13px] font-semibold text-zinc-400 cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </p>
            <p className="flex flex-wrap space-x-2">
              {[
                "Terms",
                "Privacy",
                "Policy & Safety",
                "How YouTube works",
                "Test new features",
              ].map((item, i) => (
                <span
                  key={i}
                  className="text-[13px] font-semibold text-zinc-400 cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </p>
            <div className="inline-flex items-center gap-2 text-zinc-500 text-xs mt-2">
              <Copyright className="h-3 w-3" /> {new Date().getFullYear()}{" "}
              Google LLC
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
