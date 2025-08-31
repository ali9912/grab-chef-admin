import { X, Search } from 'lucide-react';
import { FC, useState, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { SearchBarProps } from '../../types/interfaces/common';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { sidebarItems } from '@/common/constants/data';

const SearchBar: FC<SearchBarProps> = ({
  search,
  setSearch,
  placeHolder,
  setCurrentPage,
  className,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search && search.trim()) {
      const filtered = sidebarItems.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(filtered);
      setIsSearchOpen(true);
    } else {
      setFilteredItems([]);
      setIsSearchOpen(false);
    }
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchItemClick = (item: any) => {
    router.push(item.url);
    setSearch('');
    setIsSearchOpen(false);
  };

  const clearSearch = () => {
    setSearch('');
    setIsSearchOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div
        className={`flex items-center justify-between gap-2 rounded-[45px] p-4 group border w-[400px] h-[56px] focus-within:border-primary duration-200 ${className && className}`}
      >
        <div className='flex items-center gap-2 w-full px-1'>
          <input
            type='text'
            placeholder={placeHolder ?? 'Search here'}
            className='focus:outline-none w-full'
            value={search || ''}
            onChange={e => {
              setSearch(e.target.value);
              if (setCurrentPage) {
                setCurrentPage(1);
              }
            }}
            onFocus={() => {
              if (search && search.trim()) {
                setIsSearchOpen(true);
              }
            }}
          />
          <CiSearch
            size={24}
            color='#6E683B'
          />
        </div>
        {search && (
          <button
            onClick={clearSearch}
          >
            <X
              size={15}
              color='#6E683B'
            />
          </button>
        )}
      </div>
      
      {/* Search Dropdown */}
      {isSearchOpen && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSearchItemClick(item)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={20}
                height={20}
                className="opacity-70"
              />
              <span className="text-sm font-medium text-gray-900">{item.title}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* No Results */}
      {isSearchOpen && search && search.trim() && filteredItems.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 text-sm text-gray-500">
            No pages found for "{search}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
