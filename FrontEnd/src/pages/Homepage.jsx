// import React, { useState, useEffect } from "react";
// import ChatComponent from '../components/ChatComponent';
// import Sidebar from '../components/Sidebar';
// import { TerminalDemo } from '../components/Terminaldemo';
// import Sandbox from '../components/sandbox';

// const Homepage = () => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [chatWidth, setChatWidth] = useState(50);
//   const [rightPanelHeight, setRightPanelHeight] = useState(50);

//   const handleMouseDown = (e, direction) => {
//     e.preventDefault();
//     setIsDragging(direction);
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!isDragging) return;

//       if (isDragging === 'horizontal') {
//         const container = document.getElementById('main-container');
//         const percentage = (e.clientX / container.offsetWidth) * 100;
//         setChatWidth(Math.min(Math.max(percentage, 30), 70));
//       }

//       if (isDragging === 'vertical') {
//         const container = document.getElementById('right-panel');
//         const percentage = (e.clientY - container.offsetTop) / container.offsetHeight * 100;
//         setRightPanelHeight(Math.min(Math.max(percentage, 30), 70));
//       }
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//     };

//     if (isDragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging]);

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-900">
//       {/* Sidebar */}
//       <div className="w-64 flex-shrink-0 border-r border-gray-700 bg-gray-800 shadow-lg">
//         <Sidebar />
//       </div>

//       {/* Main container */}
//       <div id="main-container" className="flex flex-1 overflow-hidden">
//         {/* Chat section */}
//         <div
//           className="h-full overflow-auto bg-gray-900 transition-all duration-200"
//           style={{ width: `${chatWidth}%` }}
//         >
//           <div className="p-4">
//             <ChatComponent />
//           </div>
//         </div>

//         {/* Draggable border */}
//         <div
//           className={`w-1 cursor-col-resize transition-colors duration-200 hidden md:block
//             ${isDragging === 'horizontal' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-blue-500'}`}
//           onMouseDown={(e) => handleMouseDown(e, 'horizontal')}
//         />

//         {/* Right panel - Only visible on md and larger screens */}
//         <div
//           id="right-panel"
//           className="hidden md:flex flex-col flex-1 bg-gray-900"
//           style={{ width: `${100 - chatWidth}%` }}
//         >
//           {/* Terminal Demo */}
//           <div
//             className="overflow-auto transition-all duration-200 bg-gray-800 rounded-lg m-2"
//             style={{ height: `${rightPanelHeight}%` }}
//           >
//             <div className="p-4">
//               <TerminalDemo />
//             </div>
//           </div>

//           {/* Draggable border */}
//           <div
//             className={`h-1 cursor-row-resize transition-colors duration-200 mx-2
//               ${isDragging === 'vertical' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-blue-500'}`}
//             onMouseDown={(e) => handleMouseDown(e, 'vertical')}
//           />

//           {/* Sandbox */}
//           <div
//             className="overflow-auto transition-all duration-200 bg-gray-800 rounded-lg m-2"
//             style={{ height: `${100 - rightPanelHeight}%` }}
//           >
//             <div className="p-4">
//               <Sandbox />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Overlay when dragging */}
//       {isDragging && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 cursor-none" />
//       )}
//     </div>
//   );
// };

// export default Homepage;
import ChatComponent from "@/components/ChatComponent";
import Sidebar from "@/components/Sidebar";
import { TerminalDemo } from "@/components/Terminaldemo";
import Sandbox from "@/components/sandbox";
import React, { useEffect, useState } from "react";
import { Morph } from '../components/Morph';

const Homepage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [chatWidth, setChatWidth] = useState(50);
  const [rightPanelHeight, setRightPanelHeight] = useState(50);
  const [sidebarWidth, setSidebarWidth] = useState(256);

  const handleMouseDown = (e, direction) => {
    e.preventDefault();
    setIsDragging(direction);
  };

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 256 ? 0 : 256));
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      if (isDragging === "horizontal") {
        const container = document.getElementById("main-container");
        const percentage = (e.clientX / container.offsetWidth) * 100;
        setChatWidth(Math.min(Math.max(percentage, 30), 70));
      }

      if (isDragging === "vertical") {
        const container = document.getElementById("right-panel");
        const percentage =
          ((e.clientY - container.offsetTop) / container.offsetHeight) * 100;
        setRightPanelHeight(Math.min(Math.max(percentage, 30), 70));
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Collapsible Sidebar */}
      <div
        className={`flex-shrink-0 border-r border-gray-700 bg-gray-800 shadow-lg transition-all duration-300 ${
          sidebarWidth === 0 ? "w-0" : "w-64"
        }`}
      >
        <Sidebar
          toggleSidebar={toggleSidebar}
          isCollapsed={sidebarWidth === 0}
        />
      </div>

      {/* Main Content Area */}
      <div id="main-container" className="flex flex-1 overflow-hidden">
        {/* Chat Section - Always visible */}
        <div
          className="h-full overflow-auto bg-gray-900 transition-all duration-200"
          style={{
            width: sidebarWidth === 0 ? "100%" : `${chatWidth}%`,
            minWidth: sidebarWidth === 0 ? "100%" : "30%",
          }}
        >
          <div className="p-4">
            <ChatComponent />


          </div>


        </div>

        {/* Resizable Vertical Divider */}
        {sidebarWidth !== 0 && (
          <div
            className={`w-1 cursor-col-resize transition-colors duration-200 hidden md:block ${
              isDragging === "horizontal"
                ? "bg-blue-500"
                : "bg-gray-700 hover:bg-blue-500"
            }`}
            onMouseDown={(e) => handleMouseDown(e, "horizontal")}
          />
        )}

        {/* Right Panel Group */}
        {sidebarWidth !== 0 && (
          <div
            id="right-panel"
            className="hidden md:flex flex-col flex-1 bg-gray-900"
            style={{ width: `${100 - chatWidth}%` }}
          >
            {/* Terminal Section */}
            <div
              className="overflow-auto bg-gray-800 rounded-lg m-2 transition-all duration-200"
              style={{ height: `${rightPanelHeight}%` }}
            >
              <div className="p-4">
                <TerminalDemo />
              </div>
            <div className="p-4">
              <Morph />
              </div>
            </div>

            {/* Resizable Horizontal Divider */}
            <div
              className={`h-1 cursor-row-resize transition-colors duration-200 mx-2 ${
                isDragging === "vertical"
                  ? "bg-blue-500"
                  : "bg-gray-700 hover:bg-blue-500"
              }`}
              onMouseDown={(e) => handleMouseDown(e, "vertical")}
            />

            {/* Sandbox Section */}
            <div
              className="overflow-auto bg-gray-800 rounded-lg m-2 transition-all duration-200"
              style={{ height: `${100 - rightPanelHeight}%` }}
            >
              <div className="p-4">
                <Sandbox />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dragging Overlay */}
      {isDragging && (
        <div className="fixed inset-0 bg-black bg-opacity-30 cursor-none z-50" />
      )}
    </div>
  );
};

export default Homepage;
