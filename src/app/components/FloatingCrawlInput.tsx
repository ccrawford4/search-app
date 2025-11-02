"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCrawlInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [host, setHost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/crawl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ host: host.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Crawl initiated successfully!" });
        setHost("");
        setTimeout(() => {
          setMessage(null);
          setIsOpen(false);
        }, 2000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to initiate crawl" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating "i" Icon Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xl hover:shadow-xl transition-shadow focus:outline-none focus:ring-4 focus:ring-blue-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">i</span>
      </motion.button>

      {/* Floating Input Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl p-6 w-96"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Crawl Website</h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg mb-3">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Not seeing results you want?</span> Enter a host to provide more data for the search engine.
                </p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg">
                <p className="text-xs text-amber-800 flex items-start">
                  <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span><span className="font-semibold">Warning:</span> Not recommended for large sites (e.g., wikipedia.com)</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="e.g., example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !host.trim()}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                  isLoading || !host.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-md hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Crawling...
                  </span>
                ) : (
                  "Start Crawl"
                )}
              </button>
            </form>

            {/* Message Display */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                    message.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-20 z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
}
