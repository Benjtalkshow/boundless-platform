'use client';

import { Mail, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

const COLUMNS = [
  { label: 'Rounded · Large', shape: 'rounded', inputSize: 'large' },
  { label: 'Rounded · Small', shape: 'rounded', inputSize: 'small' },
  { label: 'Pill · Large', shape: 'pill', inputSize: 'large' },
  { label: 'Pill · Small', shape: 'pill', inputSize: 'small' },
] as const;

const ROWS = [
  { state: 'default', label: 'Default', props: { placeholder: 'Placeholder' } },
  { state: 'default', label: 'Filled', props: { defaultValue: 'Input' } },
  {
    state: 'success',
    label: 'Success',
    props: { defaultValue: 'Input', helperText: 'Looks good' },
  },
  {
    state: 'error',
    label: 'Error',
    props: { defaultValue: 'Input', helperText: 'Something is wrong' },
  },
  {
    state: 'default',
    label: 'Read only',
    props: { defaultValue: 'Input', readOnly: true },
  },
  {
    state: 'default',
    label: 'Disabled',
    props: { placeholder: 'Placeholder', disabled: true },
  },
] as const;

export default function InputPreview() {
  return (
    <main className='min-h-dvh bg-ink p-10'>
      <div className='mx-auto max-w-6xl'>
        <h1 className='mb-2 font-heading text-h4 font-bold text-white'>
          Input
        </h1>
        <p className='mb-10 text-body-sm text-[#929f9c]'>
          Type (Rounded / Pill) x Size (Large / Small) x State. Hover and focus
          (active / typing) are interactive; filled, success, error and
          read-only are shown below.
        </p>

        <div className='grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4'>
          {COLUMNS.map(col => (
            <div key={col.label} className='flex flex-col gap-6'>
              <h2 className='text-caption-sm text-[#72736f] uppercase'>
                {col.label}
              </h2>
              {ROWS.map(row => (
                <Input
                  key={`${col.label}-${row.label}`}
                  shape={col.shape}
                  inputSize={col.inputSize}
                  state={row.state}
                  label={row.label}
                  leftIcon={<Search className='size-5' />}
                  rightIcon={
                    row.state === 'default' ? (
                      <Mail className='size-5' />
                    ) : undefined
                  }
                  {...row.props}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
