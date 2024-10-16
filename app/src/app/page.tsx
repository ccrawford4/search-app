import RingLoader from 'react-spinners/RingLoader';
import {useState} from "react";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        
    })
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
          {/*<Search*/}
          {/*    searchTerm={searchTerm}*/}
          {/*    setSearchTerm={setSearchTerm}*/}
          {/*    setResults={setResults}*/}
          {/*    setIsLoading={setIsLoading}*/}
          {/*/>*/}
        </div>
        {/*{results !== undefined && results.length > 0 && (*/}
        {/*    <ResultTable hits={results} />*/}
        {/*)}*/}
      </div>
  );
}
