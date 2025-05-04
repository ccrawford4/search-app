"use client";

import ScaleLoader from "react-spinners/ScaleLoader";
import React, { useContext, useState, memo, useCallback } from "react";
import Search from "./components/Search";
import { useRouter } from "next/navigation"; // Import the router
import { AppContextProvider } from "./AppContext";
import { useSession } from "next-auth/react";
import SignIn from "./components/SignIn";
import { signIn } from "next-auth/react";

// Wrap ScaleLoader with React.memo
const MemoizedScaleLoader = memo(ScaleLoader);

// Wrap Search with React.memo
const MemoizedSearch = memo(Search);

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const AppContext = useContext(AppContextProvider);
  const { data: session } = useSession();

  const handleSearch = useCallback(
    async (searchQuery: string) => {
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
        console.log("Data: ", data);
        AppContext.results.HITS = data.HITS;
        AppContext.results.QUERY = searchQuery;

        router.push("/results");
        setIsLoading(false);
      } catch (error) {
        console.error("Error: ", error);
        setIsLoading(false);
        AppContext.results.HITS = [];
        AppContext.results.QUERY = searchQuery;
        router.push("/results");
      }
    },
    [AppContext, router]
  ); // Add dependencies

  const handleSignInFlow = (provider: string) => {
    console.log("Sign in with: ", provider);
    signIn(provider, { callbackUrl: "/" });
  };

  const getFirstName = (name: string | null | undefined) => {
    if (!name) {
      return "";
    }
    if (name.split(" ").length > 1) {
      return name.split(" ")[0];
    }
    return "";
  }

  return (
    <div className="bg-cover bg-[url('../../public/images/sf.png')] h-screen flex items-center justify-center">
      {session ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
              <MemoizedScaleLoader color="#0eade8" />
            </div>
          )}
          <div className="relative text-center p-8 bg-white shadow-lg rounded-xl max-w-lg w-full">
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">
              {`Welcome Test ${getFirstName(session.user?.name)} 🎉`}
            </h1>
            <h2 className="text-lg mb-6 text-gray-500">Search for a term</h2>
            <MemoizedSearch handleSearch={handleSearch} isLoading={isLoading} />
          </div>
        </>
      ) : (
        <SignIn signIn={handleSignInFlow} />
      )}
    </div>
  );
}
