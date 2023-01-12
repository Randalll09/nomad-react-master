import { useParams, Outlet, Link } from 'react-router-dom';
import { users } from '../../components/db';

const User = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1>
        User with {userId} is named {users[Number(userId) - 1].name}
      </h1>
      <hr />
      <Link to="followers">See Followers</Link>
      <Outlet context={{ nameOfUser: users[Number(userId) - 1].name }} />
    </div>
  );
};

export default User;
