// import { updateUserPassword } from '@/api/profile/updateUserPassword';
// import { updateUserProfile } from '@/api/profile/updateUserProfile';
// import { useToast } from '@/components/ui/use-toast';
// import { useEffect, useState } from 'react';

// export function EmailPasswordPhoneSetting(userId) {
//     const { toast } = useToast();
//     const { userDetails, setUserDetails } = useUser();
//     const [selectedEmail, setSelectedEmail] = useState(null);
//     const [selectedPassword, setSelectedPassword] = useState(null);
//     const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [open, setOpen] = useState(false);

//     console.log(userDetails);

//     useEffect(() => {
//         if (userDetails.email) {
//             setSelectedEmail(userDetails.email);
//         }
//     }, [userDetails.email]);

//     useEffect(() => {
//         if (userDetails.password) {
//             setSelectedPassword(userDetails.password);
//         }
//     }, [userDetails.password]);

//     useEffect(() => {
//         if (userDetails.mobile) {
//             setSelectedPhoneNumber(userDetails.mobile);
//         }
//     }, [userDetails.mobile]);

//     const handleEmailUpdate = async () => {
//         // console.log(selectedBio);
//         if (!/\S+@\S+\.\S+/.test(selectedEmail)) {
//             setSelectedEmail(userDetails.email);
//             toast({
//                 title: 'Error',
//                 description: 'Invalid email format.',
//                 status: 'error',
//                 variant: 'destructive',
//             });
//             return;
//         }

//         const Json = {
//             email: selectedEmail,
//         };
//         try {
//             const data = await updateUserProfile(userDetails._id, Json);
//             setUserDetails(data);
//             toast({
//                 title: 'Success!',
//                 description: 'Email updated successfully.',
//                 status: 'success',
//             });
//             // setOpen(false);
//         } catch (error) {
//             toast({
//                 title: 'Error',
//                 description: 'Failed to update Email.',
//                 status: 'error',
//                 variant: 'destructive',
//             });
//             // setOpen(false);
//         }
//     };

//     const handlePasswordUpdate = async () => {
//         if (newPassword !== confirmPassword) {
//             toast({
//                 title: 'Error',
//                 description: 'Passwords do not match.',
//                 status: 'error',
//                 variant: 'destructive',
//             });
//             return;
//         }

//         try {
//             const data = await updateUserPassword(userDetails._id, {
//                 oldPassword: currentPassword,
//                 newPassword: newPassword,
//             });
//             setUserDetails(data);
//             toast({
//                 title: 'Success!',
//                 description: 'Password updated successfully.',
//                 status: 'success',
//             });
//             setOpen(false);
//             setCurrentPassword('');
//             setNewPassword('');
//             setConfirmPassword('');
//         } catch (error) {
//             toast({
//                 title: 'Error',
//                 description: 'Failed to update password.',
//                 status: 'error',
//                 variant: 'destructive',
//             });
//         }
//     };

//     const handlePhoneNumberUpdate = async () => {
//         // console.log(selectedBio);
//         if (!/^\+?[0-9]{10,15}$/.test(selectedPhoneNumber)) {
//             setSelectedPhoneNumber(userDetails.mobile);
//             toast({
//                 title: 'Error',
//                 description: 'Invalid phone number format.',
//                 status: 'error',
//                 variant: 'destructive',
//             });
//             return;
//         }

//         const Json = {
//             mobile: selectedPhoneNumber,
//         };
//         try {
//             const data = await updateUserProfile(userDetails._id, Json);
//             setUserDetails(data);
//             toast({
//                 title: 'Success!',
//                 description: 'Phone Number updated successfully.',
//                 status: 'success',
//             });
//             // setOpen(false);
//         } catch (error) {
//             toast({
//                 title: 'Error',
//                 description: 'Failed to update Phone Number.',
//                 status: 'error',
//                 variant: 'destructive',
//             });
//             // setOpen(false);
//         }
//     };

//     return (
//         <div>
//             {/* <Dialog
//                 className="w-full"
//                 open={open}
//                 onOpenChange={setOpen}
//             >
//                 <DialogTrigger className="w-full ">
//                     <Card className=" mt-4 hover:bg-muted/70">
//                         <CardHeader className="justify-start items-start">
//                             <CardDescription>Email, Password & Phone Number</CardDescription>
//                         </CardHeader>
//                     </Card>
//                 </DialogTrigger>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Update Email, Password & Phone Number</DialogTitle>
//                         <DialogDescription>
//                             <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     type="email"
//                                     id="email"
//                                     value={selectedEmail}
//                                     onChange={(e) => setSelectedEmail(e.target.value)}
//                                 />
//                             </div>
//                             <Button
//                                 onClick={handleEmailUpdate}
//                                 className="mt-4 p-2"
//                             >
//                                 Update Email
//                             </Button>

//                             <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     type="password"
//                                     id="currentPassword"
//                                     placeholder="Current Password"
//                                     value={currentPassword}
//                                     onChange={(e) => setCurrentPassword(e.target.value)}
//                                 />
//                                 <Input
//                                     type="password"
//                                     id="newPassword"
//                                     placeholder="New Password"
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                 />
//                                 <Input
//                                     type="password"
//                                     id="confirmPassword"
//                                     placeholder="Confirm Password"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                 />
//                             </div>
//                             <Button
//                                 onClick={handlePasswordUpdate}
//                                 className="mt-4 p-2"
//                             >
//                                 Update Password
//                             </Button>

//                             <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
//                                 <Label htmlFor="mobile">Phone Number</Label>
//                                 <Input
//                                     type="mobile"
//                                     id="mobile"
//                                     value={selectedPhoneNumber}
//                                     onChange={(e) => setSelectedPhoneNumber(e.target.value)}
//                                 />
//                             </div>
//                             <Button
//                                 onClick={handlePhoneNumberUpdate}
//                                 className="mt-4 p-2 "
//                             >
//                                 Update Phone Number
//                             </Button>
//                         </DialogDescription>
//                     </DialogHeader>
//                 </DialogContent>
//             </Dialog> */}
//         </div>
//     );
// }
