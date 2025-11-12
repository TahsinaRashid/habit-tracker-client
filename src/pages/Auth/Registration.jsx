// import React, { use } from "react";
// import { Link, useNavigate } from "react-router";
// import { AuthContext } from "../../context/AuthContext";
// import { FaGoogle } from "react-icons/fa6";
// import toast from "react-hot-toast";

// const Register = () => {
//   const { createUser, updateUserProfile, signInWithGoogle } = use(AuthContext);
//   const navigate = useNavigate();

//   const handleRegister = (event) => {
//     event.preventDefault();
//     const displayName = event.target.displayName.value;
//     const photoURL = event.target.photoURL.value;
//     const email = event.target.email.value;
//     const password = event.target.password.value;

//     toast.loading("Creating user...", { id: "create-user" });

//     createUser(email, password)
//       .then((result) => {
//         console.log(result.user);
//         updateUserProfile(displayName, photoURL);
//         toast.success("User created successfully!", { id: "create-user" });
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(error.message, { id: "create-user" });
//       });
//   };

//   const handleGoogleSignIn = () => {
//     toast.loading("Creating user...", { id: "create-user" });
//     signInWithGoogle()
//       .then((result) => {
//         toast.success("User created successfully!", { id: "create-user" });
//         console.log(result.user);
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(error.message, { id: "create-user" });
//       });
//   };

//   return (
//     <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
//       <div className="card-body">
//         <h1 className="text-3xl font-bold text-center">Register</h1>
//         <form onSubmit={handleRegister}>
//           <fieldset className="fieldset">
//             {/* email field */}
//             <label className="label">Name</label>
//             <input
//               type="text"
//               name="displayName"
//               className="input rounded-full focus:border-0 focus:outline-gray-200"
//               placeholder="Name"
//             />

//             <label className="label">PhotoURL</label>
//             <input
//               type="text"
//               name="photoURL"
//               className="input rounded-full focus:border-0 focus:outline-gray-200"
//               placeholder="Photo URL"
//             />
//             {/* email field */}
//             <label className="label">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="input rounded-full focus:border-0 focus:outline-gray-200"
//               placeholder="Email"
//             />
//             {/* password field */}
//             <label className="label">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="input rounded-full focus:border-0 focus:outline-gray-200"
//               placeholder="Password"
//             />
//             <div>
//               <a className="link link-hover">Forgot password?</a>
//             </div>
//             <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600">
//               Register
//             </button>
//           </fieldset>
//         </form>

//         <button
//           onClick={handleGoogleSignIn}
//           className="btn bg-white rounded-full text-black border-[#e5e5e5]"
//         >
//           <FaGoogle />
//           Login with Google
//         </button>
//         <p className="text-center">
//           Already have an account? Please{" "}
//           <Link className="text-blue-500 hover:text-blue-800" to="/auth/login">
//             Login
//           </Link>{" "}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa6";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // 🔹 Handle email/password registration
  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User created:", user);

        // Update profile info (name + photo)
        updateUserProfile(displayName, photoURL)
          .then(() => {
            toast.success("User created successfully!", { id: "create-user" });
            navigate("/"); // ✅ Redirect to home page
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update profile", { id: "create-user" });
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, { id: "create-user" });
      });
  };

  // 🔹 Handle Google Sign In
  const handleGoogleSignIn = () => {
    toast.loading("Signing in with Google...", { id: "create-user" });
    signInWithGoogle()
      .then((result) => {
        console.log("Google user:", result.user);
        toast.success("Signed in successfully!", { id: "create-user" });
        navigate("/"); // ✅ Redirect to home page
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, { id: "create-user" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

          <form onSubmit={handleRegister}>
            <fieldset className="fieldset space-y-2">
              <label className="label">Name</label>
              <input
                type="text"
                name="displayName"
                required
                className="input rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Full Name"
              />

              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                className="input rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Profile Picture URL"
              />

              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                required
                className="input rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Email"
              />

              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                required
                className="input rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Password"
              />

              <button className=" btn btn-xs text-right  bg-linear-to-r from-green-500 to-green-800 text-white">
                Register
              </button>
            </fieldset>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white rounded-full text-black border-[#e5e5e5] hover:bg-gray-100"
          >
            <FaGoogle className="text-red-500" />
            Login with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              className="text-blue-500 font-semibold hover:text-blue-800"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
