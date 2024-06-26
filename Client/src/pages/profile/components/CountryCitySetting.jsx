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
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/context/UserContext";
import { City, Country } from "country-state-city";
import { useEffect, useState } from "react";
import { updateUserProfile } from "@/api/profile/updateUserProfile";
import { useToast } from "@/components/ui/use-toast";

const CountryCitySetting = () => {
  const { toast } = useToast();
  const { userDetails } = useUser();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch and set countries on component mount
    const countryList = Country.getAllCountries().map((country) => ({
      label: country.name,
      value: country.isoCode,
    }));
    setCountries(countryList);

    if (userDetails.country) {
      const country = countryList.find((c) => c.label === userDetails.country);
      if (country) setSelectedCountry(country);
    }
  }, [userDetails.country]);

  useEffect(() => {
    // Fetch and set cities when selectedCountry changes
    if (selectedCountry) {
      console.log(selectedCountry);

      const cityList = City.getCitiesOfCountry(selectedCountry.value).map(
        (city) => ({
          label: city.name,
          value: city.name,
        })
      );
      setCities(cityList);
      console.log("cityList", cityList);

      // Set default selected city if available in userDetails
      if (userDetails.city) {
        const city = cityList.find((c) => c.label === userDetails.city);
        if (city) setSelectedCity(city);
      }

      //   // Set default city to the first city in the list
      //   if (cityList.length > 0) {
      //     setSelectedCity(cityList[0]);
      //   } else {
      //     setSelectedCity(null);
      //   }
    } else {
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedCountry, userDetails.city]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);

    // Fetch cities of the selected country
    const cityList = City.getCitiesOfCountry(selectedOption.value).map(
      (city) => ({
        label: city.name,
        value: city.name,
      })
    );
    setCities(cityList);

    // Set the first city as selected
    if (cityList.length > 0) {
      setSelectedCity(cityList[0]);
    } else {
      setSelectedCity(null);
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleUpdateProfile = async () => {
    const Json = {
      country: selectedCountry?.label,
      city: selectedCity?.label,
    };
    try {
      const data = await updateUserProfile(userDetails._id, Json);
      toast({
        title: "Success!",
        description: "City or Country updated successfully.",
        status: "success",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update City or Country.",
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
              <CardDescription>City & Country</CardDescription>
            </CardHeader>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update City & Country</DialogTitle>
            <DialogDescription>
              <Select
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Select Country"
              />
              <Select
                options={cities}
                value={selectedCity}
                onChange={handleCityChange}
                placeholder="Select City"
                isDisabled={!selectedCountry}
              />
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

export default CountryCitySetting;
