import { useParams } from 'react-router-dom';
import { users } from '../../components/db';

const User = () => {
  const { userId } = useParams();
  return (
    <div>
      User with {userId} is named {users[Number(userId) - 1].name}
    </div>
  );
};

export default User;
