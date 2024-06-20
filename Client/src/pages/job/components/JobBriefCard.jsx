import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const JobBriefCard = ({ job, onSelect, isSelected }) => {
  return (
    <Card
      className={`cursor-pointer ${isSelected ? "bg-muted" : ""}`} 
      onClick={onSelect}
    >
      <CardHeader>
        <div className="flex items-center">
          <img
            src={job.picture}
            alt="Company logo"
            className="w-14 h-14 mr-4 object-cover"
          />
          <div>
            <CardTitle>{job.jobName}</CardTitle>
            <CardDescription className="text-slate-100">
              {job.company}
            </CardDescription>
            <CardDescription>{job.location}</CardDescription>
            <CardDescription>{job.salaryRange}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default JobBriefCard;
