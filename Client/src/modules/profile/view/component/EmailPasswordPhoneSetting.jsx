import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { updateUserPassword } from '@/modules/profile/data/source/updateUserPassword';
import { updateUserProfile } from '@/modules/profile/data/source/updateUserProfile';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function EmailPasswordPhoneSetting({ userDetails, refetch }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const { _id: userId } = userDetails;

    //MARK: render
    const renderEmailSection = () => {
        const [selectedEmail, setSelectedEmail] = useState(userDetails.email);

        const handleEmailUpdate = async () => {
            if (!/\S+@\S+\.\S+/.test(selectedEmail)) {
                setSelectedEmail(userDetails.email);
                toast({
                    title: 'Error',
                    description: 'Invalid email format.',
                    status: 'error',
                    variant: 'destructive',
                });
                return;
            }

            const Json = {
                email: selectedEmail,
            };

            try {
                await updateUserProfile(userId, Json);
                toast({
                    title: 'Success!',
                    description: 'Email updated successfully.',
                    status: 'success',
                });
                setOpen(false);
                refetch();
            } catch {
                toast({
                    title: 'Error',
                    description: 'Failed to update Email.',
                    status: 'error',
                    variant: 'destructive',
                });
                setOpen(false);
            }
        };

        return (
            <>
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        value={selectedEmail}
                        onChange={(e) => setSelectedEmail(e.target.value)}
                    />
                </div>
                <Button
                    onClick={handleEmailUpdate}
                    className="mt-4 p-2"
                >
                    Update Email
                </Button>
            </>
        );
    };

    const renderPasswordSection = () => {
        const [currentPassword, setCurrentPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

        const handlePasswordUpdate = async () => {
            if (newPassword !== confirmPassword) {
                toast({
                    title: 'Error',
                    description: 'Passwords do not match.',
                    status: 'error',
                    variant: 'destructive',
                });
                return;
            }

            try {
                await updateUserPassword(userId, {
                    oldPassword: currentPassword,
                    newPassword: newPassword,
                });
                toast({
                    title: 'Success!',
                    description: 'Password updated successfully.',
                    status: 'success',
                });
                setOpen(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } catch {
                toast({
                    title: 'Error',
                    description: 'Failed to update password.',
                    status: 'error',
                    variant: 'destructive',
                });
            }
        };

        return (
            <>
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="currentPassword"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <Button
                    onClick={handlePasswordUpdate}
                    className="mt-4 p-2"
                >
                    Update Password
                </Button>
            </>
        );
    };

    const renderPhoneNumberSection = () => {
        const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(userDetails.mobile);

        const handlePhoneNumberUpdate = async () => {
            if (!/^\+?[0-9]{10,15}$/.test(selectedPhoneNumber)) {
                setSelectedPhoneNumber(userDetails.mobile);
                toast({
                    title: 'Error',
                    description: 'Invalid phone number format.',
                    status: 'error',
                    variant: 'destructive',
                });
                return;
            }

            const Json = {
                mobile: selectedPhoneNumber,
            };
            try {
                updateUserProfile(userId, Json);
                toast({
                    title: 'Success!',
                    description: 'Phone Number updated successfully.',
                    status: 'success',
                });
                setOpen(false);
            } catch {
                toast({
                    title: 'Error',
                    description: 'Failed to update Phone Number.',
                    status: 'error',
                    variant: 'destructive',
                });
                setOpen(false);
            }
        };
        return (
            <>
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
                    <Label htmlFor="mobile">Phone Number</Label>
                    <Input
                        type="mobile"
                        id="mobile"
                        value={selectedPhoneNumber}
                        onChange={(e) => setSelectedPhoneNumber(e.target.value)}
                    />
                </div>
                <Button
                    onClick={handlePhoneNumberUpdate}
                    className="mt-4 p-2 "
                >
                    Update Phone Number
                </Button>
            </>
        );
    };

    return (
        <Dialog
            className="w-full"
            onOpenChange={setOpen}
            open={open}
        >
            <DialogTrigger className="w-full ">
                <Card className=" mt-4 hover:bg-muted/70">
                    <CardHeader className="justify-start items-start">
                        <CardDescription>Email, Password & Phone Number</CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Email, Password & Phone Number</DialogTitle>
                    <DialogDescription>
                        {renderEmailSection()}
                        {renderPasswordSection()}
                        {renderPhoneNumberSection()}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

EmailPasswordPhoneSetting.propTypes = {
    userDetails: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        mobile: PropTypes.string.isRequired,
    }).isRequired,
    refetch: PropTypes.func,
};
