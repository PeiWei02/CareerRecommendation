import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useImage } from '@/modules/profile/domain/useCase/useImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { jobManagementFormFields } from '../../data/entity/jobManagementFormFields';
import { jobManagementFormSchema } from '../../data/entity/jobManagementFormSchema';
import { updateJob } from '../../data/source/updateJobService';

export function JobManagementUpdateJobForm({ job }) {
    const { _id: jobId, image: jobImage } = job;
    const navigate = useNavigate();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: displayImage } = useImage(jobImage);
    const [previewImage, setPreviewImage] = useState(
        displayImage ? `data:image/${displayImage.contentType};base64,${displayImage.data}` : null,
    );

    const formRefs = useRef({});

    const form = useForm({
        resolver: zodResolver(jobManagementFormSchema),
        defaultValues: job,
    });

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            // Separate the `image` field and other job data
            const jobData = { ...values };
            let file = null;

            // Check if the `image` field is a File or an existing ObjectId string
            if (jobData.image instanceof FileList && jobData.image.length > 0) {
                file = jobData.image[0]; // Extract the File object from the FileList
            } else {
                delete jobData.image; // No image to handle
            }

            await updateJob(jobId, jobData, file);
            navigate('/job');

            form.reset();
            toast({
                title: 'Success!',
                description: 'Job updated successfully!',
                status: 'success',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update the job. Please try again.',
                status: 'error',
                variant: 'destructive',
            });
            console.error('Error updating the job:', error);
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

            const elementTop = elementRect.top - scrollAreaRect.top + scrollArea.scrollTop;

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
                        <CardTitle>Edit Job</CardTitle>
                        <CardDescription>Update the details below to modify the existing job listing.</CardDescription>
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
                                                            Update the title of the job position.
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
                                                            Update the name of the hiring company.
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
                                                            Update the job location or office address.
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
                                                            Update the email address for job applicants to contact.
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
                                                            Update the contact number for job-related inquiries.
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
                                                            Update the main responsibilities and expectations for this
                                                            role.
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
                                                            Select the updated salary range for this job position.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'status' && (
                                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-base">Active Status</FormLabel>
                                                            <FormDescription>
                                                                Toggle whether this job listing is active or archived.
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Switch
                                                                checked={form.watch('status')}
                                                                onCheckedChange={(value) =>
                                                                    form.setValue('status', value)
                                                                }
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
                                                            Select the updated experience level required for this job.
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
                                                            Update the qualifications needed for applicants to be
                                                            considered.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'image' && (
                                                    <FormItem>
                                                        <FormLabel>Profile Image</FormLabel>
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
                                                                        Upload Image
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                        <FormDescription>
                                                            Update the profile picture (max 5MB, .jpg, .png, or .webp)
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
                                    {isSubmitting ? 'Updating...' : 'Update Job'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </ScrollArea>
            </Card>
        </div>
    );
}

JobManagementUpdateJobForm.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        jobName: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        contactEmail: PropTypes.string.isRequired,
        contactNumber: PropTypes.string.isRequired,
        jobDescription: PropTypes.string.isRequired,
        salaryRange: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,
        experience: PropTypes.string.isRequired,
        qualification: PropTypes.string.isRequired,
        picture: PropTypes.string,
        image: PropTypes.string,
    }).isRequired,
};
