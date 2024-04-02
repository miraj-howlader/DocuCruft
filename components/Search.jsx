"use client";

import { useDebounces } from "@/hooks/useDebounces";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { useRouter } from "next/router";

import Image from "next/image";

const Search = ({ docs }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [term, setTerm] = useState("");
  const router = useRouter()

  function handleChange(e) {
    const value = e.target.value;
    setTerm(value);
    doSearch(value);
  }

  const doSearch = useDebounces((term) => {
    const found = docs.filter((doc) => {
      return doc.title.toLowerCase().includes(term.toLowerCase());
    });
    setSearchResult(found);
  }, 500);


  function closeSearchResult(event){
    event.preventDefault()
    router.push(event.push.href)
    setTerm("")
  }

  
  return (
    <>
      <div className="lg:black lg:max-w-md lg:flex-auto">
        <button
          type="button"
          className="focus:[&amp:not(:focus-visible)]
      outline-none hidden h-8 w-full items-center gap-2
      rounded-full bg-white pl-2 pr-3 text-sm 
      text-zinc-500 ring-1 ring-zinc-900/10 transition
      hover:ring-zinc-900/20 dark:bg-white/20
      dark:text-zinc-400 dark:ring-inset dark:ring-white/20
       dark:hover:ring-white/20 lg:flex"
        >
          <Image
            src="/search.svg"
            alt="Search"
            className="h-5 w-5"
            width={50}
            height={50}
          />

          <input
            type="text"
            value={term}
            placeholder="Search..."
            onChange={handleChange}
            className="flex-1 focus:border-none focus:outline-none"
          />
        </button>
      </div>
      {term && term.trim().length> 0 && (
        <SearchResult results={searchResult} term={term}
        closeSearchResult={closeSearchResult}/>
      )}
    </>
  );
};

export default Search;
