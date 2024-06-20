import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import failLogInJson from "../../assets/authentication/failLogIn.json";
import { checkAuthStatus } from "./token.js";

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);
      console.log(authStatus);
    }
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return element;
  } else {
    return (
      <>
        <div className="flex justify-center items-center h-[90vh] w-[100vw]">
          <Card className="h-[65vh] w-[65vw] ">
            <CardHeader className="items-center my-5">
              <CardTitle className="text-3xl">
                Uh Oh! You Haven't log in!
              </CardTitle>
              <Lottie
                animationData={failLogInJson}
                style={{ width: "50%", height: "50%" }}
              ></Lottie>
              <Link to="/login">
                <Button className="items-center my-6 " size="lg">
                  Login
                </Button>
              </Link>
            </CardHeader>
          </Card>
        </div>
      </>
    );
  }
};
export default ProtectedRoute;
