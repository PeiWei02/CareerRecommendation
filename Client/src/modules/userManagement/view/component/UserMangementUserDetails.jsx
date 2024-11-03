import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { UserManagementDeleteUserModal } from './UserManagementDeleteUserModal';

export function UserManagementUserDetails({ open, onClose, item }) {
    const { _id, name, mobile, email, role, profilePicture, city, country, bio, survey, createdAt, updatedAt, __v } =
        item;

    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>name: {name}</DialogDescription>
                    <DialogDescription>id: {_id}</DialogDescription>
                    <DialogDescription>mobile: {mobile}</DialogDescription>
                    <DialogDescription>email: {email}</DialogDescription>
                    <DialogDescription>role: {role}</DialogDescription>
                    <DialogDescription>
                        Profile Picture:{' '}
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt={`${name}'s profile`}
                                style={{ width: '50px', height: '50px' }}
                            />
                        ) : (
                            'No picture available'
                        )}
                    </DialogDescription>
                    <DialogDescription>city: {city}</DialogDescription>
                    <DialogDescription>country: {country}</DialogDescription>
                    <DialogDescription>bio: {bio}</DialogDescription>
                    <DialogDescription>survey completed: {survey ? 'Yes' : 'No'}</DialogDescription>
                    <DialogDescription>created at: {new Date(createdAt).toLocaleString()}</DialogDescription>
                    <DialogDescription>updated at: {new Date(updatedAt).toLocaleString()}</DialogDescription>
                    <DialogDescription>version: {__v}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Edit</Button>
                    <Button
                        variant="destructive"
                        onClick={() => setIsAlertDialogOpen(true)}
                    >
                        Delete
                    </Button>
                    {isAlertDialogOpen && (
                        <UserManagementDeleteUserModal
                            userId={_id}
                            open={isAlertDialogOpen}
                            onClose={() => setIsAlertDialogOpen(false)}
                        />
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

UserManagementUserDetails.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        mobile: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        profilePicture: PropTypes.string,
        city: PropTypes.string,
        country: PropTypes.string,
        bio: PropTypes.string,
        survey: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
    }).isRequired,
};
