# CRYPTO TRACKER

## 5.0 Setup

지금까지 배운 모든 걸 복습하고, React-Query도 배워보자.
[https://api.coinpaprika.com/](https://api.coinpaprika.com/)의 API를 사용한다.
사이트의 구조는 홈페이지에서는 모든 코인들의 정보를 보여주고, /:id 에선 코인의 상세 정보를 보여주는 식이다.
또한 중첩 라우터의 사용도 알아볼 것이다.

우선 routes 폴더 안에 Coin.tsx, Coins.tsx를 생성해주자.

```JavaScript
function Coin() {
  return <h1>Coin</h1>;
}
export default Coin;


function Coins() {
  return <h1>Coins</h1>;
}
export default Coins;

```

이제 새로운 라우터도 만들어주자. Router.tsx 파일을 생성하자. 강의에서는 router5.4를 사용하지만 나는 최신버전과 createBrowserRouter API를 사용할 것이다.

```JavaScript
import { createBrowserRouter } from 'react-router-dom';
import Coins from './Coins';
import Coin from './Coin';

const router = createBrowserRouter([
  { path: '/', element: <Coins /> },
  {
    path: '/:coinId',
    element: <Coin />,
  },
]);

export default router;


import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

```

Coin 컴포넌트에서 coinId를 캐치하고 싶다면 useParams 훅을 사용하면 된다.

```JavaScript
import { useParams } from 'react-router-dom';

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();

  return <h1>Coin: {coinId}</h1>;
}
export default Coin;

```

## 5.1 Styles

styled-reset이라는 패키지를 사용해서 스타일을 리셋할 수 있다. 하지만 styled-component를 통해서도 리셋할 수 있다. createGlobalStyle이라는 API를 사용할수 있다.

```JavaScript
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{margin: 0; padding: 0;}
li{list-style: none;}
a{color:inherit; text-decoration: none;}
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

```

이제 구글 폰트에서 폰트를 import하자. GlobalStyle 맨 위에 import 하면 적용된다.

```JavaScript
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  *{margin: 0; padding: 0;}
  li{list-style: none;}
  a{color:inherit; text-decoration: none;}
    body{
    font-family: 'Source Sans Pro', sans-serif;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

```

이제 theme을 설정해주자.

typescript 파트에서 한것과 같이 styled.d.ts 파일을 만들자.

```JavaScript
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}

```

그리고 flat ui colors 라는 사이트에서 색상을 뽑아 선택하자.

```JavaScript
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  bgColor: '#2c3e50',
  textColor: '#ecf0f1',
  accentColor: '#f1c40f',
};

```

이제 ThemeProvider를 index.tsx에 적용하자.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

```

이제 App은 theme에 접근 가능하다. 그러므로 GlobalStyle에도 theme을 적용 가능하다.

```JavaScript
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  *{margin: 0; padding: 0;}
  li{list-style: none;}
  a{color:inherit; text-decoration: none;}
  body{
    font-family: 'Source Sans Pro', sans-serif;
    background-color:${(props) => props.theme.bgColor};
    color:${({ theme }) => theme.textColor};
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

```

이제 Coins 에 가서 style을 적용해주자.

```JavaScript
import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.accentColor};
`;

function Coins() {
  return <Title>Coins</Title>;
}
export default Coins;

```

## 5.2 Home part One

일단 Coins에 styled components를 만들어주자.

```JavaScript
import styled from 'styled-components';

const Container = styled.div``;

const Header = styled.header``;

const CoinList = styled.ul``;

const Coin = styled.li``;

const Title = styled.h1`
  color: ${({ theme }) => theme.accentColor};
`;

function Coins() {
  return (
    <Container>
      <Header>
        <Title>Coins</Title>;
      </Header>
      <CoinList>
        <Coin></Coin>
      </CoinList>
    </Container>
  );
}
export default Coins;

```

그리고 coinPaprika의 API를 기반으로 우리가 코인을 가졌다고 가정해보자.

```JavaScript
const coins = [
  {
    id: 'btc-bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    rank: 1,
    is_new: false,
    is_active: true,
    type: 'coin',
  },
  {
    id: 'eth-ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    rank: 2,
    is_new: false,
    is_active: true,
    type: 'coin',
  },
  {
    id: 'usdt-tether',
    name: 'Tether',
    symbol: 'USDT',
    rank: 3,
    is_new: false,
    is_active: true,
    type: 'token',
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinList>
        {coins.map((coin) => (
          <Coin key={coin.id}>{coin.name}</Coin>
        ))}
      </CoinList>
    </Container>
  );
}
export default Coins;

```

이제 스타일을 조금 적용해보자.

```JavaScript
const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${({ theme }) => theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.accentColor};
  font-size: 48px;
`;
```

코인 개별을 클릭하면 이동하게 하기 위해 Link도 추가해주자.

```JavaScript
     {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
```

스타일도 적용하는데 Link 태그는 a태그로 타게팅 가능하다.

```JavaScript
const Coin = styled.li`
  background-color: white;
  color: ${({ theme }) => theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  &:hover {
    a {
      color: ${({ theme }) => theme.accentColor};
    }
  }
`;
```

a 태그에 transition을 주고 Link 태그가 li 태그를 꽉채우게 display:block 속성을 준다.

```JavaScript
const Coin = styled.li`
  background-color: white;
  color: ${({ theme }) => theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  a {
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${({ theme }) => theme.accentColor};
    }
  }
`;
```

## 5.3 Home part Two

이제 API에서 데이터를 가져오자.
