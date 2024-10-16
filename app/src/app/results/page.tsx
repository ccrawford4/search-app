"use client";

import React, {useContext} from "react";
import { AppContextProvider } from "../AppContext";
import ResultTable from "../components/ResultTable";

export default function SearchResults () {
    const AppContext = useContext(AppContextProvider);
    return (
        <div>
            <ResultTable hits={AppContext.results} />
        </div>
    )
}