import { useState, useEffect } from "react";
import { Todolist } from "./todolist";
import { Kanban } from "./kanban";
import { Notetaking } from "./notetaking";
import Lottie from "lottie-react";
import Notebook from "../assets/notebook.json";
import { MenuButton } from "./buttons/menuButton";
import { UserButton, useUser } from "@clerk/clerk-react";
import { EmptyState } from "../components/emptyState";
import { DarkButton, LightButton } from "./buttons/themeButton";

const Cozy = () => {
  const [board, setBoard] = useState(null);
  const [theme, setTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useUser();

  const Boards = {
    Todolist: <Todolist />,
    Kanban: <Kanban />,
    Notetaking: <Notetaking />,
  };

  const HandleBoardSelect = (selectedBoard) => {
    setBoard(selectedBoard);
  };

  // Dark mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const HandleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
      <div className="w-full min-h-screen bg-white dark:bg-slate-900">
        <nav className="flex justify-center items-center">
          <div className="text-center">
            <Lottie animationData={Notebook} loop={true} className="w-24 mx-auto" />
            <p className="font-extrabold text-transparent lg:text-4xl md:text-3xl text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-600 text-center">
              Cozy
            </p>
          </div>

          <div className="flex justify-center items-center w-full h-full">
            <ul className="flex justify-between items-center">
              {Object.keys(Boards).map((boardName, index) => (
                <li key={index} onClick={() => HandleBoardSelect(boardName)}>
                  <MenuButton>{boardName}</MenuButton>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col justify-center items-center">
              <UserButton />
              {user && (
                <div className="text-center">
                  <p className="font-semibold text-slate-400">
                    Hi, {user.firstName} 🖐🏻
                  </p>
                </div>
              )}
            </div>
            <button onClick={HandleThemeSwitch}>
              {isDarkMode ? <LightButton /> : <DarkButton />}
            </button>
          </div>
        </nav>
        <div className="p-6 min-h-screen" >{board ? Boards[board] : <EmptyState />}</div>
      </div>
  );
};

export default Cozy;
