

import { useLoaderData } from "react-router";
import Banner from "../components/Banner";
import { HabitCard } from "../components/HabitCard";
const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Banner/>

            <div className="text-center text-xl font-bold mt-10">Latest Model</div>

             <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
         {data.map(model => <HabitCard key={model._id} model={model}/>)}
      </div>
            
        </div>
    );
};

export default Home;
