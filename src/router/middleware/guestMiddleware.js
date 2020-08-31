const isLoggedIn = () => !!window.localStorage.getItem("logged-in");

const guestMiddleware = async ({ /* to, from to,*/ redirect }) => {
  if (isLoggedIn()) {
    redirect({ name: "main" });
  }
};

export default guestMiddleware;
