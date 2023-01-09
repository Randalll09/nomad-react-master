# Styled Components

## 2.0 Why Styled Components

Styled Components는 여타 다른 리액트의 스타일링 방식보다도 획기적이다. 이번 세션에서는 styled components에 대해 배우고 마지막에는 다크모드, 라이트모드를 구현해 볼 것이다.

## 2.1 Our First Styled Component

우선 styled-components 없이 인라인 스타일링 방식의 코드를 짜보자.

```JavaScript

function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <div style={{ backgroundColor: 'teal', width: 100, height: 100 }}></div>
      <div style={{ backgroundColor: 'tomato', width: 100, height: 100 }}></div>
    </div>
  );
}

export default App;

```

하지만 이 장식은 코드를 읽고 쓰기에 매우 불편하다. styled-components를 한번 사용해보자.

```JavaScript

import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

function App() {
  return (
    <Father className="App">
      <div style={{ backgroundColor: 'teal', width: 100, height: 100 }}></div>
      <div style={{ backgroundColor: 'tomato', width: 100, height: 100 }}></div>
    </Father>
  );
}

export default App;

```

styled-components는 위와 같이 스타일이 포함된 변수를 선언하고 컴포넌트로 사용하면 적용된다. 아래 박스들도 styled-components화 해주자.

```JavaScript
import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Box1 = styled.div`
  width: 100px;
  height: 100px;
  background-color: teal;
`;
const Box2 = styled.div`
  width: 100px;
  height: 100px;
  background-color: tomato;
`;

function App() {
  return (
    <Father className="App">
      <Box1></Box1>
      <Box2></Box2>
    </Father>
  );
}

export default App;

```

div 뿐 아니라 다른 요소들도 styled-components 로 만들수 있다.

```JavaScript
import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Box1 = styled.div`
  width: 100px;
  height: 100px;
  background-color: teal;
`;
const Box2 = styled.div`
  width: 100px;
  height: 100px;
  background-color: tomato;
`;

const Text = styled.span`
  color: white;
`;

function App() {
  return (
    <Father className="App">
      <Box1>
        <Text>1</Text>
      </Box1>
      <Box2>
        <Text>2</Text>
      </Box2>
    </Father>
  );
}

export default App;

```

## 2.2 Adapting and Extending

앞에서 본 box1,2는 배경색만 다르고 다른 요소는 전부 겹친다. 이제 컴포넌트를 변경하고 확장하는 법에 대해 배워보자. 우리는 컴포넌트에 정보를 넘길 때 props를 사용할 것이다.

우선 box1,2를 하나의 컴포넌트, box로 합치고,

```JavaScript
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: teal;
`;
```

각 Box에 props를 보내자.

```JavaScript
      <Box bg="teal" />
      <Box bg="tomato" />
```

그리고 이제 styled-components에서 props를 받게 해보자.

```JavaScript
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bg};
`;
```

이렇게 하면 props를 변수로 넘길 수 있게 된다.

이젠 styled-components를 확장하는 방법에 대해 배워보자.

우선 Circle이라는 컴포넌트를 하나 생성하고 적용해보자.

```JavaScript
import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bg};
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bg};
  border-radius: 50px;
`;

function App() {
  return (
    <Father className="App">
      <Box bg="teal" />
      <Circle bg="tomato" />
    </Father>
  );
}

export default App;

```

위 코드를 보면 Box와 Circle이 중복되는 것을 볼 수 있다. 이미 있는 컴포넌트를 확장 하는 법은 아래와 같다.

```JavaScript
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bg};
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;
```

괋호 안에 기존 컴포넌트를 넣어주면 기존 컴포넌트가 가진 모든 속성을 계승한다.

## 2.3 'As' and Attrs

후에 다수의 컴포넌트를 다룰 때 도움이 될만한 트릭을 배워보자. 컴포넌트의 태그를 바꾸고 싶은데 스타일은 변경하고 싶지 않을 때 어떻게 해야할까.

예시로 스타일링된 버튼을 만들어보자.

```JavaScript
import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return (
    <Father className="App">
      <Btn>Login</Btn>
    </Father>
  );
}

export default App;

```

하지만 모종의 이유로 위의 스타일은 사용하지만 button 태그를 사용하고 싶지 않을 때 어떡해야 할까.

```JavaScript
import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return (
    <Father className="App">
      <Btn>Login</Btn>
      <Btn as="a" href="/">
        Login
      </Btn>
    </Father>
  );
}

export default App;

```

위와 같이 as 속성을 사용하면 위의 Btn은 여전히 button태그이지만, 밑의 Btn은 a태그가 된다.

이번에는 컴포넌트에 attr를 설정하는 법을 알아보자.

```JavaScript
const Input = styled.input.attrs({ required: true, minLength:10 })`
  background-color: tomato;
`;

```

태그 이름 뒤 .attrs({})를 붙이고 대괄호 안에 원하는 attr를 object 형식으로 할당하면 된다.

## 2.4 Animations and Pseudo Selectors

이번에는 애니메이션과 가상선택자를 쓰는 법을 알아보자.

애니메이션은 keyframes를 import 해서 사용하면 된다.

```JavaScript
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
from{
  transform:rotate(0deg)
}
to{
  transform: rotate(360deg);
}
`;

const Box = styled.div`
  height: 100px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
`;

```

또한 styled-components에선 컴포넌트안의 요소를 지정해 줄수 있다.

```JavaScript
const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 46px;
    &:hover {
      font-size: 66px;
    }
  }
`;
```

## 2.5 Pseudo Selectors part Two

styled-components 안의 요소를 선택하는 다른 방법을 보자.

```JavaScript
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const animation = keyframes`
from{
  transform:rotate(0deg);
  border-radius:0px
}
to{
  transform: rotate(360deg);
  border-radius:100px
}
`;

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    &:hover {
      font-size: 66px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

const Emoji = styled.span`
  span {
    font-size: 46px;
    &:hover {
      font-size: 66px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>😘</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;

```

현재 Box 안에서 span 태그,를 선택하고 있기 때문에, Emoji에 as="p" 속성을 주면, hover 이펙트는 적용 되지 않는다. styled-components에서는 직접적으로 컴포넌트를 타게팅 할 수 있다.

```JavaScript
const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Emoji} {
    &:hover {
      font-size: 66px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

const Emoji = styled.span`
  span {
    font-size: 46px;
    &:hover {
      font-size: 66px;
    }
    &:active {
      opacity: 0;
    }
  }
`;
```

위와 같이 하면 Emoji 가 어떤 형식이든 무관하게 타게팅 가능하다.

## 2.7 Themes

테마를 스위치 하는데 반은 styled-components의 역할이고, 다른 반은 local State Management 이다. 우선 Theme 먼저 배워보자.

Theme은 모든 색을 저장해둔 저장소이다.

우선 index.js 파일로 가서 ThemeProvider를 import 하고 App을 감싸주자.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

```

ThemeProvider에는 theme이라는 prop이 필요하다. 아래와 같이 object를 선언해준다.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';

const darkTheme = {
  textColor: 'whitesmoke',
  bgColor: '#111',
};
const lightTheme = {
  textColor: '#111',
  bgColor: 'whitesmoke',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

```

App자체가 ThemeProvider 안에 있기 때문에 components는 색에 접근 가능하다.

```JavaScript
const Wrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.bgColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

```

이렇게 하고 결과물을 보면 다크모드가 된것이 보인다. 이번엔 ThemeProvider의 prop을 lightTheme으로만 바꿔보자. 그럼 색이 반전 된 것을 볼 수 있다. theme을 스위치 하는 방법은 후에 배운다.
