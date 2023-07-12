//---------------------------FOOTER-----------------------------

import React from "react";
import { useNavigate } from "react-router-dom";

function Pagenot() {
  const navigate = useNavigate();
  const goback = () => {

    navigate(-1);
  }

  return (
    <div>

      <main class="h-screen w-full flex flex-col justify-center items-center bg-gray-200">
        <h1 class="text-9xl font-extrabold text-black tracking-widest">404</h1>
        <div class="bg-blue-500 px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md"
          onClick={goback}
        >
          Go Home
        </button>
      </main>
    </div>
  );
}

export default Pagenot;
