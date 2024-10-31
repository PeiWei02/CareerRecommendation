import { signUp } from '@/api/authentication/signUp';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { City, Country } from 'country-state-city';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { authenticationAsset } from '../asset';

export const SignUpScreen = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        countryCode: '',
        countryName: '',
        city: '',
        bio: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch and set countries on component mount
        const countryList = Country.getAllCountries().map((country) => ({
            label: country.name,
            value: country.isoCode,
        }));
        setCountries(countryList);
    }, []);

    useEffect(() => {
        // Fetch and set cities when countryCode changes
        if (formData.countryCode) {
            const cityList = City.getCitiesOfCountry(formData.countryCode).map((city) => ({
                label: city.name,
                value: city.name,
            }));
            setCities(cityList);
        } else {
            setCities([]);
            setFormData((prevData) => ({ ...prevData, city: '' }));
        }
    }, [formData.countryCode]);

    const handleCountryChange = (value) => {
        const selectedCountry = countries.find((country) => country.value === value);
        if (selectedCountry) {
            setFormData((prevData) => ({
                ...prevData,
                countryCode: selectedCountry.value,
                countryName: selectedCountry.label,
                city: '', // Reset city when country changes
            }));
        }
    };

    const handleCityChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            city: value,
        }));
        console.log(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
        if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Mobile number must be 10 digits';
        if (!formData.countryCode) newErrors.country = 'Country is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.bio) newErrors.bio = 'Bio is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const requestBody = {
                    name: formData.name,
                    mobile: formData.mobileNumber,
                    email: formData.email,
                    password: formData.password,
                    profilePicture: '',
                    city: formData.city,
                    country: formData.countryName,
                    bio: formData.bio,
                };

                const response = await signUp(requestBody);
                navigate('/login');
                toast({
                    title: 'Success!',
                    description: 'Account created successfully. Please login now',
                    status: 'success',
                });
            } catch (error) {
                console.error('Sign up error:', error);
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to sign up.',
                    status: 'error',
                    variant: 'destructive',
                });
            }
        }
    };

    return (
        <>
            <div className="container relative hidden h-[calc(100vh-3.5rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    to="/login"
                    className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
                >
                    Log in
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
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
                            animationData={authenticationAsset.signup}
                            style={{ width: '80%', height: '80%' }}
                        />
                    </div>
                    <div className="relative z-20 ">
                        <blockquote className="space-y-2">
                            <p className="text-lg">Knowing others is intelligence; knowing yourself is true wisdom.</p>
                            <footer className="text-sm">Lao Tzu</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your details below to create your account
                            </p>
                        </div>
                        <form
                            onSubmit={handleSignUp}
                            className="space-y-4 w-full"
                        >
                            <ScrollArea className="h-80 w-full ">
                                <div className="mb-4 p-1">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                </div>

                                <div className="mb-4 p-1">
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                </div>

                                <div className="mb-4 p-1">
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                                </div>

                                <div className="mb-4 p-1">
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && (
                                        <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                                    )}
                                </div>

                                <div className="mb-4 p-1">
                                    <Input
                                        type="text"
                                        name="mobileNumber"
                                        placeholder="Mobile Number"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                    />
                                    {errors.mobileNumber && (
                                        <span className="text-red-500 text-sm">{errors.mobileNumber}</span>
                                    )}
                                </div>

                                <div className="mb-4 p-1">
                                    <Input
                                        type="text"
                                        name="bio"
                                        placeholder="Bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                    {errors.bio && <span className="text-red-500 text-sm">{errors.bio}</span>}
                                </div>

                                <div className="mb-4 p-1">
                                    <Select onValueChange={handleCountryChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Country</SelectLabel>
                                                {countries.map((country) => (
                                                    <SelectItem
                                                        key={country.value}
                                                        value={country.value}
                                                    >
                                                        {country.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
                                </div>

                                <div className="mb-4 p-1">
                                    <Select onValueChange={handleCityChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>City</SelectLabel>
                                                {cities.map((city) => (
                                                    <SelectItem
                                                        key={city.value}
                                                        value={city.value}
                                                    >
                                                        {city.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                                </div>
                            </ScrollArea>
                            <Button
                                type="submit"
                                className="w-full"
                            >
                                Sign up
                            </Button>
                        </form>
                        <Link to="/login">
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                Already have an account? Log in here
                            </p>
                        </Link>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our&nbsp;
                            <Link
                                to="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>
                            &nbsp;and&nbsp;
                            <Link
                                to="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
