"use client";

import RingLoader from 'react-spinners/RingLoader';
import React, {useContext, useState} from "react";
import Search from './components/Search';
import { getResults } from './api/search';
import { useRouter } from 'next/navigation';  // Import the router
import { AppContextProvider } from './AppContext';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const AppContext = useContext(AppContextProvider);

    const handleSearch = async (searchQuery: string) => {
      console.log("Handle search triggered");
      setIsLoading(true);
      try {
          const response = await getResults(searchQuery);
          console.log("Response: ", response);
          AppContext.results = response.HITS;
          AppContext.searchQuery = searchQuery;
          setIsLoading(false);
          router.push("/results");
      } catch (error) {
          setIsLoading(false);
          console.error("Error fetching results: ", error);
      }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                <RingLoader color="blue" />
            </div>
        )}
        <div className="relative text-center p-8 bg-white shadow-lg rounded-xl max-w-lg w-full">
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to my search engine!</h1>
            <h2 className="text-lg mb-6 text-gray-500">Search for a term</h2>
            <Search handleSearch={handleSearch} isLoading={isLoading} />
        </div>
    </div>
);
}
