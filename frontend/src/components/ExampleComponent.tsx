// Example of using the Auth context in any component
import { useAuth } from "../utils/AuthContext";

const ExampleComponent = () => {
  const { userId, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome!</h2>
          <p>Your user ID is: {userId}</p>
          {/* Other authenticated content */}
        </div>
      ) : (
        <div>
          <p>Please log in to view this content</p>
        </div>
      )}
    </div>
  );
};

export default ExampleComponent;
