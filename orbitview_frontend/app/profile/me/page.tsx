"use client";

import React from "react";

const MyInfo = () => {
  const me = localStorage.getItem("current-ov-user");

  const user = me ? JSON.parse(me) : "Not found";

  console.log(user);

  return <>{user ? <div>Hello {user.user.first_name}</div> : <></>}</>;
};

export default MyInfo;
