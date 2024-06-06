import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Lottie from "lottie-react";
import ArtisticJson from "../../../../src/assets/Holland's 6/Artistic.json";
import ConventionalJson from "../../../../src/assets/Holland's 6/Conventional.json";
import EnterprisingJson from "../../../../src/assets/Holland's 6/Enterprising.json";
import InvestigativeJson from "../../../../src/assets/Holland's 6/Investigative.json";
import RealisticJson from "../../../../src/assets/Holland's 6/Realistic.json";
import SocialJson from "../../../../src/assets/Holland's 6/Social.json";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const resultMapping = {
  R: {
    animationData: RealisticJson,
    title: "Realistic",
    description:
      "Individuals with a Realistic personality type are practical, hands-on, and often enjoy working with tools, machines, and objects. They prefer physical activities that require skill, strength, and coordination.",
    characteristics:
      "They are often good at mechanical or athletic tasks, enjoy outdoor work, and like to work independently or with other realistic people.",
    careers: [
      "Engineer",
      "Carpenter",
      "Electrician",
      "Mechanic",
      "Pilot",
      "Other technical or trade professions",
    ],
  },
  I: {
    animationData: InvestigativeJson,
    title: "Investigative",
    description:
      "Investigative types are analytical, intellectual, and scientific. They enjoy researching, exploring, and understanding phenomena. They are curious and enjoy problem-solving.",
    characteristics:
      "They are often good at abstract thinking, enjoy working with data and ideas, and prefer working independently or with other investigative people.",
    careers: [
      "Scientist",
      "Researcher",
      "Doctor",
      "Computer Programmer",
      "Lab Technician",
      "Academic roles",
    ],
  },
  A: {
    animationData: ArtisticJson,
    title: "Artistic",
    description:
      "Artistic individuals are creative, expressive, and original. They enjoy working in unstructured environments where they can use their imagination and creativity to produce new things.",
    characteristics:
      "They are often good at artistic skills such as writing, drawing, acting, or music. They prefer tasks that involve creativity and self-expression.",
    careers: [
      "Artist",
      "Writer",
      "Musician",
      "Actor",
      "Graphic Designer",
      "Other creative professions",
    ],
  },
  S: {
    animationData: SocialJson,
    title: "Social",
    description:
      "Social types are friendly, understanding, and cooperative. They enjoy working with people and helping others. They are often found in environments where they can teach, heal, or support.",
    characteristics:
      "They are often good at communication, teaching, counseling, and providing care. They enjoy collaborative work and helping others develop.",
    careers: [
      "Teacher",
      "Counselor",
      "Nurse",
      "Social Worker",
      "Therapist",
      "Other service-oriented professions",
    ],
  },
  E: {
    animationData: EnterprisingJson,
    title: "Enterprising",
    description:
      "Enterprising individuals are energetic, ambitious, and sociable. They enjoy leading, persuading, and managing others to achieve organizational or financial goals.",
    characteristics:
      "They are often good at leadership, public speaking, and sales. They enjoy competitive environments and are motivated by goals and rewards.",
    careers: [
      "Manager",
      "Sales Executive",
      "Lawyer",
      "Entrepreneur",
      "Real Estate Agent",
      "Other business-oriented professions",
    ],
  },
  C: {
    animationData: ConventionalJson,
    title: "Conventional",
    description:
      "Conventional types are organized, detail-oriented, and efficient. They enjoy working with data, following procedures, and maintaining systems and records.",
    characteristics:
      "They are often good at administrative tasks, data management, and working within structured environments. They prefer work that involves routine and accuracy.",
    careers: [
      "Accountant",
      "Auditor",
      "Administrative Assistant",
      "Data Analyst",
      "Other clerical or administrative roles",
    ],
  },
};

const Result = ({ type }) => {
  const selectedResult = resultMapping[type] || resultMapping.S;

  return (
    <div className="flex items-center justify-center">
      <Card className="m-5 h-[85vh] w-[80vw]">
        <CardHeader>
          <CardTitle className="text-xl ml-5">
            Fresh Out of the Oven: Your Holland Code Results Are Here!
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-12 gap-5 h-[67vh] justify-center">
          <div className="col-span-5 flex justify-center items-center">
            <Lottie
              animationData={selectedResult.animationData}
              style={{ width: "95%", height: "95%" }}
            />
          </div>
          <div className="col-span-7">
            <CardFooter className="flex flex-col items-start m-5">
              <div className="py-2">
                <CardTitle className="text-3xl">
                  You are a {selectedResult.title}!
                </CardTitle>
                <CardDescription className="my-3">
                  {selectedResult.description}
                </CardDescription>
              </div>
              <div className="py-2">
                <CardTitle className="text-2xl">Characteristics</CardTitle>
                <CardDescription className="my-2">
                  {selectedResult.characteristics}
                </CardDescription>
              </div>
              <div className="py-2">
                <CardTitle className="text-2xl">Suitable Careers</CardTitle>
                <CardDescription className="my-2">
                  <ul className="list-disc pl-5">
                    {selectedResult.careers.map((profession, index) => (
                      <li key={index}>{profession}</li>
                    ))}
                  </ul>
                </CardDescription>
              </div>
            </CardFooter>
          </div>
        </div>
        <div className="flex items-end justify-end px-5">
          <Link to="/survey/question">
            <Button variant="outline" className="hover:bg-primary">
              Re-attempt
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Result;
