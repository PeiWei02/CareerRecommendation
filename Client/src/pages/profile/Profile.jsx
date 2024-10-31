import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import CountryCitySetting from "./components/CountryCitySetting";
// import BioImageSetting from "./components/BioImageSetting";
// import EmailPasswordPhoneSetting from "./components/EmailPasswordPhoneSetting";
import { signOut } from '@/api/authentication/signOut';
import { useAuth } from '@/modules/authentication/domain/useCase/useAuth';
import { RoleContext } from '@/platform/role/entity/RoleContext';

const Profile = () => {
    const { logOut } = useAuth();
    const { setIsAdmin } = useContext(RoleContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signOut();
            logOut();
            navigate('/login');
        } catch (error) {
            console.error('Error sign out', error);
        } finally {
            setIsAdmin(false);
            setIsLoading(false);
        }
    };

    return (
        <div className="p-5">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4">
                    <Card
                        className="h-[85vh]"
                        x-chunk="dashboard-05-chunk-0"
                    >
                        <CardHeader className="mb-2 mt-6">
                            <AspectRatio
                                ratio={1}
                                className="m-5"
                            >
                                <img
                                    src="https://i.pinimg.com/750x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
                                    alt="Profile picture"
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </AspectRatio>
                        </CardHeader>
                        <CardFooter className="flex-col items-start">
                            <CardTitle>name</CardTitle>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">bio</CardDescription>
                        </CardFooter>
                    </Card>
                </div>
                <div className="col-span-8">
                    <Card
                        className="h-[85vh]"
                        x-chunk="dashboard-05-chunk-0"
                    >
                        <CardHeader className="pb-3">
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>

                        <CardFooter className="flex-col ">
                            <div className="w-full h-full">
                                {/* <EmailPasswordPhoneSetting /> */}

                                {/* 
                <BioImageSetting />

                <CountryCitySetting /> */}

                                <Dialog className="w-full">
                                    <DialogTrigger className="w-full ">
                                        <Card className=" mt-4 hover:bg-muted/70">
                                            <CardHeader className="justify-start items-start">
                                                <CardDescription>Account Privacy</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader className="items-center">
                                            <DialogTitle>Account Privacy</DialogTitle>
                                            <DialogDescription className="text-justify">
                                                At Personalized Recommendation Tools System, we deeply value your
                                                privacy and are committed to protecting your personal information. Your
                                                account privacy settings are designed to give you control over how your
                                                data is collected, used, and shared. Here are the key aspects of account
                                                privacy: Profile Visibility: You have the option to control the
                                                visibility of your profile. Choose whether you want your profile to be
                                                public, visible to specific users, or completely private. Data
                                                Collection: We only collect the data necessary to provide you with
                                                personalized recommendations. Your data is securely stored and never
                                                shared with third parties without your consent. Opt-out Preferences: You
                                                have the right to opt out of certain data collection practices, such as
                                                tracking cookies or personalized advertisements. We respect your
                                                preferences and ensure that opting out does not affect your experience
                                                with our recommendation system. Data Security: We employ
                                                industry-standard security measures to protect your account information
                                                from unauthorized access, disclosure, alteration, or destruction. Your
                                                data is encrypted and stored securely on our servers. Transparency: We
                                                are transparent about our data collection practices and privacy
                                                policies. You can review our privacy policy to understand how your data
                                                is handled and what rights you have regarding your personal information.
                                                Data Deletion: Your privacy is our top priority. We are committed to
                                                maintaining the confidentiality and integrity of your personal
                                                information while providing you with the best possible personalized
                                                recommendation experience. If you have any questions or concerns about
                                                account privacy, please don't hesitate to contact our privacy team for
                                                assistance.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                                <Dialog className="w-full">
                                    <DialogTrigger className="w-full ">
                                        <Card className=" mt-4 hover:bg-muted/70">
                                            <CardHeader className="justify-start items-start">
                                                <CardDescription>About us</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader className="items-center">
                                            <DialogTitle>About Us</DialogTitle>
                                            <DialogDescription className="text-justify">
                                                Welcome to our Personalized Recommendation Tools System, developed by NG
                                                PEI WEI under the guidance of Dr. Liyana and in collaboration with
                                                Yougminds Malaysia. Our system is the result of a dynamic partnership
                                                between innovative minds and industry leaders, combining expertise in
                                                machine learning, data analytics, and personalized learning solutions.
                                                Driven by a commitment to delivering highly accurate and relevant
                                                recommendations, our system analyzes user data to offer tailored
                                                suggestions across various domains, from entertainment to education.
                                                With a focus on individual preferences and needs, our recommendation
                                                tools provide personalized guidance, empowering users to discover new
                                                experiences and make informed decisions. Join us as we revolutionize the
                                                way recommendations are made, one personalized suggestion at a time.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    onClick={handleSubmit}
                                    variant="destructive"
                                    size="sm"
                                    className="mt-5"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing Out...' : 'Sign Out'}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
