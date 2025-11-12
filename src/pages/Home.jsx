// import { useLoaderData } from "react-router";
// import Banner from "../components/Banner";
// import { HabitCard } from "../components/HabitCard";
// const Home = () => {
//     const data = useLoaderData()
//     console.log(data)
//     return (
//         <div>
//             <Banner/>
//             <div className="text-center text-xl font-bold md:pt-5 ">
//                 Featured Habits</div>
//         <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
//          {data.map(habit => <HabitCard key={habit._id} habit={habit}/>)}
//       </div>
            
//         </div>
//     );
// };

// export default Home;

import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import { HabitCard } from "../components/HabitCard";

const Home = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="min-h-screen bg-base-200">
      <Banner />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
          Featured Habits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((habit) => (
            <HabitCard key={habit._id} habit={habit} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
