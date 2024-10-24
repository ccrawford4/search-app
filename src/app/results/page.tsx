"use client";

import React, { useContext, useMemo, memo } from "react";
import { AppContextProvider } from "../AppContext";
import ResultTable from "../components/ResultTable";
import Link from "next/link";
import { HIT } from "../types";

// Wrap ResultTable with React.memo
const MemoizedResultTable = memo(ResultTable);

export default function SearchResults() {
    const AppContext = useContext(AppContextProvider);

    const validResponse = () => {
        return AppContext.results && 
               AppContext.results.HITS && 
               AppContext.results.HITS.length > 0;
    }

    // Memoize the hits array
    const hits: HIT[] = useMemo(() => AppContext.results.HITS, [AppContext.results.HITS]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
                <h1 className="text-3xl font-semibold mb-4 text-center">
                    {validResponse() ? "Search Results " : "No results found "} 
                for: <span className="text-blue-600">{AppContext.results.QUERY}</span>
                </h1>
                <div>
                    <MemoizedResultTable hits={hits} />
                </div>
                <div className="mt-6 text-center">
                    <Link className="text-blue-600 hover:underline" href="/">
                        Back to search
                    </Link>
                </div>
            </div>
        </div>
    );
}