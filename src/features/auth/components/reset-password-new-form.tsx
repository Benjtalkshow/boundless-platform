'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth';

const schema = z
  .object({
    password: z.string().min(8, 'Use at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Confirm your password.'),
  })
  .refine(values => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });
type Values = z.infer<typeof schema>;

interface ResetPasswordNewFormProps {
  /** Email the reset code was issued for. */
  email: string;
}

/** Sets a new password using a verified email reset code. */
export function ResetPasswordNewForm({ email }: ResetPasswordNewFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function onSubmit({ password }: Values) {
    const otpKey = `boundless:resetOtp:${email}`;
    const otp = sessionStorage.getItem(otpKey);
    if (!email || !otp) {
      toast.error('This reset link is incomplete. Request a new code.');
      router.push('/reset-password');
      return;
    }

    const { error } = await authClient.emailOtp.resetPassword({
      email,
      otp,
      password,
    });
    if (error) {
      toast.error(
        error.message ?? 'Could not reset your password. Request a new code.'
      );
      return;
    }

    sessionStorage.removeItem(otpKey);
    toast.success('Password updated. Sign in with your new password.');
    router.push('/sign-in');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-8'
      >
        <div className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field, fieldState }) => (
              <FormItem className='gap-2'>
                <FormLabel className='text-[#929f9c]'>New password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Enter a new password'
                    state={fieldState.error ? 'error' : undefined}
                    rightIcon={
                      <button
                        type='button'
                        onClick={() => setShowPassword(v => !v)}
                        className='transition-colors hover:text-white'
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className='size-5' />
                        ) : (
                          <Eye className='size-5' />
                        )}
                      </button>
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field, fieldState }) => (
              <FormItem className='gap-2'>
                <FormLabel className='text-[#929f9c]'>
                  Confirm new password
                </FormLabel>
                <FormControl>
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Re-enter your new password'
                    state={fieldState.error ? 'error' : undefined}
                    rightIcon={
                      <button
                        type='button'
                        onClick={() => setShowConfirm(v => !v)}
                        className='transition-colors hover:text-white'
                        aria-label={
                          showConfirm ? 'Hide password' : 'Show password'
                        }
                      >
                        {showConfirm ? (
                          <EyeOff className='size-5' />
                        ) : (
                          <Eye className='size-5' />
                        )}
                      </button>
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <Button
            type='submit'
            intent='primary'
            shape='pill'
            className='w-full'
            loading={form.formState.isSubmitting}
          >
            Reset Password
          </Button>
          <Button
            asChild
            intent='secondary'
            appearance='outline'
            shape='pill'
            className='w-full'
          >
            <Link href='/sign-in'>Back to Sign in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
