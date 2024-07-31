import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  return (
    <div className="w-fit mx-auto flex flex-col gap-3">
      <img
        src={`http://localhost:3000/${user.user.imageURL}`}
        className="rounded-full w-36"
      />
      <div className="font-bold">
        Email: <span className="text-sm font-normal">{user.user.email}</span>
      </div>
      <div className="text-sm font-bold">
        Id: <span className="text-sm font-normal">{user.user._id}</span>
      </div>
    </div>
  );
};

export default Home;
