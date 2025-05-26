import { ModeToggle } from "../mode-toggle";

const NavBar = () => {
  return (
    <nav className=" border-gray-200 ">
      <div className="max-w-screen-xl flex justify-center text-center space-x-1 items-center mx-auto p-4">
        <img src="/dev.png" className="pt-1" alt="Flowbite Logo" />
        <p className="text-2xl font-bold whitespace-nowrap dark:text-white">
          DevMatch
        </p>
        <div className="mx-3">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
