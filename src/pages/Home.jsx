import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { HabitCard } from "../components/HabitCard";
import { motion } from "framer-motion";

const Home = () => {
  const [data, setData] = useState([]);

  // Fetch latest 6 habits from backend
  useEffect(() => {
    fetch("http://localhost:7000/latest-habit")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Banner />
      {/* Featured Habits Section */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl md:text-3xl font-bold mb-8"
        >
          Featured Habits
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {data.length > 0 ? (
            data.map((habit) => <HabitCard key={habit._id} habit={habit} />)
          ) : (
            <p className="text-center col-span-full">No habits found</p>
          )}
        </motion.div>
      </section>

      {/* The rest of your Home page sections remain unchanged */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-10"
          >
            Why Build Habits?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Better Focus",
                desc: "Stay consistent and sharpen your concentration every day.",
                icon: "🎯",
              },
              {
                title: "Reduced Stress",
                desc: "Structured habits make life calmer and more predictable.",
                icon: "🌿",
              },
              {
                title: "Improved Health",
                desc: "Build physical and mental wellness through routines.",
                icon: "💪",
              },
              {
                title: "Achieve Goals",
                desc: "Small steps daily lead to major long-term achievements.",
                icon: "🚀",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-base-100 rounded-2xl shadow-md hover:shadow-lg border"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8"
          >
            Our Impact
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Habits Created", value: "25K+" },
              { label: "Success Stories", value: "5K+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-md"
              >
                <p className="text-4xl font-bold text-green-600">{stat.value}</p>
                <p className="mt-2 text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-white ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-2xl font-semibold text-gray-700 mb-4 ">
            "We are what we repeatedly do. Excellence, then, is not an act but a habit."
          </p>
          <p className="text-gray-600">– Aristotle</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
