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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { updateUserProfile } from '@/modules/profile/data/source/updateUserProfile';
import { City, Country, State } from 'country-state-city';
import { MapPin } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export function LocationSetting({ userDetails, refetch }) {
    const { _id: userId, country: userCountry, state: userState, city: userCity } = userDetails;
    const { toast } = useToast();

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const countryList = Country.getAllCountries().map(({ name, isoCode }) => ({
            label: name,
            value: isoCode,
        }));
        setCountries(countryList);

        if (userCountry) {
            const matchedCountry = countryList.find(({ label }) => label === userCountry);
            setSelectedCountry(matchedCountry || null);
        }
    }, [userCountry]);

    useEffect(() => {
        if (selectedCountry) {
            const stateList = State.getStatesOfCountry(selectedCountry.value).map(({ name, isoCode }) => ({
                label: name,
                value: isoCode,
            }));
            setStates(stateList);

            if (userState) {
                const matchedState = stateList.find(({ label }) => label === userState);
                setSelectedState(matchedState || null);
            }
        } else {
            setStates([]);
            setSelectedState(null);
        }
    }, [selectedCountry, userState]);

    useEffect(() => {
        if (selectedState) {
            const cityList = City.getCitiesOfState(selectedCountry.value, selectedState.value).map(({ name }) => ({
                label: name,
                value: name,
            }));
            setCities(cityList);

            if (userCity) {
                const matchedCity = cityList.find(({ label }) => label === userCity);
                setSelectedCity(matchedCity || null);
            }
        } else {
            setCities([]);
            setSelectedCity(null);
        }
    }, [selectedState, selectedCountry, userCity]);

    const handleUpdateProfile = async () => {
        const profileData = {
            country: selectedCountry?.label,
            state: selectedState?.label,
            city: selectedCity?.label,
        };

        try {
            await updateUserProfile(userId, profileData);
            toast({
                title: 'Success!',
                description: 'Location updated successfully.',
                status: 'success',
            });
            refetch?.();
            setOpen(false);
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to update location.',
                status: 'error',
                variant: 'destructive',
            });
            setOpen(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger className="w-full">
                <Card className="mt-4 hover:bg-muted/70">
                    <CardHeader className="flex flex-row items-center justify-start space-x-4">
                        <MapPin className="h-8 w-8" />
                        <div className="flex flex-col justify-start">
                            <CardTitle className="flex justify-start text-base">City, State, and Country</CardTitle>
                            <CardDescription>Update your location information.</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Location</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="space-y-4">
                        <Select
                            value={selectedCountry?.value}
                            onValueChange={(value) => setSelectedCountry(countries.find((c) => c.value === value))}
                        >
                            <SelectTrigger id="country-select">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Country</SelectLabel>
                                    {countries.map(({ value, label }) => (
                                        <SelectItem
                                            key={value}
                                            value={value}
                                        >
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select
                            value={selectedState?.value}
                            onValueChange={(value) => setSelectedState(states.find((s) => s.value === value))}
                            disabled={!states.length}
                        >
                            <SelectTrigger id="state-select">
                                <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>State</SelectLabel>
                                    {states.map(({ value, label }) => (
                                        <SelectItem
                                            key={value}
                                            value={value}
                                        >
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select
                            value={selectedCity?.value}
                            onValueChange={(value) => setSelectedCity(cities.find((c) => c.value === value))}
                            disabled={!cities.length}
                        >
                            <SelectTrigger id="city-select">
                                <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>City</SelectLabel>
                                    {cities.map(({ value, label }) => (
                                        <SelectItem
                                            key={value}
                                            value={value}
                                        >
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button
                            onClick={handleUpdateProfile}
                            className="mt-4"
                        >
                            Update Profile
                        </Button>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

LocationSetting.propTypes = {
    userDetails: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        country: PropTypes.string,
        state: PropTypes.string,
        city: PropTypes.string,
    }).isRequired,
    refetch: PropTypes.func,
};
