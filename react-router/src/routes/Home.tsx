import { users } from '../components/db';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((val) => (
          <li key={val.id}>
            <Link to={`/users/${val.id}`}>{val.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
