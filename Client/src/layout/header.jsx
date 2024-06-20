import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const user = true;
  const isAdmin = false;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b backdrop-blur-lg transition-all flex">
      <div className="h-full w-full max-w-screen-xxl px-2.5 md:px-20">
        <div className="p-2 mx-auto flex h-14 items-center justify-between border-b">
          <Link to="/" className="flex z-40 font-semibold">
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Personalized<span className="text-purple-600">Career </span>
            </div>
          </Link>

          <div className="h-full flex item-center space-x-4s">
            {user ? (
              <>
                <Link to="/survey" className={buttonVariants({ size: "sm" })}>
                  Survey
                </Link>

                <Link
                  to="/job"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Job
                </Link>

                {/* <Link
                  to="/setting"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Setting
                </Link> */}

                <Link
                  to="/profile"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Profile
                </Link>

                {isAdmin ? (
                  <Link
                    to="/adminDashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "destructive",
                    })}
                  >
                    Dashboard
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign up
                </Link>

                <div className="h-8 w-px hidden sm:block">
                  <Link
                    to="/login"
                    className={buttonVariants({
                      size: "sm",
                    })}
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
