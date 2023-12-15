import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { IconContext } from "react-icons";

const DarkButton = () => {
  return (
    <button className="w-full h-full flex justify-center items-center gap-2 py-2 px-4 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-slate-200 rounded-3xl shadow-sm shadow-slate-300">
      <IconContext.Provider
        value={{ color: "yellow", className: "global-class-name" }}
      >
        <IoMoon />
      </IconContext.Provider>{" "}
      Dark
    </button>
  );
};

const LightButton = () => {
  return (
    <button className="w-full h-full flex justify-center items-center gap-2 p-2 px-4 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 text-slate-800 rounded-3xl shadow-sm shadow-slate-300">
      <IconContext.Provider
        value={{ color: "orange", className: "global-class-name" }}
      >
        <IoSunny />
      </IconContext.Provider>
      Light
    </button>
  );
};

export { DarkButton, LightButton };
