import axios from "axios";

import React from "react";

export const updateUserPassword = async (Userid, Json) => {
  const id = Userid;
  console.log(Userid);
  console.log(Json);

  try {
    const response = await axios.put(
      `http://localhost:3000/profile/${id}/updatePassword`,
      Json,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
