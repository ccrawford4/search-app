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

    const handleSearch = async (searchTerm: string) => {
      setIsLoading(true);
      try {
          const response = await getResults(searchTerm);
          console.log("Response: ", response);
          AppContext.results = response.hits;
          setIsLoading(false);
          router.push("/results");
      } catch (error) {
          setIsLoading(false);
          console.error("Error fetching results: ", error);
      }
  }


  return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 pt-32">
        {isLoading && (
            <RingLoader
                color="blue"
            />
        )}
        <div className="text-center p-8 bg-white shadow-md rounded-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to my search engine!</h1>
          <h2 className="text-lg mb-6 text-gray-600">Search for a term</h2>
          <Search
            handleSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>
      </div>
  );
}
