import react, { useEffect } from "react";
import { useState } from "react";

const QUOTES_API: string = "https://dummyjson.com/quotes";
interface Quote {
  id: number;
  quote: string;
  author: string;
}

function Solve () {
  const [quotes, setQuotes] = useState<Quote[]> ([]);
  const [loading, setLoading] = useState<boolean> (true);
  const [error, setError] = useState<string | null> (null);
  const [searchWord, setSearchWord] = useState<string> ("");

  useEffect (() => {
    const fetchQuotes = async (): Promise<void> => {
      try {
        const response = await fetch (QUOTES_API);
        if (!response.ok) {
          throw new Error ("response error");
        }
        const data = await response.json () as { quotes: Quote[] };
        setQuotes (data.quotes );
      } catch (error) {
        if (error instanceof Error) {
          setError (error.message);
        } else {
          setError ("unknown error");
        }
      } finally {
        setLoading (false);
      }
    }
    fetchQuotes ();
  }, []);
  
  if (loading === true) {
    return (<h2>Loading...</h2>);
  }
  if (error) {
    return (<h2>Error: {error}</h2>);
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault ();
    console.log ("search word: ", searchWord);
  }
  return (
    <>
      <form onSubmit = {handleSearch}>
        <input type = "text" placeholder = "Enter word..." value = {searchWord}
          onChange = {(e) => setSearchWord (e.target.value)}
        />
        <button type = "submit">Search</button>
      </form>
      {
        quotes.map (
          (it) => {
            const words = it.quote.split (' ');
            const matchedWords = words.filter (word => word.toLowerCase ().includes (searchWord.toLowerCase ()));

            return (
              <div key = {it.id}>
                {matchedWords.length > 0 ? (
                  <p>{matchedWords.join (' ')}</p>
                ) : (null)}
              </div>
            );
          }
        )
      }
    </>
  );
}

export default Solve;