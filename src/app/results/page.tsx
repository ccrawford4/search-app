"use client";

import React, {useContext} from "react";
import { AppContextProvider } from "../AppContext";
import ResultTable from "../components/ResultTable";
import Link from "next/link";

export default function SearchResults() {
    const AppContext = useContext(AppContextProvider);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
                <h1 className="text-3xl font-semibold mb-4 text-center">
                    {AppContext.results && AppContext.results.length > 0 ? "Search Results " : "No results found "} 
                    for: <span className="text-blue-600">{AppContext.searchQuery}</span>
                </h1>
                <ResultTable hits={AppContext.results} />
                <div className="mt-6 text-center">
                    <Link className="text-blue-600 hover:underline" href="/">
                        Back to search
                    </Link>
                </div>
            </div>
        </div>
    );
}