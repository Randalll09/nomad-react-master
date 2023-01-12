import { useOutletContext } from 'react-router-dom';

interface FollowerContext {
  nameOfUser: string;
}

const Followers = () => {
  const ctx = useOutletContext<FollowerContext>();
  return <h1>{ctx.nameOfUser}'s' Followers</h1>;
};

export default Followers;
