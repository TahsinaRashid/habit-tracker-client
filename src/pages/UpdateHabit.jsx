import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const UpdateHabit = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    habitTitle: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch(`http://localhost:7000/addHabit/${id}`, {
      headers: { authorization: `Bearer ${user?.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setHabit(data.result);
        setFormData({
          habitTitle: data.result.habitTitle || "",
          description: data.result.description || "",
          category: data.result.category || "",
          imageUrl: data.result.imageUrl || "",
        });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:7000/addHabit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Habit updated successfully!");
        navigate("/my-habit"); 
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-green-100">
      <h1 className="text-2xl font-bold mb-4">Update Habit</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="habitTitle"
          value={formData.habitTitle}
          onChange={handleChange}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="input input-bordered w-full"
        />
        <p className="text-gray-500 text-sm">
          Created by: {habit?.userName} ({habit?.userEmail})
        </p>

        <button type="submit" className="btn btn-sm text-right  bg-linear-to-r from-green-500 to-green-800 text-white">
          Update Habit
        </button>
      </form>
    </div>
  );
};

export default UpdateHabit;
