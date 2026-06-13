'use client';

import { ArrowRight, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PillButton } from '@/components/layout/pill-button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { OptionCard } from '@/components/ui/option-card';

type Role = 'contributor' | 'organiser';

interface RoleOption {
  value: Role;
  title: string;
  description: string;
  /** 3D illustration shown in the leading tile. */
  icon: string;
}

const ROLES: RoleOption[] = [
  {
    value: 'contributor',
    title: 'Contributor (Explore & Earn)',
    description:
      'Apply/Participate in Bounties, Hackathons, Grants, Crowdfunding.',
    icon: '/illustrations/role-contributor.svg',
  },
  {
    value: 'organiser',
    title: 'Organiser (Create & Host)',
    description:
      'Launch/Host bounties, hackathons, grants and crowdfunding campaigns.',
    icon: '/illustrations/role-organiser.svg',
  },
];

interface LaunchAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Role gate shown when a visitor launches the app from the marketing header.
 * They pick how they want to explore Boundless (Contributor or Organiser),
 * then Continue lands them in the dashboard for that role. Full screen on
 * mobile, centered card on larger viewports. The choice is a starting point,
 * not a commitment, so it can be switched later in the app.
 */
export function LaunchAppModal({ open, onOpenChange }: LaunchAppModalProps) {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  function handleContinue() {
    if (!role) return;
    onOpenChange(false);
    router.push(`/dashboard?role=${role}`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='flex w-full max-w-[520px] flex-col items-center gap-8 rounded-[20px] border-neutral-700/50 bg-[#182120] p-6 shadow-[16px_16px_20px_0px_rgba(73,75,66,0.16)] max-sm:inset-0 max-sm:h-dvh max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:justify-start max-sm:overflow-y-auto max-sm:rounded-none max-sm:border-0 max-sm:px-4 max-sm:py-5'
      >
        <DialogClose
          aria-label='Close'
          className='absolute top-6 right-6 rounded-xs text-white opacity-80 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary-200'
        >
          <XIcon className='size-6' />
        </DialogClose>

        <div className='flex w-full flex-col items-start gap-4'>
          <Image
            src='/brand/Boundless-mark-card.svg'
            alt=''
            width={60}
            height={60}
            className='size-[60px]'
          />
          <div className='flex w-full flex-col gap-3'>
            <DialogTitle className='font-heading text-h5 font-semibold text-white'>
              Choose how you want to explore Boundless
            </DialogTitle>
            <DialogDescription className='text-body-sm text-secondary-50'>
              You can always switch later.
            </DialogDescription>
          </div>
        </div>

        <div
          role='radiogroup'
          aria-label='How you want to explore Boundless'
          className='flex w-full flex-col gap-3'
        >
          {ROLES.map(option => (
            <OptionCard
              key={option.value}
              title={option.title}
              description={option.description}
              selected={role === option.value}
              onClick={() => setRole(option.value)}
              icon={
                <Image
                  src={option.icon}
                  alt=''
                  width={40}
                  height={40}
                  className='size-10'
                />
              }
            />
          ))}
        </div>

        <PillButton
          type='button'
          size='large'
          className='w-full justify-center'
          disabled={!role}
          onClick={handleContinue}
        >
          Continue
          <ArrowRight className='size-5' />
        </PillButton>
      </DialogContent>
    </Dialog>
  );
}
