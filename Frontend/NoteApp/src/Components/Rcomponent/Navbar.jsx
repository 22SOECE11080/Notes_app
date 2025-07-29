import { Link } from "react-router-dom";

const Navbar = () => {
  const isvalid = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const t = JSON.parse(user).username;

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          MyApp
        </Link>
        {/* welcome user */}
        <span className="text-sm">
          {isvalid ? `Welcome, ${t}` : "Please log in"}
        </span>
        {/* Nav Links */}
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {isvalid ? (
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
          {isvalid && (
            <Link
              to="/logout"
              className="hover:underline"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
