'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { signIn } from '@/lib/auth';

import { AuthInput } from './auth-input';

const schema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});
type Values = z.infer<typeof schema>;

/** Email + password sign-in. */
export function SignInEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/dashboard';
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: Values) {
    const { error } = await signIn.email({
      email: values.email,
      password: values.password,
    });
    if (error) {
      toast.error(
        error.message ?? 'Could not sign in. Check your details and try again.'
      );
      return;
    }
    router.push(redirectTo);
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
            name='email'
            render={({ field }) => (
              <FormItem className='gap-2'>
                <FormLabel className='text-[#929f9c]'>Email</FormLabel>
                <FormControl>
                  <AuthInput
                    type='email'
                    autoComplete='email'
                    placeholder='jamie@gmail.com'
                    icon={<Mail className='size-5' />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='gap-2'>
                <div className='flex items-center justify-between'>
                  <FormLabel className='text-[#929f9c]'>Password</FormLabel>
                  <Link
                    href='/reset-password'
                    className='text-body-sm text-[#929f9c] transition-colors hover:text-white'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <AuthInput
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    trailing={
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
        </div>
        <div className='flex flex-col gap-3'>
          <Button
            type='submit'
            intent='primary'
            shape='pill'
            className='w-full'
            loading={form.formState.isSubmitting}
          >
            Log in
          </Button>
          <Button
            asChild
            intent='secondary'
            appearance='outline'
            shape='pill'
            className='w-full'
          >
            <Link href='/sign-in'>Go back</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
