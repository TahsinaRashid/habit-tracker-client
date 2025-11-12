import { useLoaderData } from "react-router";
import Banner from "../components/Banner";
import { HabitCard } from "../components/HabitCard";
const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Banner/>
            <div className="text-center text-xl font-bold md:pt-5 ">
                Featured Habits</div>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
         {data.map(habit => <HabitCard key={habit._id} habit={habit}/>)}
      </div>
            
        </div>
    );
};

export default Home;
