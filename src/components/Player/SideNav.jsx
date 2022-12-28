import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { SlPlaylist } from "react-icons/sl";
import { VscHeart, VscLibrary } from "react-icons/vsc";
import { AiOutlineHome } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";

export default function SideNav({ navigator, setNavigator, setSearchTerm }) {
  const menus = [
    { name: "Home", icon: AiOutlineHome },
    { name: "Liked Songs", icon: VscHeart },
    { name: "Your Playlists", icon: VscLibrary },
    { name: "Top Charts", icon: SlPlaylist, margin: true },
    { name: "Recommendations", icon: RxPerson },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`absolute bg-[#0e0e0e] overflow-hidden   ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4 z-50`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="my-12 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <button
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 hover:text-yellow-300 rounded-md`}
            onClick={() => {
              setNavigator(menu.name);
              setSearchTerm("")
              // console.log(navigator);
            }}
          >
            <div>{React.createElement(menu?.icon, { size: "20" },)}</div>
            <h2
              style={{
                transitionDelay: `${i + 2}00ms`,
              }}
              className={`whitespace-pre duration-500 cursor-pointer ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}
