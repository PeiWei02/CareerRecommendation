import { signOut } from "@/api/authentication/signOut.js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await signOut();
      console.log("Signout successful", data);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <Card className="h-[85vh]" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="mb-2 mt-6">
              <AspectRatio ratio={1} className="m-5">
                <img
                  src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile picture"
                  className="object-cover w-full h-full rounded-full"
                />
              </AspectRatio>
            </CardHeader>
            <CardFooter className="flex-col items-start">
              <CardTitle>Pei Wei</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                rerum aut odit quas cupiditate nisi id facilis ad doloribus eos
                nulla, dolores ut possimus consequatur ipsa saepe tenetur ab
                quod.
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-8">
          <Card className="h-[85vh]" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Settings</CardTitle>
            </CardHeader>

            <CardFooter className="flex-col ">
              <div className="w-full h-full">
                <Card className="w-[] mt-4 hover:bg-muted/70">
                  <CardHeader className="">
                    <CardDescription>
                      Email, Password & Phone Number
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="w-full mt-4 hover:bg-muted/70">
                  <CardHeader className="">
                    <CardDescription>Image and Bio</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="w-full mt-4 hover:bg-muted/70">
                  <CardHeader className="">
                    <CardDescription>City & Country</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="w-full mt-4 hover:bg-muted/70">
                  <CardHeader className="">
                    <CardDescription>Account</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="w-full mt-4 hover:bg-muted/70">
                  <CardHeader className="">
                    <CardDescription>About us</CardDescription>
                  </CardHeader>
                </Card>

                <Button
                  onClick={handleSubmit}
                  variant="destructive"
                  size="sm"
                  className="mt-5"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing Out..." : "Sign Out"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
