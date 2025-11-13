import { useLoaderData } from "react-router";
import { HabitCard } from "../components/HabitCard";
import { useState } from "react";

const BrowseAllHabit = () => {
  const data = useLoaderData();
  const [models, setModels] = useState(data)
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const search_text = e.target.search.value
    console.log(search_text)
    setLoading(true)

    fetch(`https://3d-model-server.vercel.app/search?search=${search_text}`)
    .then(res=> res.json())
    .then(data=> {
      console.log(data)
      setModels(data)
      setLoading(false)
    })
  }
  return (
    <div>
      <div className="text-2xl text-center font-bold"> All Habits!</div>
      <p className=" text-center ">Explore habits.</p>
     
     <form onSubmit={handleSearch} className=" mt-5 mb-10 flex gap-1.5 justify-center">
       <label className="input ">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input name="search" type="search"  placeholder="Search" />
      </label>
      <button className="btn btn-md text-right  bg-linear-to-r from-green-500 to-green-800 text-white">{loading ? "Searching...." : "Search"}</button>
     </form>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((habit) => (
          <HabitCard key={habit._id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default BrowseAllHabit;