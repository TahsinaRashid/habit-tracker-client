import { useLoaderData } from "react-router";
import { HabitCard } from "../components/HabitCard";
import { useState } from "react";

const BrowseAllHabit = () => {
  const data = useLoaderData(); 
  const [habits, setHabits] = useState(data);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    let filtered = data;

    if (searchText.trim() !== "") {
      filtered = filtered.filter(h =>
        h.habitTitle.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterCategory !== "") {
      filtered = filtered.filter(h => h.category === filterCategory);
    }

    setHabits(filtered);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-2">Browse All Habits</h1>
      <p className="text-center text-gray-600 mb-4">Search and filter public habits.</p>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 justify-center mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search habits..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full sm:w-64"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="select select-bordered w-full sm:w-48"
        >
          <option value="">All Categories</option>
          <option value="Morning">Morning</option>
          <option value="Work">Work</option>
          <option value="Fitness">Fitness</option>
          <option value="Evening">Evening</option>
          <option value="Study">Study</option>
        </select>

        <button type="submit" className="btn bg-linear-to-r from-green-500 to-green-800 text-white w-full sm:w-auto">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {habits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {habits.map(habit => (
            <HabitCard key={habit._id} habit={habit} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No habits found.</p>
      )}
    </div>
  );
};

export default BrowseAllHabit;
