import { Link } from "react-router-dom";

export const HabitCard = ({ habit = {} }) => {
  const { habitTitle, imageUrl, category, description, _id, userName, currentStreak } = habit;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img src={imageUrl} alt={habitTitle} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{habitTitle}</h2>
        <div className="badge text-xs badge-soft">{category}</div>
        <div className="text-xs text-emerald-950">Created by: {userName}</div>
        {currentStreak > 0 && <div className="badge badge-success text-white">🔥 {currentStreak} Day Streak</div>}
        <p className="line-clamp-1 mt-1">{description}</p>
        <div className="card-actions justify-center mt-4">
          <Link to={`/habit-details/${_id}`} className="btn bg-linear-to-r from-green-500 to-green-800 text-white w-full btn-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
