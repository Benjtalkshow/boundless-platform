/** Horizontal rule with a centered "OR" label, sitting on the auth card. */
export function OrDivider() {
  return (
    <div className='relative h-7 w-full'>
      <div className='absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-[#2e3a38]' />
      <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink-soft px-2 text-body-sm text-[#72736f]'>
        OR
      </span>
    </div>
  );
}
