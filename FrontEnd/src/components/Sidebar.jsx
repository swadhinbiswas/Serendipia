// import {
//   Bell,
//   Briefcase,
//   Eye,
//   Home,
//   Mail,
//   Moon,
//   Plus,
//   Search,
//   Sun,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// import { useState } from "react";

// export default function Sidebar() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Helper function for navigation icon colors
//   const getIconColor = (active) => {
//     if (active) {
//       return darkMode ? "text-green-400" : "text-green-700";
//     }
//     return darkMode ? "text-gray-400" : "text-gray-700";
//   };

//   return (
//     <div
//       className={`flex ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 h-screen p-4
//       ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}
//       flex-col relative border-r ${darkMode ? "border-gray-700" : "border-gray-200"}`}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className={`absolute -right-3 top-5 p-2 rounded-full
//         ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"}
//         border ${darkMode ? "border-gray-700" : "border-gray-200"}
//         shadow-md hover:bg-opacity-80 transition-all duration-200`}
//       >
//         <span className="text-sm">{sidebarOpen ? "◀" : "▶"}</span>
//       </button>

//       {/* Profile Section */}
//       <div className="flex items-center gap-3 mb-6">
//         <div className="relative">
//         <Avatar>
//   <AvatarImage src="https://avatars.githubusercontent.com/u/144092840?v=4" />
//   <AvatarFallback>CN</AvatarFallback>
// </Avatar>

//           <div
//             className={`absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full
//             border-2 ${darkMode ? "border-gray-900" : "border-white"}`}
//           />
//         </div>
//         {sidebarOpen && (
//           <div className="transition-all duration-200 overflow-hidden">
//             <h3 className="font-semibold text-sm">Swadhin Biswas</h3>
//             <p
//               className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//             >
//               Dev, Serendipia
//             </p>
//           </div>
//         )}
//         {sidebarOpen && (
//           <button
//             className={`ml-auto p-1.5 rounded-lg transition-colors
//             ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
//           >
//             <Plus
//               className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-700"}`}
//             />
//           </button>
//         )}
//       </div>

//       {/* Search Bar */}
//       {sidebarOpen && (
//         <div className="mb-6 relative">
//           <Search
//             className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
//             ${darkMode ? "text-gray-500" : "text-gray-700"}`}
//           />
//           <input
//             type="text"
//             placeholder="Search"
//             className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border transition-colors
//               ${
//                 darkMode
//                   ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
//                   : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
//               }
//               focus:outline-none focus:ring-2 focus:ring-green-500`}
//           />
//         </div>
//       )}

//       {/* Navigation */}
//       <nav className="space-y-1 flex-1">
//         {[
//           { icon: Home, label: "StudyZone", count: null },
//           { icon: Briefcase, label: "Tasks", count: 32, active: true },
//           { icon: Bell, label: "Notifications", count: 4 },
//           { icon: Mail, label: "Messages", count: null },
//         ].map((item, index) => (
//           <button
//             key={index}
//             className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors
//               ${
//                 item.active
//                   ? darkMode
//                     ? "bg-green-900/50 text-green-400"
//                     : "bg-green-100 text-green-700"
//                   : darkMode
//                     ? "hover:bg-gray-800 active:bg-gray-700"
//                     : "hover:bg-gray-100 active:bg-gray-200"
//               }`}
//           >
//             <item.icon
//               className={`w-6 h-6 flex-shrink-0 ${getIconColor(item.active)}`}
//               strokeWidth={1.5}
//             />
//             {sidebarOpen && (
//               <>
//                 <span className="flex-1">{item.label}</span>
//                 {item.count !== null && (
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full
//                     ${
//                       item.active
//                         ? darkMode
//                           ? "bg-green-900 text-green-300"
//                           : "bg-green-200 text-green-800"
//                         : darkMode
//                           ? "bg-gray-700 text-gray-300"
//                           : "bg-gray-200 text-gray-700"
//                     }`}
//                   >
//                     {item.count}
//                   </span>
//                 )}
//               </>
//             )}
//           </button>
//         ))}
//       </nav>

//       {/* Agents Section */}
//       <div className="mt-6">
//         <div className="flex justify-between items-center px-2 mb-3">
//           {sidebarOpen && (
//             <span
//               className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//             >
//               Active Agents
//             </span>
//           )}
//           <button
//             className={`p-1.5 rounded-lg transition-colors
//             ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
//           >
//             <Eye
//               className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-700"}`}
//             />
//           </button>
//         </div>
//         <div className="space-y-2">
//           {[
//             { name: "Vale", emoji: "🕵️‍♀️" },
//             { name: "Cove", emoji: "👨‍💻" },
//             { name: "Su Hua", emoji: "👩‍🎓" },
//           ].map((team, index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors cursor-pointer
//                 ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
//             >
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center
//                 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
//               >
//                 {team.emoji}
//               </div>
//               {sidebarOpen && <span className="text-sm">{team.name}</span>}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Upload Section */}
//       {sidebarOpen && (
//         <div
//           className={`mt-6 p-3 rounded-lg border-2 border-dashed transition-colors cursor-pointer
//           ${
//             darkMode
//               ? "border-gray-700 hover:border-gray-600 bg-gray-800/50"
//               : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
//           }`}
//         >
//           <p
//             className={`text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//           >
//             Drag-n-Drop to Upload
//           </p>
//         </div>
//       )}

