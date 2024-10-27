export const useLoggedUserId = () => {
  const userId = localStorage.getItem("userID");
  return userId;
};
