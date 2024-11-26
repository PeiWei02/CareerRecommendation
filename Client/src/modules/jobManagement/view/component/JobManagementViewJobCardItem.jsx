import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PropTypes from 'prop-types';

export function JobManagementViewJobCardItem(props) {
    const { job, onSelect, isSelected } = props;

    return (
        <Card
            className={`cursor-pointer ${isSelected ? 'bg-muted' : ''}`}
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
                        <CardDescription className="text-slate-100">{job.company}</CardDescription>
                        <CardDescription>{job.location}</CardDescription>
                        <CardDescription>{job.salaryRange}</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}

JobManagementViewJobCardItem.propTypes = {
    job: PropTypes.shape({
        picture: PropTypes.string.isRequired,
        jobName: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        salaryRange: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};
