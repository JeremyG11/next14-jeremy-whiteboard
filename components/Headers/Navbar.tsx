import React from "react";
import { MenuIcon } from "lucide-react";

import Logo from "../Logo";
import ShareButton from "./ShareButton";
import CreateButton from "./CreateButton";
import AuthUserAvatar from "./AuthUserAvatar";

export default function Navbar() {
  return (
    <header className="bg-white border-b p-2">
      <div className="mx-auto flex items-center px-4">
        <Logo />
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav className="hidden md:block"></nav>

          <div className="flex items-center gap-4">
            <CreateButton />
            <ShareButton />
            <AuthUserAvatar />

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
