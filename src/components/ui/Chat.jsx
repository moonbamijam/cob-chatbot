import React from "react";

const Chat = ({ message }) => {
  return (
    <p className=" rounded-full bg-gray-500 text-white px-5 py-2 my-1">
      {message}
    </p>
  );
};

export default Chat;
