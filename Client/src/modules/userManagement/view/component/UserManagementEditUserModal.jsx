import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { BioImageSetting } from '@/modules/profile/view/component/BioImageSetting';
import { CountryCitySetting } from '@/modules/profile/view/component/CountryCitySetting';
import { EmailPasswordPhoneSetting } from '@/modules/profile/view/component/EmailPasswordPhoneSetting';
import PropTypes from 'prop-types';

export function UserManagementEditUserModal(props) {
    const { userDetails, open, onClose, refetch } = props;

    return (
        <AlertDialog
            open={open}
            onOpenChange={onClose}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit User Details</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to update the user information? This action will modify the current client
                        details and may affect their account settings. Please procceed with caution.
                    </AlertDialogDescription>

                    <EmailPasswordPhoneSetting
                        userDetails={userDetails}
                        refetch={refetch}
                    />
                    <BioImageSetting
                        userDetails={userDetails}
                        refetch={refetch}
                    />
                    <CountryCitySetting
                        userDetails={userDetails}
                        refetch={refetch}
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onClose()}>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

UserManagementEditUserModal.propTypes = {
    userDetails: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string,
        phone: PropTypes.string,
        bioImage: PropTypes.string,
        country: PropTypes.string,
        city: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
};
