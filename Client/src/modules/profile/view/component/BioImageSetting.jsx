import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { updateUserProfile } from '@/modules/profile/data/source/updateUserProfile';
import { Edit3 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function BioImageSetting({ userDetails, refetch }) {
    const [selectedBio, setSelectedBio] = useState(userDetails.bio);
    const { _id: userId } = userDetails;

    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleUpdateProfile = async () => {
        const Json = {
            bio: selectedBio,
        };
        try {
            await updateUserProfile(userId, Json);
            toast({
                title: 'Success!',
                description: 'Image or Bio updated successfully.',
                status: 'success',
            });
            refetch();
            setOpen(false);
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to update Image or Bio.',
                status: 'error',
                variant: 'destructive',
            });
            setOpen(false);
        }
    };
    return (
        <Dialog
            className="w-full"
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger className="w-full ">
                <Card className=" mt-4 hover:bg-muted/70">
                    <CardHeader className="flex flex-row items-center justify-start  space-x-4">
                        <Edit3 className="h-8 w-8" />
                        <div className="flex flex-col justify-start">
                            <CardTitle className="flex justify-start text-base">Bio</CardTitle>
                            <CardDescription>Craft the perfect bio that speaks for you!</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Your Bio</DialogTitle>
                    <DialogDescription>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="bio">Bio</Label>
                            <Input
                                type="bio"
                                id="bio"
                                value={selectedBio}
                                onChange={(e) => setSelectedBio(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleUpdateProfile}
                            className="mt-4 p-2 "
                        >
                            Update Profile
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

BioImageSetting.propTypes = {
    userDetails: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        bio: PropTypes.string,
    }).isRequired,
    refetch: PropTypes.func,
};
