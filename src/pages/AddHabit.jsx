import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AddHabit = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="text-center mt-10">Please login to add a habit.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const habitTitle = form.habitTitle.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;
    const imageUrl = form.imageUrl.value.trim();
    const isPublic = form.isPublic.checked;

    if (!habitTitle || !description || !category || !reminderTime) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const newHabit = {
      habitTitle,
      description,
      category,
      reminderTime,
      imageUrl,
      isPublic,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      createdAt: new Date().toISOString(),
      currentStreak: 0,
    };

    toast.loading("Adding habit...", { id: "add-habit" });

    try {
      const res = await fetch("http://localhost:7000/addHabit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHabit),
      });

      if (!res.ok) throw new Error("Failed to save habit");

      await res.json();
      toast.success("Habit added successfully!", { id: "add-habit" });
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add habit", { id: "add-habit" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-green-100 p-8 shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Habit</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label font-semibold text-black">Habit Title</label>
          <input
            type="text"
            name="habitTitle"
            placeholder="Enter habit title"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold text-black">Description</label>
          <textarea
            name="description"
            placeholder="Describe your habit"
            required
            rows={3}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold text-black">Category</label>
          <select
            name="category"
            required
            className="select select-bordered w-full "
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>
        <div>
          <label className="label font-semibold text-black">Reminder Time</label>
          <input
            type="time"
            name="reminderTime"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold text-black">Image URL (Optional)</label>
          <input
            type="url"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isPublic" defaultChecked />
          <label className="text-sm font-medium text-black">Make Public</label>
        </div>
        <div>
          <label className="label font-semibold text-black">User Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="label font-semibold text-black">User Name</label>
          <input
            type="text"
            value={user.displayName || "Anonymous"}
            readOnly
            className="input w-full bg-gray-100 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="btn w-full bg-linear-to-r from-green-500 to-green-800 text-white"
        >
          Add Habit
        </button>
      </form>
    </motion.div>
  );
};

export default AddHabit;
