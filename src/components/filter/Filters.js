import { useState, useEffect } from 'react';
import { useData } from '../providers';
import styled from 'styled-components';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

export function Filters() {
  const { setApiURL, setActivePage, apiURL } = useData();
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });
  const [options, setOptions] = useState({
    status: [],
    gender: [],
    species: []
  });

  useEffect(() => {
    async function fetchOptions() {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setOptions({
        status: ['Alive', 'Dead', 'unknown'],
        gender: ['Male', 'Female', 'Genderless', 'unknown'],
        species: [...new Set(data.results.map((char) => char.species))]
      });
    }
    fetchOptions();
  }, []);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setApiURL(`${API_BASE_URL}/?${params.toString()}`);
    setActivePage(1);
  };

  const resetFilters = () => {
    setFilters({ status: '', gender: '', species: '', name: '', type: '' });
    setApiURL(API_BASE_URL);
    setApiURL('https://rickandmortyapi.com/api/character');
  };

  return (
    <FilterContainer>
      <Select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
      >
        <option value="">Status</option>
        {options.status.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
      <Select
        name="gender"
        value={filters.gender}
        onChange={handleFilterChange}
      >
        <option value="">Gender</option>
        {options.gender.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </Select>
      <Select
        name="species"
        value={filters.species}
        onChange={handleFilterChange}
      >
        <option value="">Species</option>
        {options.species.map((species) => (
          <option key={species} value={species}>
            {species}
          </option>
        ))}
      </Select>
      <Input
        name="name"
        value={filters.name}
        onChange={handleFilterChange}
        placeholder="Name"
      />
      <Input
        name="type"
        value={filters.type}
        onChange={handleFilterChange}
        placeholder="Type"
      />
      <Button onClick={applyFilters}>Apply</Button>
      <ResetButton onClick={resetFilters}>Reset</ResetButton>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  background: #001a33;
  padding: 10px;
`;

const Select = styled.select`
  background: #001a33;
  color: white;
  padding: 5px;
`;

const Input = styled.input`
  background: #001a33;
  color: white;
  padding: 5px;
`;

const Button = styled.button`
  background: green;
  color: white;
  padding: 5px 10px;
`;

const ResetButton = styled(Button)`
  background: red;
`;
