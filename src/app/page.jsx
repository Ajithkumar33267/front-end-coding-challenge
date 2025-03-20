'use client';

import { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetails } from '@/app/services/pokeApi';
import Pagination from '@/app/components/Pagination';
import SearchBar from '@/app/components/SearchBar';
import SortBy from '@/app/components/SortBy';
import PokemonCard from '@/app/components/PokemonCard';
import FilterDropdown from '@/app/components/FilterDropdown'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowDownUp } from 'lucide-react';

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('');
  const [loading, setLoading] = useState(false)
  const limit = 20;

  const [selectedTypes, setSelectedTypes] = useState(new Set());

  const typeOptions = [
    { value: 'fire', label: 'Fire' },
    { value: 'water', label: 'Water' },
    { value: 'grass', label: 'Grass' },
    { value: 'electric', label: 'Electric' },
    { value: 'psychic', label: 'Psychic' },
    { value: 'ice', label: 'Ice' },
    { value: 'dragon', label: 'Dragon' },
    { value: 'dark', label: 'Dark' },
    { value: 'fairy', label: 'Fairy' },
    { value: 'steel', label: 'Steel' }
  ];

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true)
      try {
        const data = await getPokemons(500, 0);

        const details = await Promise.all(
          data.results.map((pokemon) => getPokemonDetails(pokemon.name))
        );
        setAllPokemons(details);
        setFilteredPokemons(details);
      } catch (error) {
        console.log(error.error);

      } finally {
        setLoading(false)
      }

    };
    fetchData();
  }, []);

  useEffect(() => {
    let updatedPokemons = [...allPokemons];

    if (search) {
      updatedPokemons = updatedPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTypes.size > 0) {
      updatedPokemons = updatedPokemons.filter((pokemon) =>
        Array.from(selectedTypes).some((type) =>
          pokemon.types.some((t) => t.type.name === type)
        )
      );
    }

    if (sortType === 'name-asc') {
      updatedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'name-desc') {
      updatedPokemons.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === 'exp-asc') {
      updatedPokemons.sort((a, b) => a.base_experience - b.base_experience);
    } else if (sortType === 'exp-desc') {
      updatedPokemons.sort((a, b) => b.base_experience - a.base_experience);
    }

    setFilteredPokemons(updatedPokemons);
  }, [search, selectedTypes, sortType, allPokemons]);

  useEffect(() => {
    const start = offset;
    const end = offset + limit;
    setDisplayedPokemons(filteredPokemons.slice(start, end));
  }, [offset, filteredPokemons]);

  return (
    <div className='container mx-auto my-10'>
      <h1 className="text-2xl font-bold mb-4 text-center">Pokémon Explorer</h1>

      <SearchBar value={search} onChange={setSearch} />

      <div className="flex justify-center gap-4 md:gap items-center md:justify-between md:flex-row flex-col mb-4">
        <div className='flex  items-center gap-4'>

          <SortBy sortType={sortType} setSortType={setSortType} />

          <FilterDropdown
            title="Filter By Type"
            options={typeOptions}
            selectedValues={selectedTypes}
            setSelectedValues={setSelectedTypes}
          />
        </div>
        
        <div className="text-xs font-semibold text-gray-600">
          Showing {filteredPokemons.length} Pokémon(s)
        </div>

        <div>
          {filteredPokemons.length > limit && (
            <Pagination
              offset={offset}
              setOffset={setOffset}
              limit={limit}
              totalCount={filteredPokemons.length}
            />
          )}
        </div>
      </div>



      {loading ? (
        <div className="mx-5 md:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="h-96 w-full rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : (
        <div className="mx-5 md:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          ) : (
            <div className='text-center w-screen text-2xl italic'>No results found!</div>
          )}
        </div>
      )}

      {filteredPokemons.length > limit && (
        <div className='mt-4'>
          <Pagination
            offset={offset}
            setOffset={setOffset}
            limit={limit}
            totalCount={filteredPokemons.length}
          />
        </div>
      )}
    </div>
  );
}
