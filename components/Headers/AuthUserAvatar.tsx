import Image from "next/image";
import React from "react";

export default function AuthUserAvatar() {
  return (
    <div className="relative w-8 h-8">
      <Image
        className="object-cover w-8 h-8 rounded-full"
        src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100"
        alt=""
        fill
      />
    </div>
  );
}
