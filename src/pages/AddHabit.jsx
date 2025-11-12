import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  if (!user) {
    return <p className="text-center mt-10">Please login to add a habit.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;
    const imageFile = form.image.files[0]; 

    if (!title || !description || !category || !reminderTime) {
      toast.error("Please fill in all required fields!");
      return;
    }

    toast.loading("Adding habit...", { id: "add-habit" });

    let imageUrl = "";

    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.success) {
          imageUrl = data.data.url;
          toast.success("Image uploaded", { id: "add-habit" });
        } else {
          toast.error("Image upload failed", { id: "add-habit" });
          setUploading(false);
          return;
        }
      } catch (error) {
        console.error(error);
        toast.error("Image upload error", { id: "add-habit" });
        setUploading(false);
        return;
      }
      setUploading(false);
    }
    const newHabit = {
      title,
      description,
      category,
      reminderTime,
      image: imageUrl,
      createdBy: {
        email: user.email,
        name: user.displayName || "Anonymous",
      },
      createdAt: new Date(),
    };

    try {
      const res = await fetch("https://your-server-url.vercel.app/habits", {
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
      className="max-w-md mx-auto bg-base-100 p-8 rounded-2xl shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Habit</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label font-sm text-black">Habit Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter habit title"
            required
            className="input w-full  focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label className="labelfont-sm text-black">Description</label>
          <textarea
            name="description"
            placeholder="Describe your habit"
            required
            rows={4}
            className="textarea w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label className="label font-sm text-black">Category</label>
          <select
            name="category"
            required
            className="select w-full focus:outline-none focus:ring-2 focus:ring-green-400"
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
          <label className="label font-sm text-black ">Reminder Time</label>
          <input
            type="time"
            name="reminderTime"
            required
            className="input w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label className="label font-sm text-black">Upload Image (Optional)</label>
          <input
            type="file"
            name="image"
            accept=".jpg"
            className="file-input w-full"
          />
        </div>
        <div>
          <label className="label font-sm text-black">User Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            disabled
            className="input w-full rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="label font-sm text-black">User Name</label>
          <input
            type="text"
            value={user.displayName || "Anonymous"}
            readOnly
            disabled
            className="input w-full rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="btn w-full bg-linear-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white"
        >
          {uploading ? "Uploading..." : "Add Habit"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddHabit;
