import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useImage } from '@/modules/profile/domain/useCase/useImage';
import PropTypes from 'prop-types';

export function JobManagementViewJobCardItem(props) {
    const { job, onSelect, isSelected } = props;
    const { data: image } = useImage(job.image);

    return (
        <Card
            className={`cursor-pointer ${isSelected ? 'bg-muted' : ''}`}
            onClick={onSelect}
        >
            <CardHeader>
                <div className="flex items-center">
                    {image ? (
                        <img
                            src={`data:image/${image.contentType};base64,${image.data}`}
                            alt={`${image}'s profile`}
                            className="w-14 h-14 mr-4 object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                            No Image
                        </div>
                    )}
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
        // picture: PropTypes.string.isRequired,
        image: PropTypes.string,
        jobName: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        salaryRange: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};
