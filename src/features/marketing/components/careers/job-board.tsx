'use client';

import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Section } from '../section';
import { type Job, JOB_FILTERS, type JobFilterKey, JOBS } from './careers-data';

type Filters = Record<JobFilterKey, string>;

const ALL: Filters = {
  location: 'all',
  locationType: 'all',
  department: 'all',
  employmentType: 'all',
};

function OptionPill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'w-full rounded-full px-5 py-2 text-left text-xs font-semibold tracking-[0.5px] transition-colors',
        active
          ? 'bg-white text-[#1c1e13]'
          : 'border border-white/20 text-white hover:bg-white/5'
      )}
    >
      {children}
    </button>
  );
}

/** Accordion filter group: a toggle header over a list of single-select pills. */
function FilterGroup({
  label,
  allLabel,
  options,
  value,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  allLabel: string;
  options: string[];
  value: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <div className='border-b border-white/20 last:border-b-0'>
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={open}
        className='flex w-full items-center justify-between px-[18px] py-5'
      >
        <span className='font-heading text-lg font-semibold tracking-[-0.8px] text-white'>
          {label}
        </span>
        <ChevronDown
          className={cn(
            'size-5 shrink-0 text-white transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open ? (
        <div className='flex flex-col gap-2 px-[18px] pb-5'>
          <OptionPill active={value === 'all'} onClick={() => onSelect('all')}>
            {allLabel}
          </OptionPill>
          {options.map(option => (
            <OptionPill
              key={option}
              active={value === option}
              onClick={() => onSelect(option)}
            >
              {option}
            </OptionPill>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function JobSummary({ job }: { job: Job }) {
  const city = job.location.split(',')[0];

  return (
    <div className='flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-ink px-5 py-5 lg:px-8 lg:py-6'>
      <div className='flex min-w-0 flex-col gap-2'>
        <h3 className='font-heading text-xl font-semibold tracking-[-0.4px] text-[#dadada]'>
          {job.title}
        </h3>
        <p className='flex flex-wrap gap-1 text-sm font-medium text-[#67696a]'>
          <span>{city}</span>
          <span>/</span>
          <span>{job.employmentType}</span>
          <span>/</span>
          <span>{job.locationType}</span>
        </p>
      </div>

      <button
        type='button'
        className='hidden shrink-0 rounded-full bg-primary-600 px-5 py-2 text-xs font-semibold tracking-[0.5px] whitespace-nowrap text-[#1c1e13] transition-colors hover:bg-primary-500 lg:block'
      >
        Read more
      </button>
    </div>
  );
}

/** Shown in the list area when no roles match (or none are open). */
function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#101616]/40 px-6 py-20 lg:py-[120px]'>
      <Image
        src='/avatars/careers/empty-state-career.svg'
        alt=''
        width={141}
        height={120}
        unoptimized
      />
      <p className='text-center text-base font-medium text-white/80'>
        Please check back later.
      </p>
    </div>
  );
}

/**
 * Careers job board: accordion filters (sidebar on desktop, collapsible panel
 * on mobile) beside a filtered list of open roles.
 */
export function JobBoard() {
  const [filters, setFilters] = useState<Filters>(ALL);
  const [openGroups, setOpenGroups] = useState<JobFilterKey[]>(['location']);
  const [panelOpen, setPanelOpen] = useState(false);

  const toggleGroup = (key: JobFilterKey) =>
    setOpenGroups(groups =>
      groups.includes(key)
        ? groups.filter(group => group !== key)
        : [...groups, key]
    );

  const select = (key: JobFilterKey, value: string) =>
    setFilters(current => ({ ...current, [key]: value }));

  const filtered = JOBS.filter(job =>
    JOB_FILTERS.every(
      group =>
        filters[group.key] === 'all' || job[group.key] === filters[group.key]
    )
  );

  const panel = (
    <div className='overflow-hidden rounded-2xl border border-white/20 bg-white/4'>
      {JOB_FILTERS.map(group => (
        <FilterGroup
          key={group.key}
          label={group.label}
          allLabel={group.allLabel}
          options={group.options}
          value={filters[group.key]}
          open={openGroups.includes(group.key)}
          onToggle={() => toggleGroup(group.key)}
          onSelect={value => select(group.key, value)}
        />
      ))}
    </div>
  );

  return (
    <Section className='py-10 lg:py-12'>
      <div className='flex flex-col gap-6 lg:flex-row lg:items-start'>
        <div className='lg:sticky lg:top-24 lg:w-[292px] lg:shrink-0 lg:self-start'>
          {/* Mobile: toggle that reveals the filter panel. */}
          <button
            type='button'
            onClick={() => setPanelOpen(open => !open)}
            aria-expanded={panelOpen}
            className={cn(
              'flex w-full items-center rounded-2xl border border-white/20 bg-white/4 px-4 py-4 text-white lg:hidden',
              panelOpen ? 'justify-between' : 'justify-center'
            )}
          >
            <span className='font-medium underline underline-offset-4'>
              Filter Open Positions
            </span>
            {panelOpen ? <X className='size-5' /> : null}
          </button>

          <div
            className={cn(
              'mt-3 lg:mt-0 lg:block',
              panelOpen ? 'block' : 'hidden'
            )}
          >
            {panel}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className='hidden self-stretch border-l border-dashed border-white/15 lg:block' />
        ) : null}

        {filtered.length === 0 ? (
          <div className='flex-1'>
            <EmptyState />
          </div>
        ) : (
          <div className='scrollbar-hide flex max-h-[360px] flex-1 flex-col gap-2.5 overflow-y-auto lg:max-h-none lg:overflow-visible'>
            {filtered.map(job => (
              <JobSummary key={job.slug} job={job} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
