import "./App.css";
import Card from "./Card";
import { useState } from "react";

function App() {
  let [searchTerm, setsearch] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>
      <label htmlFor="search" className="text-lg mb-2">Search Movie</label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setsearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter movie title..."
      />
      <Card searchTerm={searchTerm} />
    </div>
  );
}

export default App;
