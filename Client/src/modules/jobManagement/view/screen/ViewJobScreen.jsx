import { getAllJob } from '@/api/job/getAllJob';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { RoleContext } from '@/platform/role/entity/RoleContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { JobManagementViewJobCardDetails } from '../component/JobManagementViewJobCardDetails';
import { JobManagementViewJobCardItem } from '../component/JobManagementViewJobCardItem';

export function ViewJobScreen() {
    const { isAdmin } = useContext(RoleContext);

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
        <Screen>
            <div className="flex justify-between px-8">
                <div className="flex flex-col px-6">
                    <h2 className="text-2xl font-bold tracking-tight">View Job</h2>
                    <p className="text-muted-foreground">View new jobs here</p>
                </div>

                {isAdmin && (
                    <Link to="/jobManagement/createJob">
                        <Button variant="outline">Create New Job</Button>
                    </Link>
                )}
            </div>

            <Card className="my-5 mx-10 h-[75vh]">
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

                            <ScrollArea className="h-[58vh] w-full ">
                                {filteredJobs.map((job, index) => (
                                    <JobManagementViewJobCardItem
                                        key={index}
                                        job={job}
                                        onSelect={() => handleJobSelect(job)} // Add an onSelect prop to JobBriefCard
                                        isSelected={selectedJob === job} // Add an isSelected prop to JobBriefCard
                                    />
                                ))}
                            </ScrollArea>
                        </div>

                        <div className="col-span-8 ">
                            <ScrollArea className="w-full h-[68vh] overflow-y-auto">
                                <div className="pr-5">
                                    <CardTitle className="text-2xl mx-4 my-1">Job&apos;s Details</CardTitle>
                                </div>
                                {selectedJob && (
                                    <JobManagementViewJobCardDetails
                                        job={selectedJob}
                                        isAdmin={isAdmin}
                                    />
                                )}
                            </ScrollArea>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </Screen>
    );
}
