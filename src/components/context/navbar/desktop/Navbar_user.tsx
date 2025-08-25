import React from "react";
import Navbar_link from "../Navbar_link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";

const Navbar_user = () => {
  return (
    <div className="group relative">
      <div className="flex items-center gap-1 w-3 font-medium text-[1rem] cursor-pointer">
        <Avatar>
          <AvatarImage src={"/images/placeholder.png"} alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-8 w-fit min-w-20 -left-5 mt-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <ul className="flex flex-col gap-2 py-2 px-4 rounded-md">
          <Navbar_link
            link={{ id: "profile", label: "Profile", href: "/profile" }}
          />
        </ul>
      </div>
    </div>
  );
};

export default Navbar_user;
