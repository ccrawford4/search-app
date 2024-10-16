import { HIT } from "../types";

interface ResultTableProps {
    hits: HIT[]
}

export default function ResultTable(props: ResultTableProps) {
    if (!props || !props.hits || props.hits.length === 0) {
        return <div></div>
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="text-left p-4 text-sm font-semibold text-gray-700">URL</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-700">TFIDF</th>
                    </tr>
                </thead>
                <tbody>
                    {props.hits.map((hit, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="p-4 text-blue-600 hover:underline">
                                <a href={hit.URL} target="_blank" rel="noopener noreferrer">
                                    {hit.URL}
                                </a>
                            </td>
                            <td className="p-4 text-gray-900">{hit.TFIDF}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}