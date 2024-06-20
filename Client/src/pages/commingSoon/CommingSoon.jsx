import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from "../../assets/other/ComingSoon.json";

const CommingSoon = () => {
  return (
    <div>
      <Card className="m-5 h-[85vh]">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Job Page is Coming Soon</CardTitle>
          <Lottie
            animationData={animationData}
            style={{ width: "37%", height: "37%" }}
          />
          <Link to="/survey">
            <p className="text-center text-sm text-muted-foreground">
              Take test know yourself!
            </p>
          </Link>
          <Link to="/survey">
            <Button>Test</Button>
          </Link>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CommingSoon;
