'use client';

import { Briefcase, ChevronLeft, User, XIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Usage = 'contributor' | 'host';

const USE_CASES = [
  'Earn rewards',
  'Build projects',
  'Find funding',
  'Post opportunities',
  'Join hackathons',
  'Launch an idea',
  'Discover talent',
  'Grow a community',
] as const;

const SOURCES = [
  'X (formerly Twitter)',
  'LinkedIn',
  'A friend or colleague',
  'Search engine',
  'Other',
];

const DEFAULT_USE_CASES = ['Earn rewards', 'Join hackathons', 'Launch an idea'];

interface RoleGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: (values: {
    usage: Usage;
    source: string;
    useCases: string[];
  }) => void;
  onGoBack?: () => void;
}

/** Post-signup role + interests gate. */
export function RoleGateModal({
  open,
  onOpenChange,
  onContinue,
  onGoBack,
}: RoleGateModalProps) {
  const [usage, setUsage] = React.useState<Usage>('contributor');
  const [source, setSource] = React.useState(SOURCES[0]);
  const [useCases, setUseCases] = React.useState<string[]>(DEFAULT_USE_CASES);

  function toggleUseCase(value: string, checked: boolean) {
    setUseCases(prev =>
      checked ? [...prev, value] : prev.filter(v => v !== value)
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='flex w-full max-w-[720px] flex-col items-start gap-8 rounded-[20px] border-[#3a4a47] bg-[#182120] p-6 shadow-[16px_16px_20px_rgba(73,75,66,0.16)] max-sm:inset-0 max-sm:h-dvh max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:justify-start max-sm:overflow-y-auto max-sm:rounded-none max-sm:border-0 max-sm:bg-ink sm:p-8'
      >
        <DialogClose
          aria-label='Close'
          className='absolute top-6 right-6 rounded-xs text-white opacity-80 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary-200 sm:right-8'
        >
          <XIcon className='size-6' />
        </DialogClose>

        <div className='flex flex-col gap-1'>
          <DialogTitle className='font-heading text-h4 leading-[1.2] font-semibold text-white'>
            Complete Sign up
          </DialogTitle>
          <DialogDescription className='text-body-sm text-[#808080]'>
            You can change this later in settings
          </DialogDescription>
        </div>

        <div className='flex w-full flex-col gap-8'>
          {/* Usage */}
          <div className='flex flex-col gap-3'>
            <p className='text-body-sm font-medium text-[#c2d0cd]'>
              How are you planning to use Boundless?
            </p>
            <div className='flex gap-3'>
              <Button
                type='button'
                intent={usage === 'contributor' ? 'white' : 'secondary'}
                appearance={usage === 'contributor' ? 'solid' : 'outline'}
                shape='pill'
                size='small'
                className='flex-1 border-[#f1fff1]/20'
                aria-pressed={usage === 'contributor'}
                onClick={() => setUsage('contributor')}
              >
                <User className='size-5' />
                Contributor
              </Button>
              <Button
                type='button'
                intent={usage === 'host' ? 'white' : 'secondary'}
                appearance={usage === 'host' ? 'solid' : 'outline'}
                shape='pill'
                size='small'
                className='flex-1 border-[#f1fff1]/20'
                aria-pressed={usage === 'host'}
                onClick={() => setUsage('host')}
              >
                <Briefcase className='size-5' />
                Host/Organizer
              </Button>
            </div>
          </div>

          {/* Source */}
          <div className='flex flex-col gap-3'>
            <p className='text-body-sm font-medium text-[#c2d0cd]'>
              How did you hear about boundless?
            </p>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className='h-9 rounded-full border-[#2e3a38] px-4 text-[#f1fff1]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SOURCES.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Use cases */}
          <div className='flex flex-col gap-3'>
            <p className='text-body-sm font-medium text-[#c2d0cd]'>
              What do you want to use Boundless for?
            </p>
            <div className='grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2'>
              {USE_CASES.map(value => {
                const checked = useCases.includes(value);
                return (
                  <label
                    key={value}
                    className='flex cursor-pointer items-center gap-3'
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={next =>
                        toggleUseCase(value, next === true)
                      }
                      className='size-5 border-[1.5px] border-[#929f9c] bg-white data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500 data-[state=checked]:text-ink'
                    />
                    <span
                      className={
                        checked
                          ? 'text-body-sm text-[#f1fff1]'
                          : 'text-body-sm text-[#808080]'
                      }
                    >
                      {value}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className='flex w-full flex-col gap-4 border-t border-[#2e3a38] pt-8 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-body-xs text-[#808080] sm:max-w-[280px]'>
            Get a personalized Boundless experience from day one. You can switch
            roles anytime.
          </p>
          <div className='flex flex-col-reverse gap-3 sm:flex-row'>
            <Button
              type='button'
              intent='secondary'
              appearance='outline'
              shape='pill'
              size='small'
              className='w-full sm:w-auto'
              onClick={onGoBack}
            >
              <ChevronLeft className='size-5' />
              Go Back
            </Button>
            <Button
              type='button'
              intent='primary'
              shape='pill'
              size='small'
              className='w-full sm:w-auto'
              onClick={() => onContinue?.({ usage, source, useCases })}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
