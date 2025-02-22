import React from "react";

const GridLayout = () => {
  return (
    <div className="min-h-screen bg-blue-100 p-4 flex justify-center items-center">
      <div className="grid grid-cols-4 grid-rows-2 gap-4 w-full h-screen p-6">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1 row-span-2 flex flex-col justify-between">
         
        </div>
        {/* Chat Station */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2 row-span-2 flex flex-col justify-between">
          Chatting Station
        </div>
        {/* Top Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1 row-span-1 flex flex-col justify-center">
          Top Box
        </div>
        {/* Bottom Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1 row-span-1 flex flex-col justify-center">
          Bottom Box
        </div>
      </div>
    </div>
  );
};

export default GridLayout;
