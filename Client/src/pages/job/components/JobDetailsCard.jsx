import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const JobDetailsCard = ({ job }) => {
  return (
    <div>
      <CardHeader>
        <div className="flex items-center">
          <img
            src={job.picture}
            alt="Company logo"
            className="w-[6rem] h-[6rem] mr-4 object-cover"
          />
          <div>
            <CardTitle className="text-slate-100">{job.company}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="flex-col items-start">
        <CardTitle>{job.jobName}</CardTitle>
        <CardDescription className="mt-2">{job.location}</CardDescription>
        <CardDescription className="mt-2">Full Time</CardDescription>

        <CardDescription className="mt-4 text-xl text-white">
          {job.jobName}
        </CardDescription>
        <CardDescription className="mt-2 text-base text-slate-300">
          Job Description
        </CardDescription>
        <CardDescription className="mt-1 ">
          {job.jobDescription}
        </CardDescription>

        <CardDescription className="mt-2 text-slate-300">
          Job Qualitfication
        </CardDescription>
        <CardDescription className="mt-1 ">{job.qualification}</CardDescription>

        <CardDescription className="mt-4 text-slate-300">
          Salary
        </CardDescription>
        <CardDescription className=" ">{job.salaryRange}</CardDescription>

        <CardDescription className="text-xl mt-4 text-slate-300">
          Intrested? Contact the HR!
        </CardDescription>

        <CardDescription className="flex items-center mt-1">
          <Phone />
          <span className="ml-2">{job.contactNumber}</span>
        </CardDescription>

        <CardDescription className="flex items-center mt-1">
          <Mail />
          <span className="ml-2">{job.contactEmail}</span>
        </CardDescription>
      </CardFooter>
    </div>
  );
};

export default JobDetailsCard;
