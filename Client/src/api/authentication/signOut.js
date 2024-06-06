export const signOut = async () => {
  try {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Sign Out Failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
