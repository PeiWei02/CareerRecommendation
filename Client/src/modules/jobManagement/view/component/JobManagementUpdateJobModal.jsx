import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateJob } from '../../data/source/updateJobService';

export function JobManagementUpdateJobModal(props) {
    const { jobDetails, open, onClose } = props;
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleJobUpdate = async () => {
        try {
            await updateJob(jobDetails);
            window.location.reload();
            navigate('/job');

            toast({
                title: 'Success!',
                description: 'Job Update successfully!',
                status: 'success',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update job. Please try again.',
                status: 'error',
                variant: 'destructive',
            });
            console.error('Error deleting job:', error);
        }
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={onClose}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will update the job details.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onClose()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleJobUpdate()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

JobManagementUpdateJobModal.propTypes = {
    jobDetails: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
