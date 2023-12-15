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

  const HamburgerNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    return (
      <div className="font-sans">

      {/* Hamburger icon for mobile and iPad */}
      <div className="md:hidden lg:hidden">
        <button
          id="toggleBtn"
          className="text-white p-2 focus:outline-none"
          onMouseOver={toggleMenu}
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="gray"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Navigation menu */}
      <nav
        id="navMenu"
        onMouseLeave={toggleMenu}
        className={`justify-end items-center absolute bg-gray-200 top-0 dark:bg-slate-900 w-full h-36 px-8 ${isMenuOpen ? 'flex' : 'hidden'}`
      }
      >
        <div className="flex justify-between items-center w-full h-full z-100 text-white">
          <div>
            <ul className="flex flex-col justify-center items-center text-black dark:text-white font-bold">
              {Object.keys(Boards).map((boardName, index) => (
                <li key={index} onClick={() => HandleBoardSelect(boardName)}>
                  <button className='hover:text-blue-700 dark:hover:text-gray-600'>{boardName}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col px-4 justify-center items-center">
            <UserButton />
          </div>
          <div>
            <button onClick={HandleThemeSwitch}>
              {isDarkMode ? <LightButton /> : <DarkButton />}
            </button>
          </div>
        </div>
      </nav>
    </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-900">
        <HamburgerNav />
      <div className='hidden md:inline lg:inline'>
        <nav className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Lottie
              animationData={Notebook}
              loop={true}
              className="w-24 mx-auto"
            />
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
          </div>
          <div className="flex flex-col px-4 justify-center items-center">
            <UserButton />
          </div>
          <div>
            <button onClick={HandleThemeSwitch}>
              {isDarkMode ? <LightButton /> : <DarkButton />}
            </button>
          </div>
        </nav>
      </div>
      <div className="p-6 min-h-screen">
        {board ? Boards[board] : <EmptyState />}
      </div>
    </div>
  );
};

export default Cozy;
