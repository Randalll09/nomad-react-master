# React Router

## 4.1 BrowserRouter

우리가 이 섹션에서 배워볼 기능은 BrowserRouter이다. react-router-dom을 설치하자.

일단 BrowserRouter의 실행법을 알아보자. Home.tsx와 About.tsx 를 생성하자.

```JavaScript
function Home() {
  return <h1>Home</h1>;
}

export default Home;


function About() {
  return <h1>About</h1>;
}

export default About;

```

그리고 Header.tsx 파일도 만들자.

```JavaScript
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <h1>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/About'}>About</Link>
        </li>
      </ul>
    </h1>
  );
};

export default Header;

```

이제 BrowserRouter를 쓸 준비가 되었다. Router.tsx 파일을 생성하자. 우선 BrowserRouter 안에 Header를 넣어주자. Link 요소는 Router 안에서만 사용가능하다.

```JavaScript
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

function Router() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default Router;

```

그리고 안에 Route을 생성하자.

```JavaScript
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';
import About from './About';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

```

## 4.2 createBrowserRouter

위의 방식 외에도 BrowserRouter를 생성하는 방식이 하나더 있는데, createBrowserRouter API를 사용하는 것이다. Router.tsx의 모든 요소를 지우고 아래와 같이 쓴다.

```JavaScript
const router = createBrowserRouter();

```

이 함수는 Router를 array로 받아올수 있게 한다. 제일 먼저 들어가는 건 홈페이지가 아닌 렌더링하는 App component 이다. (강의에서는 이해를 위해 Root로 수정)

```JavaScript
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

export default router;
```

이제 index.tsx로 가서 파일을 수정해주자.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import {RouterProvider} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider/>
  </React.StrictMode>
);

```

RouterProvider는 router라는 prop을 가진다.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

```

다시 Router 파일로 돌아가자.

```JavaScript
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

```

path의 '/'는 부모로, Home, About은 자식으로 생각하면 된다.

```JavaScript
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home /> },
      { path: 'About', element: <About /> },
    ],
  },
]);

```

하지만 위와 같이 해도 계속 Root 만 렌더링 된다. 이때 Outlet을 써야한다. Root 요소로 들어가 Outlet 컴포넌트를 추가해주자.

```JavaScript
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default Root;

```

그러면 이제 라우팅이 잘 된다. Root 안에 Header를 넣으면 Header가 모든 페이지에서 보인다.

```JavaScript
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function Root() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;

```

## 4.3 errorElement

reacr-router-dom의 좋은 기능은 errorElement를 만들 수 있단 점이다. NotFound.tsx 파일을 생성해보자.

```JavaScript
const NotFound = () => {
  return <h1>404 Not Found</h1>;
};

export default NotFound;

```

그리고 router에 errorElement를 추가해주자.

```JavaScript
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Root from '../Root';
import NotFound from './NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home /> },
      { path: 'About', element: <About /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;

```

이제 라우터에 존재하지 않는 페이지를 가면 NotFound 가 렌더링 된다. 또한 이 에러는 컴포넌트가 충돌 할 때도 나타난다. Home 컴포넌트를 충돌 시켜보자.

```JavaScript
function Home() {
  const users: any = [];
  return <h1>{users[0].name}</h1>;
}

export default Home;

```

그리고 ErrorComponent.tsx 파일을 만들자.

```JavaScript
const ErrorComponent = () => {
  return <h1>This Component Crashed</h1>;
};

export default ErrorComponent;

```

마지막으로 ErrorComponent를 라우터에 추가해주자.

```JavaScript
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Root from '../Root';
import NotFound from './NotFound';
import ErrorComponent from '../components/ErrorComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home />, errorElement: <ErrorComponent /> },
      { path: 'About', element: <About /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;

```

이제 홈으로 가면 헤더는 제대로 나오지만 홈에는 ErrorComponent 가 렌더링 된다. 이렇게 하면 하나의 컴포넌트가 충돌해도 다른 페이지들은 보호되고, 접속 가능해진다.

## 4.4 useNavigate

useNavigate은 유저를 어디론가 보낸다. 다른페이지로 보내는데는 2가지 방법이 있는데, Link와 useNavigate이다. Link는 클릭을 요한다. 만약 클릭이외의 방식으로 유저를 이동시키고 싶으면 useNavigate을 사용하면 된다.

Header.tsx에 onAboutClick 이라는 함수를 하나 추가해주자.

```JavaScript
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const onAboutClick = () => {
    navigate('/about');
  };

  return (
    <h1>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <button onClick={onAboutClick}>About</button>
        </li>
      </ul>
    </h1>
  );
};

export default Header;

```

About은 버튼 이지만 여전히 클릭시 About으로 이동한다.

## 4.5 useParams

먼저 간단한 유저 데이터 베이스를 만들어보는 걸로 시작하자. db.ts 파일을 만들자.

```JavaScript
export const users = [
  { id: 1, name: 'Randall' },
  { id: 2, name: 'Nico' },
];

```

이 유저들을 Home에 렌더해보자.

