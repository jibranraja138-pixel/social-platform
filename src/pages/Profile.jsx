import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Profile</h1>

      <h3>{user.name}</h3>

      <p>{user.email}</p>
    </div>
  );
}

export default Profile;