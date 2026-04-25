import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        AI Notes Hub
      </h1>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Signup
        </Link>

        <Link
          to="/login"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;