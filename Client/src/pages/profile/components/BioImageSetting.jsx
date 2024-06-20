import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/api/profile/updateUserProfile";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/lib/context/UserContext";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BioImageSetting = () => {
  const { toast } = useToast();
  const { userDetails, setUserDetails } = useUser();
  const [selectedBio, setSelectedBio] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userDetails.bio) {
      setSelectedBio(userDetails.bio);
    }
  }, [userDetails.bio]);

  const handleUpdateProfile = async () => {
    // console.log(selectedBio);

    const Json = {
      bio: selectedBio,
    };
    try {
      const data = await updateUserProfile(userDetails._id, Json);
      setUserDetails(data);
      toast({
        title: "Success!",
        description: "Image or Bio updated successfully.",
        status: "success",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update Image or Bio.",
        status: "error",
        variant: "destructive",
      });
      setOpen(false);
    }
  };
  return (
    <div>
      <Dialog className="w-full" open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full ">
          <Card className=" mt-4 hover:bg-muted/70">
            <CardHeader className="justify-start items-start">
              <CardDescription>Bio</CardDescription>
            </CardHeader>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Bio</DialogTitle>
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
              <Button onClick={handleUpdateProfile} className="mt-4 p-2 ">
                Update Profile
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BioImageSetting;
