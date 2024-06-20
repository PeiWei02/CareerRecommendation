export const signUp = async (data) => {
  const newUserData = data;
  try {
    const response = await fetch("http://localhost:3000/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    const responseData = await response.json();

    // Check if the response is not okay
    if (!response.ok) {
      throw new Error(responseData.message || "Sign Up failed");
    }

    return responseData;
  } catch (error) {
    console.error("Sign up error:", error.message || error);
    throw error;
  }
};
