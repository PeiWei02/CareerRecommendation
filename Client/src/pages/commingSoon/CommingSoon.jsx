import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from "../../assets/other/ComingSoon.json";

const CommingSoon = () => {
  return (
    <Card className="m-5 h-[85vh] ">
      <CardHeader className="items-center justify-center">
        {/* <CardTitle className="text-4xl">Job Page is Coming Soon</CardTitle> */}
        <Lottie
          animationData={animationData}
          style={{ width: "37%", height: "37%" }}
        />
        <p className="text-center text-sm text-muted-foreground">
          Take test know yourself!
        </p>
        <Link to="/survey">
          <Button>Go</Button>
        </Link>
      </CardHeader>
    </Card>
  );
};

export default CommingSoon;
