
import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const HabitDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const [refetch, setRefecth] = useState(false)

  useEffect(() => {
    fetch(`https://3d-model-server.vercel.app/models/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHabit(data.result);
        console.log(" Api called!")
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        setLoading(false); 
        setHabit(null);
      });
  }, [user, id, refetch]);

  const handleDlete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://3d-model-server.vercel.app/models/${habit._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate("/browse-all-habit");

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleDownload = () => {
    const finalModel = {
      name: habit.name,
      downloads: habit.downloads,
      created_by: habit.created_by,
      description: habit.description,
      thumbnail: habit.thumbnail,
      created_at: new Date(),
      downloaded_by: user.email,
    };

    fetch(`https://3d-model-server.vercel.app/downloads/${habit._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalModel),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully downloaded!");
        setRefecth(!refetch)

        // alternative solution of realtime download count update

        fetch(`https://3d-model-server.vercel.app/models/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHabit(data.result);
        console.log(" Api called!")
        console.log(data);
        setLoading(false);
      });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (loading) {
  //   return <div> Loading...</div>;
  // }

   if (loading || !habit) {
    return (
        <div className="text-center py-12">
            <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={habit.thumbnail}
              alt=""
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {habit.name}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {habit.category}
              </div>

              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                Downloaded: {habit.downloads}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {habit.description}
            </p>

            <div className="flex gap-3 mt-6">
              <Link
                to={`/update-habit/${habit._id}`}
                className="btn btn-primary rounded-full bg-linear-to-r from-pink-500 to-red-600 text-white border-0 hover:from-pink-600 hover:to-red-700"
              >
                Update Model
              </Link>
              <button
                onClick={handleDownload}
                className="btn btn-secondary rounded-full"
              >
                Download
              </button>
              <button
                onClick={handleDlete}
                className="btn btn-outline rounded-full border-gray-300 hover:border-pink-500 hover:text-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
