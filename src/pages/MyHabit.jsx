import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyHabit = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [completedToday, setCompletedToday] = useState({}); // Track local completed habits
  const [newHabit, setNewHabit] = useState({
    habitTitle: "",
    description: "",
    category: "",
    imageUrl: ""
  });
  const fetchHabits = () => {
    fetch('https://habit-tracker-server-drab.vercel.app/addHabit')
      .then(res => res.json())
      .then(data => {
        const myHabits = data.filter(h => h.userEmail === user.email);
        setHabits(myHabits);
        const todayStr = new Date().toDateString();
        const completedMap = {};
        myHabits.forEach(h => {
          const doneToday = h.completionHistory?.map(d => new Date(d).toDateString()).includes(todayStr);
          completedMap[h._id] = doneToday;
        });
        setCompletedToday(completedMap);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewHabit(prev => ({ ...prev, [name]: value }));
  };

  const handleAddHabit = e => {
    e.preventDefault();
    const habitData = {
      ...newHabit,
      userName: user.name,
      userEmail: user.email,
      createdAt: new Date(),
      completionHistory: [],
      currentStreak: 0
    };

    fetch('https://habit-tracker-server-drab.vercel.app/addHabit', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitData)
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Habit added!");
        setHabits(prev => [...prev, habitData]);
        setNewHabit({ habitTitle: "", description: "", category: "", imageUrl: "" });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = id => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;

    fetch(`https://habit-tracker-server-drab.vercel.app/addHabit/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        toast.success("Habit deleted!");
        setHabits(prev => prev.filter(h => h._id !== id));
        setCompletedToday(prev => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      })
      .catch(err => console.error(err));
  };

  const handleMarkComplete = habit => {
    const today = new Date().toDateString();
    const completedDates = habit?.completionHistory?.map(d => new Date(d).toDateString()) || [];

    if (completedToday[habit._id] || completedDates.includes(today)) {
      toast.error("Already completed today!");
      return;
    }

    const updatedHistory = [...completedDates, today];

    fetch(`https://habit-tracker-server-drab.vercel.app/addHabit/${habit._id}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completionHistory: updatedHistory }),
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Habit marked complete!");

        setHabits(prev => prev.map(h => h._id === habit._id ? data.result : h));
        setCompletedToday(prev => ({ ...prev, [habit._id]: true }));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Habits</h1>


      <table className="table-auto w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Current Streak</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map(habit => {
            const isCompletedToday = completedToday[habit._id] || false;

            return (
              <tr key={habit._id} className="border-t">
                <td>{habit.habitTitle}</td>
                <td>{habit.category}</td>
                <td>{habit.currentStreak || 0}</td>
                <td>{new Date(habit.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <Link to={`/update-habit/${habit._id}`} className="btn btn-sm bg-linear-to-r from-green-500 to-green-800 text-white">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(habit._id)} className="btn btn-sm bg-linear-to-r from-green-500 to-green-800 text-white">
                    Delete
                  </button>
                  <button
                    onClick={() => handleMarkComplete(habit)}
                    disabled={isCompletedToday}
                    className={`btn btn-sm bg-linear-to-r from-green-500 to-green-800 text-white ${isCompletedToday ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Mark Complete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyHabit;