```JavaScript
import { users } from '../components/db';

function Home() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((val) => (
          <li key={val.id}>{val.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

```

이 유저에 대한 정보를 더 보기 위한 링크를 만들어보자.

```JavaScript
       {users.map((val) => (
          <li key={val.id}>
            <Link to={`/users/${val.id}`}>{val.name}</Link>
          </li>
        ))}
```

이제 첫 링크를 누르면 /users/1로 이동한다. User.tsx 파일을 만들어 유저 페이지를 만들자.

```JavaScript
const User = () => {
  return <div>User</div>;
};

export default User;

```

라우터에도 추가해주자.

```JavaScript
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Root from '../Root';
import NotFound from './NotFound';
import ErrorComponent from '../components/ErrorComponent';
import User from './users/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home />, errorElement: <ErrorComponent /> },
      { path: 'About', element: <About /> },
      { path: '/users/:userId', element: <User />, errorElement: <NotFound /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;

```

이제 url의 정보를 가져오는 법을 알아보자. User.tsx로 와 파일을 수정하자.

```JavaScript
import { useParams } from 'react-router-dom';

const User = () => {
  const params = useParams();
  return <div>User</div>;
};

export default User;

```

params안에는 우리가 다이내믹 url 아이디로 넣은 값이 저장되어있다.

```JavaScript
import { useParams } from 'react-router-dom';

const User = () => {
  const { userId } = useParams();
  return <div>User {userId}</div>;
};

export default User;

```

아래와 같이 하면 정보를 불러올수 있다.

```JavaScript
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

```

## 4.6 Outlet

다시 한 번 짚고 넘어가자면 Outlet은 자식 라우트의 요소들을 렌더링한다. User.tsx 파일에 Outlet을 추가해주자.

```JavaScript
import { useParams, Outlet } from 'react-router-dom';
import { users } from '../../components/db';

const User = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1>
        User with {userId} is named {users[Number(userId) - 1].name}
      </h1>
      <hr />
      <Outlet />
    </div>
  );
};

export default User;

```

하지만 현재 라우터에서 User 컴포넌트 밑의 자식 요소는 없으므로 Outlet은 렌더링 되지 않는다. Followers.tsx 라는 파일을 하나 만들자.

```TypeScript

const Followers = () => {
  return <h1>Followers</h1>;
};

export default Followers;


```

그리고 라우터에 추가해주자.

```JavaScript
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home />, errorElement: <ErrorComponent /> },
      { path: 'About', element: <About /> },
      {
        path: '/users/:userId',
        element: <User />,
        children: [
          {
            path: 'followers',
            element: <Followers />,
          },
        ],
        errorElement: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;


```

User에도 followers로 갈 링크를 추가하자.

```JavaScript
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
      <Outlet />
    </div>
  );
};

export default User;

```

## 4.7 useOutletContext

이제 Followers는 User안에 렌더링 된다. 그런데 만약 User의 정보를 Followers에 넘기고 싶을 땐 어떡해야 할까.

방법중 하나는 useParams를 사용하는 거고, 다른 방법은 useOutletContext를 사용하는 것이다. User.tsx로 가서 context prop을 추가해주자.

```JavaScript
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

```

이렇게 하면 모든 Outlet으로 렌더링 되는 요소들에게 전부 context를 보낸다. 그럼 Followers 에서는 context를 어떻게 받을까.

```JavaScript
import { useOutletContext } from 'react-router-dom';

const Followers = () => {
  const ctx = useOutletContext();
  return <h1>Followers</h1>;
};

export default Followers;

```

ctx는 {nameOfUser:name}을 받아온다. 이제 interface를 생성하고 렌더링 시키자.

```JavaScript
import { useOutletContext } from 'react-router-dom';

interface FollowerContext {
  nameOfUser: string;
}

const Followers = () => {
  const ctx = useOutletContext<FollowerContext>();
  return <h1>{ctx.nameOfUser}'s' Followers</h1>;
};

export default Followers;

```

## 4.8 Extras

useSearchParams를 사용해보자. 이 hook은 search 파라미터를 수정 할 수 있게 해준다. Home에 useSearchParams를 추가해보자. useSearchParams는 두 요소가 있는 배열을 반환한다.

```JavaScript
import { users } from '../components/db';
import { Link, useSearchParams } from 'react-router-dom';

function Home() {
  const [readSearchParams, setSearchParams] = useSearchParams();
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

```

readSearchParams는 URLSearchParams라는 class를 반환한다. 이는 자바스크립트 자체에서 제공하는 API다.

[https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

위 링크에서 메소드에 대한 더 많은 정보를 볼 수 있다.

readSearchParams.has("param")은 param이란 파라미터의 여부를 체크하고, readSearchParams.get("param")은 param이란 파라미터가 어떤 값을 갖는지 반환한다.

setSearchParams 함수는 파라미터를 변경하기도 한다.

```JavaScript
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

```

3초뒤 url이 "/"에서 "/?day=today&tomorrow=123" 로 변경되는 걸 볼 수 있다.
