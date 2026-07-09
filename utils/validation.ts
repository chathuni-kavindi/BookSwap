import { ExpoRoot } from 'expo-router';
import {z} from 'zod';

const UNIVERSITY_DOMAIN='@sjp.ac.lk';

export const registerSchema=z.object({
    fullName:z.string().min(2,'Name must be at least 2 characters'),
    email:z.string().email('Enter a valid email address')
    .refine((email)=>email.endsWith(UNIVERSITY_DOMAIN),{
        message:'Email must end with ${UNIVERSITY_DOMAIN}',
    }),
    password:z.string().min(8,'Password must be at least 8 characters')
    .regex(/[A-Z]/,'Password must contain an upercase letter')
    .regex(/[0-9]/,'Password must contain a number'),
    confirmPassword:z.string(),
})
.refine((data)=>data.password===data.confirmPassword,{
    message:"Password dont match",
    path:['confirmPassword']
});

export const loginSchema=z.object({
    emai:z.string().email('Enter your valid email'),
    password:z.string().min(1,'Password is required')
});

export const frogetPasswordSchema=z.object({
    email:z.string().email('Enter valid email password')
    .refine((email)=>email.endsWith(UNIVERSITY_DOMAIN),{
        message:'Email must end with ${UNIVERSITY_DOMAIN}',
    }),
});

export type RegisterFormData=z.infer<typeof registerSchema>;
export type LoginFormData=z.infer<typeof loginSchema>;
export type FrogetPasswordFormData=z.infer<typeof frogetPasswordSchema>;