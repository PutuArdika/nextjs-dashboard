'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
  //   const params = new URLSearchParams(searchParams);
  //   const term = event.target.value;
  //   // Handle the search term as needed (e.g., update state, make API call, etc.)
  //   if (term) {
  //     params.set('query', term);
  //   } else {
  //     params.delete('query');
  //   }
  //   console.log('Search term:', term);
  //   replace(`${pathname}?${params.toString()}`);
  // }

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset to page 1 on new search
    const term = event.target.value;
    // Handle the search term as needed (e.g., update state, make API call, etc.)
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    console.log('Search term:', term);
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={handleSearch}
        defaultValue={searchParams.get('query')?.toString()}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
