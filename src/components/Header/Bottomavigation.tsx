import { Calendar, Presentation, User2, Users } from "lucide-react";
import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

export default function BottomNavigation() {
  const location = useLocation();

  const { isAuthenticated, user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        user: { username: string };
      };
    }) => state.auth
  );

  type NavLink = { to: string; label: string; icon: JSX.Element };

  const navLinks: NavLink[] = [
    {
      to: "/",
      label: "Find Devs",
      icon: <Users className="w-5 h-5" />,
    },
    ...(isAuthenticated
      ? [
          {
            to: "/meeting-room",
            label: "Room",
            icon: <Presentation className="w-5 h-5" />,
          },
          {
            to: "/schedule",
            label: "Schedule",
            icon: <Calendar className="w-5 h-5" />,
          },
        ]
      : []),
    {
      to: `${isAuthenticated ? `/profile/${user?.username}` : "/login"}`,
      label: `${isAuthenticated ? "Profile" : "Login"}`,
      icon: <User2 className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-full md:w-96  -translate-x-1/2">
      <div className="relative">
        <div
          className="absolute inset-0 rounded-2xl 
          bg-gray-900 dark:bg-gray-100
          border border-gray-700 dark:border-gray-300
          shadow-2xl shadow-black/20 dark:shadow-black/40"
        />

        <div
          className={`relative grid h-16 px-2 ${
            isAuthenticated ? "grid-cols-4" : "grid-cols-2"
          } gap-1`}
        >
          {navLinks.filter(Boolean).map((link) => {
            const isActive = location.pathname === link.to;

            return (
              <Link
                to={link.to}
                key={link.to}
                className="group relative flex items-center justify-center min-w-[60px] px-3"
              >
                {isActive && (
                  <div
                    className="absolute inset-1 rounded-2xl 
                    bg-primary
                   
                    shadow-lg shadow-orange-500/30
                    animate-in fade-in-0 zoom-in-95 duration-200"
                  />
                )}

                {/* Content */}
                <div
                  className={`relative flex flex-col items-center justify-center transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "text-white scale-105"
                      : "text-gray-300 dark:text-gray-600 group-hover:text-white dark:group-hover:text-gray-800 group-hover:scale-105"
                  }`}
                >
                  {/* Icon container */}
                  <div className="relative">
                    {link.icon}

                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>

                  {!isActive && (
                    <span
                      className="text-[10px] font-medium mt-1 transition-all duration-300
                      group-hover:text-white dark:group-hover:text-gray-800"
                    >
                      {link.label}
                    </span>
                  )}
                </div>

                <div
                  className="absolute inset-1 rounded-full 
                  bg-gray-700/60 dark:bg-gray-300/60 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200 ease-out
                  -z-10"
                />
              </Link>
            );
          })}
        </div>
        <div
          className="absolute -inset-1 rounded-full 
          bg-gradient-to-r from-orange-500/30 via-transparent to-orange-500/30 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 ease-out 
          blur-xl -z-10"
        />
      </div>
    </div>
  );
}
