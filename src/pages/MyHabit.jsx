import { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { HabitCard } from "../components/HabitCard";
const MyHabit = () => {
    const {user} = use(AuthContext)
    const [models, setModels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {

        fetch(`https://3d-model-server.vercel.app/my-models?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res=> res.json())
        .then(data=> {
            
            setModels(data)
            setLoading(false)
        })

    }, [user])


    if(loading) {
        return <div> Please wait ... Loading...</div>
    }

    return (
        <div>
              {/* <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                     {models.map(model => <HabitCard key={model._id} model={model}/>)}
                  </div> */}
    

{/* Add a check for models existence and if it's an array */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
  {models && Array.isArray(models) && models.map(model => (
    <HabitCard key={model._id} model={model} />
  ))}
</div>
            
        </div>
    );
};

export default MyHabit;