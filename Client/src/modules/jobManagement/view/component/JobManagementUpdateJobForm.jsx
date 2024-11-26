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
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { jobManagementFormFields } from '../../data/entity/jobManagementFormFields';
import { jobManagementFormSchema } from '../../data/entity/jobManagementFormSchema';
import { updateJob } from '../../data/source/updateJobService';

export function JobManagementUpdateJobForm({ job }) {
    const { _id: jobId } = job;
    const navigate = useNavigate();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRefs = useRef({});

    const form = useForm({
        resolver: zodResolver(jobManagementFormSchema),
        defaultValues: job,
    });

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            await updateJob(jobId, values);
            navigate('/job');

            form.reset();
            toast({
                title: 'Success!',
                description: 'Job update successfully!',
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
                                                                defaultValue={form.getValues('jobName')}
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
                                                                defaultValue={form.getValues('company')}
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
                                                                defaultValue={form.getValues('location')}
                                                                {...field}
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
                                                                defaultValue={form.getValues('contactEmail')}
                                                                {...field}
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
                                                                defaultValue={form.getValues('contactNumber')}
                                                                {...field}
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
                                                                        // defaultValue={form.getValues('jobDescription')}
                                                                        {...field}
                                                                        {...form.register('jobDescription')}
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
                                                                    defaultValue={form.getValues('salaryRange')}
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
                                                                checked={form.getValues('status')}
                                                                onCheckedChange={(value) =>
                                                                    form.setValue('status', value)
                                                                }
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
                                                                    defaultValue={form.getValues('experience')}
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
                                                                // defaultValue={form.getValues('qualification')}
                                                                {...field}
                                                                {...form.register('qualification')}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Select the updated experience level required for this job.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                {field.name === 'picture' && (
                                                    <FormItem>
                                                        <FormLabel>Picture URL</FormLabel>
                                                        <FormControl ref={(el) => (formRefs.current[field.name] = el)}>
                                                            <Input
                                                                placeholder="Enter URL for company logo or job image"
                                                                defaultValue={form.getValues('picture')}
                                                                {...field}
                                                                {...form.register('picture')}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Update the URL for the company logo or job-related image.
                                                            (optional).
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

JobManagementUpdateJobForm.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
};
