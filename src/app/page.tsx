"use client";

import ScaleLoader from 'react-spinners/ScaleLoader';
import React, {useContext, useState} from "react";
import Search from './components/Search';
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
          const response = await fetch("/api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    searchQuery: searchQuery,
                }),
          });
          console.log("Response: ", response);
          if (!response.ok) {
            console.error("Error: ", response.statusText);
          }
          const data = await response.json();
          AppContext.results.HITS = data.HITS;
          AppContext.results.QUERY = searchQuery;
          router.push("/results");
          setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          console.error("Error fetching results: ", error);
      }
  }

  return (
    <div className="bg-cover bg-[url('../../public/images/sf.png')] h-screen flex items-center justify-center bg-gray-100">
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                <ScaleLoader color="#0eade8" />
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