//       {/* Theme Toggle */}
//       <div
//         className={`flex gap-2 mt-6 p-1.5 rounded-lg
//         ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
//       >
//         <button
//           onClick={() => setDarkMode(false)}
//           className={`flex-1 p-1.5 rounded-md transition-colors
//             ${!darkMode ? "bg-white shadow-sm" : "hover:bg-gray-700"}`}
//         >
//           <Sun
//             className={`w-5 h-5 mx-auto ${!darkMode ? "text-yellow-500" : "text-gray-400"}`}
//           />
//         </button>
//         <button
//           onClick={() => setDarkMode(true)}
//           className={`flex-1 p-1.5 rounded-md transition-colors
//             ${darkMode ? "bg-gray-900 shadow-sm" : "hover:bg-gray-200"}`}
//         >
//           <Moon
//             className={`w-5 h-5 mx-auto ${darkMode ? "text-blue-400" : "text-gray-500"}`}
//           />
//         </button>
//       </div>
//     </div>
//   );
// }

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Briefcase,
  Eye,
  Home,
  Mail,
  Moon,
  Plus,
  Search,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
  // Check for stored dark mode preference or default to false
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedDarkMode);

  // Helper function for navigation icon colors
  const getIconColor = (active) => {
    if (active) {
      return darkMode ? "text-green-400" : "text-green-700";
    }
    return darkMode ? "text-gray-400" : "text-gray-700";
  };

  useEffect(() => {
    // Store the dark mode preference in localStorage
    const storedDarkMode =
      localStorage.getItem("darkMode") === null
        ? true
        : localStorage.getItem("darkMode") === "true";
  }, [darkMode]);

  return (
    <div
      className={`flex w-64 transition-all duration-300 h-screen p-4
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}
      flex-col relative border-r ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/144092840?v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div
            className={`absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full
            border-2 ${darkMode ? "border-gray-900" : "border-white"}`}
          />
        </div>
        <div className="transition-all duration-200 overflow-hidden">
          <h3 className="font-semibold text-sm">Swadhin Biswas</h3>
          <p
            className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Dev, Serendipia
          </p>
        </div>
        <button
          className={`ml-auto p-1.5 rounded-lg transition-colors
          ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          <Plus
            className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-700"}`}
          />
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
          ${darkMode ? "text-gray-500" : "text-gray-700"}`}
        />
        <input
          type="text"
          placeholder="Search"
          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border transition-colors
            ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
            }
            focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {[
          { icon: Home, label: "StudyZone", count: null },
          { icon: Briefcase, label: "Tasks", count: 32, active: true },
          { icon: Bell, label: "Notifications", count: 4 },
          { icon: Mail, label: "Messages", count: null },
        ].map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors
              ${
                item.active
                  ? darkMode
                    ? "bg-green-900/50 text-green-400"
                    : "bg-green-100 text-green-700"
                  : darkMode
                    ? "hover:bg-gray-800 active:bg-gray-700"
                    : "hover:bg-gray-100 active:bg-gray-200"
              }`}
          >
            <item.icon
              className={`w-6 h-6 flex-shrink-0 ${getIconColor(item.active)}`}
              strokeWidth={1.5}
            />
            <>
              <span className="flex-1">{item.label}</span>
              {item.count !== null && (
                <span
                  className={`px-2 py-1 text-xs rounded-full
                  ${
                    item.active
                      ? darkMode
                        ? "bg-green-900 text-green-300"
                        : "bg-green-200 text-green-800"
                      : darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </>
          </button>
        ))}
      </nav>

      {/* Agents Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center px-2 mb-3">
          <span
            className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Active Agents
          </span>
          <button
            className={`p-1.5 rounded-lg transition-colors
            ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <Eye
              className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-700"}`}
            />
          </button>
        </div>
        <div className="space-y-2">
          {[
            { name: "Vale", emoji: "🕵️‍♀️" },
            { name: "Cove", emoji: "👨‍💻" },
            { name: "Su Hua", emoji: "👩‍🎓" },
          ].map((team, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors cursor-pointer
                ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
              >
                {team.emoji}
              </div>
              <span className="text-sm">{team.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div
        className={`mt-6 p-3 rounded-lg border-2 border-dashed transition-colors cursor-pointer
        ${
          darkMode
            ? "border-gray-700 hover:border-gray-600 bg-gray-800/50"
            : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
        }`}
      >
        <p
          className={`text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Drag-n-Drop to Upload
        </p>
      </div>

      {/* Theme Toggle */}
      <div
        className={`flex gap-2 mt-6 p-1.5 rounded-lg
        ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <button
          onClick={() => setDarkMode(false)}
          className={`flex-1 p-1.5 rounded-md transition-colors
            ${!darkMode ? "bg-white shadow-sm" : "hover:bg-gray-700"}`}
        >
          <Sun
            className={`w-5 h-5 mx-auto ${!darkMode ? "text-yellow-500" : "text-gray-400"}`}
          />
        </button>
        <button
          onClick={() => setDarkMode(true)}
          className={`flex-1 p-1.5 rounded-md transition-colors
            ${darkMode ? "bg-gray-900 shadow-sm" : "hover:bg-gray-200"}`}
        >
          <Moon
            className={`w-5 h-5 mx-auto ${darkMode ? "text-blue-400" : "text-gray-500"}`}
          />
        </button>
      </div>
    </div>
  );
}
