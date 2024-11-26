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
import { deleteJob } from '../../data/source/deleteJobService';

export function JobManagementDeleteJobModal(props) {
    const { jobId, open, onClose } = props;
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleJobDelete = async () => {
        try {
            await deleteJob(jobId);
            window.location.reload();
            navigate('/job');

            toast({
                title: 'Success!',
                description: 'Job deleted successfully!',
                status: 'success',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete job. Please try again.',
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
                        This action cannot be undone. This will permanently delete this job and remove from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onClose()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleJobDelete()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

JobManagementDeleteJobModal.propTypes = {
    jobId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
