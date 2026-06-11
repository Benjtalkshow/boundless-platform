'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { AvatarUpload } from './avatar-upload';
import { CropPhotoModal } from './crop-photo-modal';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  bio: z.string().optional(),
  location: z.string().optional(),
});
export type ProfileSetupValues = z.infer<typeof schema>;

interface ProfileSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: ProfileSetupValues & { avatar: string | null }) => void;
  onChangeAccountType?: () => void;
}

/** Onboarding profile form with avatar upload + crop. */
export function ProfileSetupModal({
  open,
  onOpenChange,
  onSubmit,
  onChangeAccountType,
}: ProfileSetupModalProps) {
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [pendingImage, setPendingImage] = React.useState<string | null>(null);
  const [cropOpen, setCropOpen] = React.useState(false);

  const form = useForm<ProfileSetupValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { firstName: '', lastName: '', bio: '', location: '' },
  });

  function handleSelectFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
  }

  function submit(values: ProfileSetupValues) {
    onSubmit?.({ ...values, avatar });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className='flex w-full max-w-[464px] flex-col items-center gap-5 rounded-2xl border-[#3a4a47] bg-ink-soft px-6 py-10 shadow-[0px_3px_1px_rgba(46,237,170,0.06),0px_5px_1.5px_rgba(46,237,170,0.02)] max-sm:inset-0 max-sm:h-dvh max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:justify-start max-sm:overflow-y-auto max-sm:rounded-none max-sm:border-0 max-sm:bg-ink sm:px-8'
        >
          <DialogTitle className='font-heading text-h4 leading-[1.2] font-bold text-white'>
            Welcome to boundless!
          </DialogTitle>

          <AvatarUpload src={avatar} onSelectFile={handleSelectFile} />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className='flex w-full flex-col gap-8'
            >
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field, fieldState }) => (
                      <FormItem className='flex-1 gap-2'>
                        <FormLabel className='text-[#929f9c]'>
                          First name
                        </FormLabel>
                        <FormControl>
                          <Input
                            inputSize='small'
                            placeholder='Jamie'
                            state={fieldState.error ? 'error' : undefined}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field, fieldState }) => (
                      <FormItem className='flex-1 gap-2'>
                        <FormLabel className='text-[#929f9c]'>
                          Last name
                        </FormLabel>
                        <FormControl>
                          <Input
                            inputSize='small'
                            placeholder='Doe'
                            state={fieldState.error ? 'error' : undefined}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem className='gap-2'>
                      <FormLabel className='text-[#929f9c]'>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='What others should know about you...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem className='gap-2'>
                      <FormLabel className='text-[#929f9c]'>Location</FormLabel>
                      <FormControl>
                        <Input
                          inputSize='small'
                          placeholder='Lagos, Nigeria'
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
                  size='small'
                  className='w-full'
                  loading={form.formState.isSubmitting}
                >
                  Continue
                </Button>
                <Button
                  type='button'
                  intent='secondary'
                  appearance='outline'
                  shape='pill'
                  size='small'
                  className='w-full'
                  onClick={onChangeAccountType}
                >
                  <ChevronLeft className='size-5' />
                  Change account type
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <CropPhotoModal
        open={cropOpen}
        onOpenChange={setCropOpen}
        src={pendingImage}
        onSave={dataUrl => setAvatar(dataUrl)}
      />
    </>
  );
}
