import { Button } from '@/components/ui/button';
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Mail, Phone } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { JobManagementDeleteJobModal } from './JobManagementDeleteJobModal';

export function JobManagementViewJobCardDetails(props) {
    const { job, isAdmin } = props;
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { toast } = useToast();

    const getStatusClass = (status) => (status ? 'bg-green-300 text-green-800' : 'bg-gray-300 text-gray-800');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Copied!',
            description: 'Content has been copied to clipboard.',
            status: 'success',
        });
    };

    return (
        <div>
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <img
                            src={job.picture}
                            alt="Company logo"
                            className="w-[6rem] h-[6rem] mr-4 object-cover"
                        />
                        <div className="flex gap-x-4">
                            <CardTitle className="text-slate-100">{job.company}</CardTitle>
                            <span
                                className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusClass(job.status)}`}
                            >
                                {job.status ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="flex gap-2">
                            <Link
                                to="/jobManagement/updateJob"
                                state={job}
                            >
                                <Button variant="outline">Update Job</Button>
                            </Link>
                            <Button
                                variant="destructive"
                                onClick={() => setIsDeleteDialogOpen(true)}
                            >
                                Delete
                            </Button>
                            {isDeleteDialogOpen && (
                                <JobManagementDeleteJobModal
                                    jobId={job._id}
                                    open={isDeleteDialogOpen}
                                    onClose={() => setIsDeleteDialogOpen(false)}
                                />
                            )}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start">
                <CardTitle>{job.jobName}</CardTitle>
                <CardDescription className="mt-2">{job.location}</CardDescription>
                <CardDescription className="mt-2">Full Time</CardDescription>
                <CardDescription className="mt-4 text-xl text-white">{job.jobName}</CardDescription>
                <CardDescription className="mt-2 text-base text-slate-300">Job Description</CardDescription>
                <CardDescription className="mt-1">{job.jobDescription}</CardDescription>
                <CardDescription className="mt-2 text-slate-300">Job Qualification</CardDescription>
                <CardDescription className="mt-1">{job.qualification}</CardDescription>
                <CardDescription className="mt-4 text-slate-300">Salary</CardDescription>
                <CardDescription className=" ">{job.salaryRange}</CardDescription>
                <CardDescription className="mt-4 text-slate-300">Experience </CardDescription>
                <CardDescription className=" ">{job.experience}</CardDescription>
                <CardDescription className="text-xl mt-4 text-slate-300">Intrested? Contact the HR!</CardDescription>
                <CardDescription className="flex items-center mt-1">
                    <a
                        href={`tel:${job.contactNumber}`}
                        className="flex items-center hover:underline"
                    >
                        <Phone />
                        <span className="ml-2">{job.contactNumber}</span>
                    </a>
                    <button
                        className="ml-4 text-slate-500 hover:text-slate-300"
                        onClick={() => copyToClipboard(job.contactNumber)}
                    >
                        <Copy size={16} />
                    </button>
                </CardDescription>
                <CardDescription className="flex items-center mt-1">
                    <a
                        href={`mailto:${job.contactEmail}`}
                        className="flex items-center hover:underline"
                    >
                        <Mail />
                        <span className="ml-2">{job.contactEmail}</span>
                    </a>
                    <button
                        className="ml-4 text-slate-500 hover:text-slate-300"
                        onClick={() => copyToClipboard(job.contactEmail)}
                    >
                        <Copy size={16} />
                    </button>
                </CardDescription>
            </CardFooter>
        </div>
    );
}

JobManagementViewJobCardDetails.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        jobName: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        jobDescription: PropTypes.string.isRequired,
        qualification: PropTypes.string.isRequired,
        salaryRange: PropTypes.string.isRequired,
        contactNumber: PropTypes.string.isRequired,
        contactEmail: PropTypes.string.isRequired,
        experience: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
};
