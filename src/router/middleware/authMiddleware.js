const isLoggedIn = () => !!window.localStorage.getItem("logged-in")

const authMiddleware = async ({ /* to, from to,*/ redirect }) => {
  if (!isLoggedIn()) {
    redirect({
      name: "auth-required",
    });
  }
};

export default authMiddleware;
