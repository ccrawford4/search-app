import React from "react";
import SearchInput from "./SearchInput";
import Button from '@mui/material/Button';

interface SearchComponentProps {
    handleSearch: (searchTerm: string) => void;
    isLoading: boolean;
}

export default function Search({ handleSearch, isLoading }: SearchComponentProps) {
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    return (
        <div className="flex flex-row gap gap-x-6">
            <SearchInput
                searchTerm={searchQuery}
                setSearchTerm={setSearchQuery}
            />
            <Button disabled={isLoading} variant="outlined" onClick={() => handleSearch(searchQuery)}>
                Search
            </Button>
        </div>
    )
}