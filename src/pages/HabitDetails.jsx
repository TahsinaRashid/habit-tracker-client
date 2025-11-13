import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:7000/addHabit/${id}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHabit(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, user]);

  if (loading) return <div>Loading...</div>;
  const completedDates =
    habit?.completionHistory?.map((d) => new Date(d).toDateString()) || [];

  const today = new Date();
  const last30Days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d.toDateString();
  });

  const completedCount = last30Days.filter((d) => completedDates.includes(d))
    .length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const todayMarked = completedDates.includes(today.toDateString());

  const handleMarkComplete = () => {
    if (todayMarked) {
      toast.error("Habit already marked for today!");
      return;
    }

    setUpdating(true);

    const updatedHistory = [...completedDates, today.toDateString()];

    fetch(`http://localhost:7000/addHabit/${habit?._id}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify({ completionHistory: updatedHistory }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHabit(data.result);
        toast.success("Habit marked complete for today!");
      })
      .catch((err) => console.error(err))
      .finally(() => setUpdating(false));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={habit?.imageUrl || ""}
              alt={habit?.habitTitle || "Habit Image"}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {habit?.habitTitle || ""}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {habit?.category || ""}
              </div>

              <div className="badge badge-lg badge-outline text-green-600 border-green-600 font-medium">
                Streak: {habit?.currentStreak || 0} days
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {habit?.description || ""}
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-green-800 h-4"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {progressPercent}% completed in last 30 days
              </p>
            </div>
            <p className="mt-2 text-gray-700 text-sm">
              Created by: {habit?.userName || ""} ({habit?.userEmail || ""})
            </p>
            <button
              disabled={updating || todayMarked}
              onClick={handleMarkComplete}
              className={`btn mt-4 ${
                todayMarked ? "btn-disabled" : "btn btn-sm text-right  bg-linear-to-r from-green-500 to-green-800 text-white"
              }`}
            >
              {todayMarked ? "Already Completed Today" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;

