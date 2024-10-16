import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { holland6Asset } from "../asset";

export const Holland6InformationScreen = () => {
  return (
    <div className="">
      <Card className="m-5 h-[85vh]">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">
            Holland's Six Personality Types
          </CardTitle>
        </CardHeader>
        <CardFooter className="items-center justify-center flex-col">
          <CardDescription className="text-center w-[100vh]">
            Holland's Theory of Career Choice proposes that people work best in
            environments that match their preferences. This theory categorizes
            people and work environments into six types. Understanding these
            types can help individuals find careers that suit their personality,
            interests, and skills.
          </CardDescription>
          <Lottie
            animationData={holland6Asset.holland6Landing}
            style={{ width: "30%", height: "30%" }}
          />
          <Link to="/holland6/question">
            <Button>Take Test</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

