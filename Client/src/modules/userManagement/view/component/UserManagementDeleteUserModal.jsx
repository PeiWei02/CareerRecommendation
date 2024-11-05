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
import { deleteUser } from '../../data/source/deleteUserService';

export function UserManagementDeleteUserModal({ userId, open, onClose }) {
    const { toast } = useToast();

    const handleDeleteUser = async () => {
        try {
            const response = await deleteUser(userId);
            if (response && response.status === 200) {
                toast({
                    title: 'Success!',
                    description: 'User delete successfully',
                    status: 'success',
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to delete. Please try again later',
                    status: 'error',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete. Please try again later',
                status: 'error',
                variant: 'destructive',
            });
            console.error('Failed to delete', error);
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
                        This action cannot be undone. This will permanently delete your account and remove your data
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onClose()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteUser()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

UserManagementDeleteUserModal.propTypes = {
    userId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
