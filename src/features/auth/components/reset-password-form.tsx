'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

const schema = z.object({ email: z.email('Enter a valid email address.') });
type Values = z.infer<typeof schema>;

/** Sends a password-reset code to the given email. */
export function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  async function onSubmit({ email }: Values) {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'forget-password',
    });
    if (error) {
      toast.error(error.message ?? 'Could not send a code. Try again.');
      return;
    }
    router.push(`/reset-password/verify?email=${encodeURIComponent(email)}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-8'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field, fieldState }) => (
            <FormItem className='gap-2'>
              <FormLabel className='text-[#929f9c]'>
                Your email address
              </FormLabel>
              <FormControl>
                <Input
                  type='email'
                  autoComplete='email'
                  placeholder='jamie@gmail.com'
                  rightIcon={<Mail className='size-5' />}
                  state={fieldState.error ? 'error' : undefined}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
