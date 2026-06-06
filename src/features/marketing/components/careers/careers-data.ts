export interface Job {
  slug: string;
  title: string;
  /** Full location, e.g. "Enugu, Nigeria"; the card shows the city only. */
  location: string;
  /** Remote / Hybrid / On-site. */
  locationType: string;
  department: string;
  employmentType: string;
}

export const JOBS: Job[] = [
  {
    slug: 'developer-experience-engineer',
    title: 'Developer Experience Engineer',
    location: 'Enugu, Nigeria',
    locationType: 'Remote',
    department: 'Engineering',
    employmentType: 'Full-time',
  },
  {
    slug: 'account-executive',
    title: 'Account Executive',
    location: 'Enugu, Nigeria',
    locationType: 'Remote',
    department: 'Sales',
    employmentType: 'Full-time',
  },
  {
    slug: 'data-analyst-trust-and-safety',
    title: 'Data Analyst, Trust & Safety',
    location: 'Enugu, Nigeria',
    locationType: 'Remote',
    department: 'Data',
    employmentType: 'Full-time',
  },
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    location: 'Enugu, Nigeria',
    locationType: 'Remote',
    department: 'Engineering',
    employmentType: 'Full-time',
  },
];

/** Filterable fields of a job, used to key the filter groups. */
export type JobFilterKey =
  | 'location'
  | 'locationType'
  | 'department'
  | 'employmentType';

const unique = (values: string[]) => [...new Set(values)];

/** Accordion filter groups, with options derived from the job list. */
export const JOB_FILTERS: {
  key: JobFilterKey;
  label: string;
  allLabel: string;
  options: string[];
}[] = [
  {
    key: 'location',
    label: 'Location',
    allLabel: 'All Locations',
    options: unique(JOBS.map(job => job.location)),
  },
  {
    key: 'locationType',
    label: 'Location Type',
    allLabel: 'All Types',
    options: unique(JOBS.map(job => job.locationType)),
  },
  {
    key: 'department',
    label: 'Department',
    allLabel: 'All Departments',
    options: unique(JOBS.map(job => job.department)),
  },
  {
    key: 'employmentType',
    label: 'Employment type',
    allLabel: 'All Types',
    options: unique(JOBS.map(job => job.employmentType)),
  },
];
