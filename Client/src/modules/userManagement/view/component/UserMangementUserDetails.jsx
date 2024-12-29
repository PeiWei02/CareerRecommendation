import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserManagementDeleteUserModal } from './UserManagementDeleteUserModal';
import { UserManagementEditUserModal } from './UserManagementEditUserModal';

export function UserManagementUserDetails(props) {
    const { open, onClose, item, refetch } = props;
    const { _id, name, mobile, email, role, profilePicture, city, country, bio, survey, createdAt, updatedAt } = item;

    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        View and manage the details of the selected user.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt={`${name}'s profile`}
                                className="w-16 h-16 rounded-full border"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                No Image
                            </div>
                        )}
                        <div>
                            <p className="text-lg font-semibold">{name}</p>
                            <p className="text-sm text-muted-foreground">{email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <DetailItem
                            label="Mobile"
                            value={mobile}
                        />
                        <DetailItem
                            label="Role"
                            value={role}
                        />
                        <DetailItem
                            label="City"
                            value={city}
                        />
                        <DetailItem
                            label="Country"
                            value={country}
                        />
                        <DetailItem
                            label="Bio"
                            value={bio || 'No bio available'}
                        />
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Survey Details </p>
                            <Link
                                to="/userManagement/individualAnalytics"
                                state={{ _id, name }}
                            >
                                <Button
                                    className="my-1"
                                    variant="outline"
                                >
                                    Summary
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                        <DetailItem
                            label="Created At"
                            value={new Date(createdAt).toLocaleString()}
                        />
                        <DetailItem
                            label="Updated At"
                            value={new Date(updatedAt).toLocaleString()}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6 flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(true)}
                    >
                        Edit
                    </Button>
                    {isEditDialogOpen && (
                        <UserManagementEditUserModal
                            userDetails={item}
                            open={isEditDialogOpen}
                            onClose={() => setIsEditDialogOpen(false)}
                            refetch={refetch}
                        />
                    )}

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

function DetailItem({ label, value }) {
    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-base text-foreground">{value}</p>
        </div>
    );
}

DetailItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

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
    }).isRequired,
    refetch: PropTypes.func.isRequired,
};
