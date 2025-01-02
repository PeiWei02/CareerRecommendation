import * as z from 'zod';

export const jobManagementFormSchema = z.object({
    jobName: z.string().min(2, { message: 'Job name must be at least 2 characters.' }),
    company: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
    location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
    contactEmail: z.string().email({ message: 'Invalid email address.' }),
    contactNumber: z.string().min(8, { message: 'Contact number must be at least 8 characters.' }),
    jobDescription: z.string().min(10, { message: 'Job description must be at least 10 characters.' }),
    salaryRange: z.string().min(2, { message: 'Salary range must be at least 2 characters.' }),
    status: z.boolean(),
    experience: z.string().min(2, { message: 'Experience must be at least 2 characters.' }),
    qualification: z.string().min(10, { message: 'Qualification must be at least 10 characters.' }),
    image: z.union([
        z
            .instanceof(FileList, { message: 'Please upload an image.' })
            .refine((files) => files.length > 0, { message: 'Image is required.' })
            .refine((files) => files[0].size <= 5000000, { message: 'Max image size is 5MB.' })
            .refine((files) => ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type), {
                message: 'Only .jpg, .png, and .webp formats are supported.',
            }),
        z.string().optional(),
    ]),
});
