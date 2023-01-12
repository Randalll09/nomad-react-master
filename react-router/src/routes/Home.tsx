import { users } from '../components/db';
import { Link, useSearchParams } from 'react-router-dom';

function Home() {
  const [readSearchParams, setSearchParams] = useSearchParams();

  setTimeout(() => {
    setSearchParams({
      day: 'today',
      tomorrow: '123',
    });
  }, 3000);
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
