import { login } from '@/api/authentication/login.js';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { checkAdminRole } from '@/modules/admin/data/source/checkAdminRoleService';
import { RoleContext } from '@/platform/role/entity/RoleContext';
import Lottie from 'lottie-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../domain/useCase/useAuth';
import { authenticationAsset } from '../asset';

export const LoginScreen = () => {
    const { setUserID } = useAuth();
    const { setIsAdmin } = useContext(RoleContext);

    const { toast } = useToast();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            try {
                const data = await login(formData.email, formData.password);
                const userId = data.User._id;
                setUserID(data.User._id);

                const isLoggedAdmin = await checkAdminRole(userId);
                setIsAdmin(isLoggedAdmin);

                navigate('/');
                toast({
                    title: 'Success!',
                    description: 'Log in successful',
                    status: 'success',
                });
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to login. Check your credentials',
                    status: 'error',
                    variant: 'destructive',
                });
                console.error('Error logging in', error);
                setErrors({ api: error.message });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <div className="container relative hidden h-[calc(100vh-3.5rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    to="/signup"
                    className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
                >
                    Sign Up
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900"></div>
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Personalized<span className="text-purple-600">Career </span>
                    </div>
                    <div className="flex justify-center items-center">
                        <Lottie
                            animationData={authenticationAsset.login}
                            style={{ width: '80%', height: '80%' }}
                        />
                    </div>
                    <div className="relative z-20 ">
                        <blockquote className="space-y-2">
                            <p className="text-lg">Knowing yourself is the beginning of all wisdom.</p>
                            <footer className="text-sm">Aristotle</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">Log in to your account</h1>
                            <p className="text-sm text-muted-foreground">Enter your email & password</p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <Input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                            <Input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </Button>
                        </form>
                        <Link to="/signup">
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                Don't have an account? Sign up here!
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
