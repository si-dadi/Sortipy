import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {BsPersonCircle} from 'react-icons/bs'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Searchbar from "./Player/SearchBar";
const navigation = [
  //   { name: 'Dashboard', href: '#', current: true },
  //   { name: 'Team', href: '#', current: false },
  //   { name: 'Projects', href: '#', current: false },
  //   { name: 'Calendar', href: '#', current: false },
];

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({searchTerm, setSearchTerm, accessToken, setAccessToken, fetchAlbums, setAlbums, fetchTracks, setTracks}) {
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {({ open }) => (
        <>
          <div className="mx-auto ml-5 px-2 sm:px-6 lg:px-8 sticky top-0 z-[100]">
            <div className="relative flex h-18 items-center ">
              <div className=" items-center ld:left-10 sm:left-6 md:left-8">
                <img
                  // src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                  src="https://www.svgrepo.com/show/431292/spotify.svg"
                  className=" w-14 bg-green-500 rounded-full"
                />
              </div>

                <div className="relative items-center mx-auto">
                  <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} accessToken={accessToken} setAccessToken={setAccessToken} fetchAlbums={fetchAlbums} setAlbums={setAlbums} fetchTracks={fetchTracks} setTracks={setTracks}/>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 z-50">
                  <div>
                    <Menu.Button className="flex z-50 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 focus:ring-offset-gray-400">
                      <span className="sr-only">Open user menu</span>
                      <div className="right-0">
                        <img

                        // TODO: needs fix
                          className=" w-10 right-0 rounded-full"
                          src={localStorage.getItem("photoURL")}
                          // alt={<BsPersonCircle/>}
                        />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-center">
                      <Menu.Item>
                        {
                          <a
                            className={classNames(
                              "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {localStorage.getItem("displayName")}
                          </a>
                        }
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full items-center justify-center py-2 text-sm text-gray-700 inline-flex"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 "
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            &nbsp; Account Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full items-center justify-center inline-flex px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                              />
                            </svg>
                            &nbsp; Logout
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
