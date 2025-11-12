import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa6";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value.trim();
    const photoURL = event.target.photoURL.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User created:", user);
        updateUserProfile(displayName, photoURL)
          .then(() => {
            toast.success("User created successfully!", { id: "create-user" });
            navigate("/");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update profile", { id: "create-user" });
          });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use", { id: "create-user" });
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address", { id: "create-user" });
        } else {
          toast.error(error.message, { id: "create-user" });
        }
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Signing in with Google...", { id: "create-user" });
    signInWithGoogle()
      .then((result) => {
        console.log("Google user:", result.user);
        toast.success("Signed in successfully!", { id: "create-user" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google sign-in failed", { id: "create-user" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

          <form onSubmit={handleRegister}>
            <fieldset className="fieldset space-y-2">
              <label className="label text-black">Name</label>
              <input
                type="text"
                name="displayName"
                required
                className="input focus:border-0 focus:outline-gray-200"
                placeholder="Full Name"
              />

              <label className="label text-black">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                className="input focus:border-0 focus:outline-gray-200"
                placeholder="Profile Picture URL"
              />

              <label className="label text-black">Email</label>
              <input
                type="email"
                name="email"
                required
                className="input focus:border-0 focus:outline-gray-200"
                placeholder="Email"
              />

              <label className="label text-black">Password</label>
              <input
                type="password"
                name="password"
                required
                className="input focus:border-0 focus:outline-gray-200"
                placeholder="Password"
              />

              <button
                type="submit"
                className="btn btn-sm w-full bg-gradient-to-r from-green-500 to-green-800 text-white mt-3"
              >
                Register
              </button>
            </fieldset>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-sm w-full bg-gradient-to-r from-green-500 to-green-800 text-white flex items-center justify-center gap-2"
          >
            <FaGoogle />
            Login with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              className="text-blue-500 font-semibold hover:text-blue-800 underline"
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

