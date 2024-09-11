import { useState } from 'react';
import { debounce } from '../utils/helpers';

const useSearch = (initialItems) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = debounce((value) => {
        setSearchTerm(value);
    }, 1000);

    const filteredItems = initialItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return { searchTerm, handleSearch, filteredItems };
};

export default useSearch;