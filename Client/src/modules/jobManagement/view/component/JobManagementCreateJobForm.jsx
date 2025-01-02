import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { jobManagementFormFields } from '../../data/entity/jobManagementFormFields';
import { jobManagementFormSchema } from '../../data/entity/jobManagementFormSchema';
import { addJob } from '../../data/source/addJobService';

export function JobManagementCreateJobForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const formRefs = useRef({});
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(jobManagementFormSchema),
        defaultValues: {
            jobName: '',
            company: '',
            location: '',
            contactEmail: '',
            contactNumber: '',
            jobDescription: '',
            salaryRange: '',
            status: true,
            experience: '',
            qualification: '',
            picture: '',
            image: null,
        },
    });

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const jobData = { ...values };
            const file = jobData.image?.[0] || null;
            delete jobData.image;

            await addJob(jobData, file);
            navigate('/job');

            form.reset();
            setPreviewImage(null);
            toast({
                title: 'Success!',
                description: 'Job added successfully!',
                status: 'success',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to add job. Please try again.',
                status: 'error',
                variant: 'destructive',
            });
            console.error('Error submitting job:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToField = (fieldName) => {
        const element = formRefs.current[fieldName];
        const scrollArea = document.querySelector('.scroll-area');

        if (element && scrollArea) {
            const elementRect = element.getBoundingClientRect();
            const scrollAreaRect = scrollArea.getBoundingClientRect();

            // Calculate the offset relative to the scroll area
            const elementTop = elementRect.top - scrollAreaRect.top + scrollArea.scrollTop;

            // Center the element within the scroll area
            const offset = scrollArea.clientHeight / 2 - elementRect.height / 2;

            scrollArea.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth',
            });

            element.focus();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            for (const field of jobManagementFormFields) {
                const element = formRefs.current[field.name];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex gap-4">
            <Card className="w-64 sticky over">
                <CardHeader>
                    <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <nav>
                        {jobManagementFormFields.map((field) => (
                            <Button
                                key={field.name}
                                variant="ghost"
                                className={`w-full justify-start`}
                                onClick={() => scrollToField(field.name)}
                            >
                                {field.label}
                            </Button>
                        ))}
                    </nav>
                </CardContent>
            </Card>

            <Card className="w-[75vw] h-[75vh]">
                <ScrollArea className="scroll-area h-full w-full">
                    <CardHeader>
                        <CardTitle>Create New Job</CardTitle>
                        <CardDescription>Fill out the form below to create a new job listing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                {jobManagementFormFields.map((field) => (
                                    <FormField
                                        key={field.name}
                                        control={form.control}
                                        name={field.name}
                                        render={() => (
                                            <FormItem>
                                                {field.name === 'jobName' && (
                                                    <FormItem>
                                                        <FormLabel>{field.label}</FormLabel>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Input
                                                                placeholder="e.g. Machine Learning Engineer"
                                                                {...form.register('jobName')}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Enter the title of the job position you are posting.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'company' && (
                                                    <FormItem>
                                                        <FormLabel>{field.label}</FormLabel>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Input
                                                                placeholder="e.g. Grab"
                                                                {...form.register('company')}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Specify the name of the hiring company.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'location' && (
                                                    <FormItem>
                                                        <FormLabel>Location</FormLabel>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Input
                                                                placeholder="e.g. Petaling Jaya, Selangor, Malaysia"
                                                                {...form.register('location')}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Provide the job location or office location.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'contactEmail' && (
                                                    <FormItem>
                                                        <FormLabel>Contact Email</FormLabel>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Input
                                                                type="email"
                                                                placeholder="e.g. workatgrab@grab.com"
                                                                {...form.register('contactEmail')}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Enter the email address for job applicants to contact.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'contactNumber' && (
                                                    <FormItem>
                                                        <FormLabel>Contact Number</FormLabel>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Input
                                                                placeholder="e.g. 03-899973524"
                                                                {...form.register('contactNumber')}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Provide a contact number for job-related inquiries.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'jobDescription' && (
                                                    <FormItem>
                                                        <FormLabel>Job Description</FormLabel>
                                                        <Controller
                                                            name="jobDescription"
                                                            control={form.control}
                                                            render={({ field }) => (
                                                                <FormControl
                                                                    ref={(el) => (formRefs.current[field.name] = el)}
                                                                >
                                                                    <Textarea
                                                                        placeholder="Enter job description"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            )}
                                                        />
                                                        <FormDescription>
                                                            Describe the main responsibilities and expectations of the
                                                            job role.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'salaryRange' && (
                                                    <FormItem>
                                                        <FormLabel>Salary Range</FormLabel>
                                                        <Controller
                                                            name="salaryRange"
                                                            control={form.control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    {...form.register('salaryRange')}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger
                                                                            ref={(el) =>
                                                                                (formRefs.current[field.name] = el)
                                                                            }
                                                                        >
                                                                            <SelectValue placeholder="Select salary range" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="Below RM3000">
                                                                            Below RM3000
                                                                        </SelectItem>
                                                                        <SelectItem value="RM3000 - RM5000">
                                                                            RM3000 - RM5000
                                                                        </SelectItem>
                                                                        <SelectItem value="Above RM5000">
                                                                            Above RM5000
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            )}
                                                        />
                                                        <FormDescription>
                                                            Specify the salary range for this job position.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'status' && (
                                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-base">Active Status</FormLabel>
                                                            <FormDescription>
                                                                Set whether this job listing is active or not.
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Switch
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                                {...form.register('status')}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                                {field.name === 'experience' && (
                                                    <FormItem>
                                                        <FormLabel>Experience</FormLabel>
                                                        <Controller
                                                            name="experience"
                                                            control={form.control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    {...form.register('experience')}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger
                                                                            ref={(el) =>
                                                                                (formRefs.current[field.name] = el)
                                                                            }
                                                                        >
                                                                            <SelectValue placeholder="Select experience level" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="Entry Level">
                                                                            Entry Level
                                                                        </SelectItem>
                                                                        <SelectItem value="Mid Level">
                                                                            Mid Level
                                                                        </SelectItem>
                                                                        <SelectItem value="Senior Level">
                                                                            Senior Level
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            )}
                                                        />
                                                        <FormDescription>
                                                            Choose the level of experience required for this job.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'qualification' && (
                                                    <FormItem>
                                                        <FormLabel>Qualification</FormLabel>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Textarea
                                                                placeholder="Enter required qualifications"
                                                                {...form.register('qualification')}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Specify the qualifications needed for applicants to be
                                                            considered.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'image' && (
                                                    <FormItem>
                                                        <FormLabel>Company Logo</FormLabel>
                                                        <FormControl>
                                                            <div className="flex items-center space-x-4">
                                                                <Input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => {
                                                                        form.setValue('image', e.target.files);
                                                                        handleImageChange(e);
                                                                    }}
                                                                    className="hidden"
                                                                    id="image-upload"
                                                                />
                                                                <label
                                                                    htmlFor="image-upload"
                                                                    className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                                                                >
                                                                    {previewImage ? (
                                                                        <img
                                                                            src={previewImage}
                                                                            alt="Preview"
                                                                            className="w-full h-full object-cover rounded-lg"
                                                                        />
                                                                    ) : (
                                                                        <ImagePlus className="w-8 h-8 text-gray-400" />
                                                                    )}
                                                                </label>
                                                                <div className="flex-1">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        onClick={() =>
                                                                            document
                                                                                .getElementById('image-upload')
                                                                                ?.click()
                                                                        }
                                                                        ref={(el) =>
                                                                            (formRefs.current[field.name] = el)
                                                                        }
                                                                    >
                                                                        Select Image
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                        <FormDescription>
                                                            Upload a profile picture (max 5MB, .jpg, .png, or .webp)
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                ))}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </ScrollArea>
            </Card>
        </div>
    );
}
