import { getAllJob } from '@/api/job/getAllJob';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import JobBriefCard from './components/JobBriefCard';
import JobDetailsCard from './components/JobDetailsCard';

const Job = () => {
    const [allJob, setAllJob] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const Jobs = await getAllJob();
                setAllJob(Jobs.data);

                setSelectedJob(Jobs.data[0]);
            } catch (error) {
                console.error(error);
                setAllJob([]);
            }
        };
        fetchJobs();
    }, []);

    const handleJobSelect = (job) => {
        setSelectedJob(job);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredJobs = searchQuery
        ? allJob.filter((job) => {
              return job.jobName?.toLowerCase().includes(searchQuery.toLowerCase());
          })
        : allJob;

    return (
        <div>
            <Card className="m-5 h-[85vh]">
                <CardHeader>
                    <div className="grid grid-cols-12">
                        <div className="col-span-4  justify-center border-r">
                            <CardTitle className="text-2xl mx-2 my-1">Jobs </CardTitle>

                            <div className="flex p-2">
                                <Input
                                    placeholder="Search Job"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                ></Input>
                            </div>

                            <ScrollArea className="h-[68vh] w-full ">
                                {filteredJobs.map((job, index) => (
                                    <JobBriefCard
                                        key={index}
                                        job={job}
                                        onSelect={() => handleJobSelect(job)} // Add an onSelect prop to JobBriefCard
                                        isSelected={selectedJob === job} // Add an isSelected prop to JobBriefCard
                                    />
                                ))}
                            </ScrollArea>
                        </div>

                        <div className="col-span-8 ">
                            <ScrollArea className="w-full h-[75vh] overflow-y-auto">
                                <CardTitle className="text-2xl mx-4 my-1">Job's Details</CardTitle>
                                {selectedJob && <JobDetailsCard job={selectedJob} />}
                            </ScrollArea>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};

export default Job;
