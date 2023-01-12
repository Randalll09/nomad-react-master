# TypeScript

## 3.1 DefinitelyTyped

npx create-react-app my-app --template typescript

로 새 프로젝트를 연다.

타입스크립트의 확장명은 ts, 리액트에선 tsx이다.

타입스크립트 파일에 ThemeProvider를 import 하면 에러가 난다.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from 'styled-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

타입스크립트는 styled-components가 정확히 뭔지 읽어내지 못해서 오류가 난 것이다. 이는 해당 패키지가 자바스크립트 기반이라서 그렇다. styled-components는 npm install @types/styled-components 로 인스톨해주자. 그럼 이제 styled-components에서 import 해올수 있다.

여기서 @types는 무엇일까. 패키지 중에 자바스크립트르르 위해 만들어진 패키지를 타입스크립트 용으로 사람들이 개발한 것이다. 그럼 typescript에서는 그 패키지를 사용할 수 있게 된다.

만약 없으면 DefinitelyTyped를 사용할수도 있다. 이곳에서는 typescript에서 사용하는 거의 모든 definition을 이용할 수 있다.

## 3.2 Typing the Props

이제는 component에게 type을 알려주는 방법을 배워보자.

typescript에게 component가 필요로 하는 prop을 알려주는 것이다. 그렇게 하면 prop에 오타를 냈을 때 타입스크립트의 보호를 받게 된다.

Circle.tsx 라는 컴포넌트를 하나 생성해주자.

```JavaScript
import styled from 'styled-components';

const Container = styled.div``;

function Circle() {
  return <Container></Container>;
}

export default Circle;

```

그리고 App.tsx에 import 하자.

```JavaScript
import styled from 'styled-components';
import Circle from './Circle';

function App() {
  return (
    <div>
      <Circle />
    </div>
  );
}

export default App;

```

이제 Circle에 어떤 prop이 들어가야 할지 알려주자. React 자체의 Prop Type은 prop의 존재여부를 알 수 있지만 코드가 실행된 뒤에만 알려준다. 하지만 typescript는 코드가 실행되기 전에 우리에게 경고를 해준다.

Circle에 bgColor 라는 prop을 받아오게 해보자.

```JavaScript
import styled from 'styled-components';

const Container = styled.div``;

function Circle({ bgColor }) {
  return <Container></Container>;
}

export default Circle;

```

그럼 bgColor부분이 오류가 난다. type 선언을 해주지 않았기 때문이다. 그럼 이제 interface라는 것을 해보자. interface란 객체의 모양을 타입스크립트에게 설명해주는 의미이다. 아래와 같이 할 수도 있다.

```JavaScript
const x = (a: number, b: number) => a + b;

```

하지만 interface는 약간 다르다. interface는 아래와 같이 적으면 된다.

```JavaScript
import styled from 'styled-components';

const Container = styled.div``;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container></Container>;
}

export default Circle;

```

만약 Circle({bgColor,x}:CircleProps)와 같이 적으면 CircleProps interface에 x는 존재하지 않기 때문에 에러가 난다. 그럼 아래와 같이 수정해보자.

```JavaScript
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ bgColor }) => bgColor};
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor}></Container>;
}

export default Circle;

```

그런데 bgColor 라는 attribute가 여전히 에러가 난다. 타입스크립트의 입장에서 Container는 div이다. 그러므로 bgColor를 styled-components에도 보내고 싶다고 선언해야 한다. 이번에는 ContainerProps라는 새로운 인터페이스를 생성해보자.

```JavaScript
interface ContainerProps {
  bgColor: string;
}
```

ContainerProps를 사용하기 위해서는 아래와 같이 붙여주면 된다.

```JavaScript
import styled from 'styled-components';

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  background-color: ${({ bgColor }) => bgColor};
  width: 100px;
  height: 100px;
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor}></Container>;
}

export default Circle;

```

더 이상 에러가 나지 않는다.

interface의 또 다른 예시를 보자.

```JavaScript
interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} you are ${playerObj.age} years old`;

sayHello({ name: 'Randall', age: 28 });

sayHello({ name: 'Randall', age: 28, hello:1 });

```

위의 sayHello 함수는 오류가 없지만 아래의 함수는 interface에 hello가 없기 때문에 오류가 난다.

## 3.3 Optional Props

default prop과 optional prop에 대해 알아보자.

```JavaScript
import styled from 'styled-components';

interface CircleProps {
  bgColor: string;
}

const Container = styled.div<CircleProps>`
  background-color: ${({ bgColor }) => bgColor};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor}></Container>;
}

export default Circle;

```

전에 짠 코드에서 CircleProps의 bgColor는 required 상태이다.

```JavaScript
    <div>
      <Circle />
      <Circle bgColor={'red'} />
    </div>
```

위의 Circle 컴포넌트에서 bgColor를 보내지 않기 때문에 오류가 난다.

위와 다르게 prop을 optional로 받고 싶으면 어떻게 해야할까. interface의 prop명뒤에 물음표를 아래와 같이 붙여주면 된다.

```JavaScript
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}
```

위 interface에서 borderColor는 이제 optional하다. 하지만 styled-components에서는 required 상태이다.

```JavaScript
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  background-color: ${({ bgColor }) => bgColor};
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.borderColor};
`;

function Circle({ bgColor, borderColor }: CircleProps) {
  return <Container borderColor={borderColor} bgColor={bgColor}></Container>;
}

export default Circle;

```

위와 같이하면 Container에서는 borderColor가 필수기 때문에 에러가 난다. 그러므로 borderColor를 불러오지 않을 때를 대비해 초깃값을 설정해주자.

```JavaScript
function Circle({ bgColor, borderColor }: CircleProps) {
  return (
    <Container
      borderColor={borderColor ?? bgColor}
      bgColor={bgColor}
    ></Container>
  );
}
```

여기서 ??은 Null 병합 연산자 (Nullish coalescing operator)이다.

??앞에 값이 null이거나 undefined이면 오른쪽 값을, 그렇지 않으면 왼쪽 값을 반환하는 논리연산자이다.

```JavaScript
null ?? "hello" // "hello"
undefined ?? "hello" // "hello"
"hi" ?? "hello" // "hi"
```

## 3.4 State

타입스크립트로 state 관리를 해보자.

```JavaScript
  const [counter, setCounter] = useState(1);

  setCounter(2);
  setCounter('h');
```

위와 같이 초깃값을 넣어주면 타입스크립트는 counter와 setCounter가 자동으로 항상 number 값을 가질거라고 예상한다. 고로 위의 setCounter는 오류가 나지 않지만 아래의 setCounter는 오류가 난다. 이번에는 state가 number 또는 string 값을 가진다고 정해보자.

```JavaScript
  const [value, setValue] = useState<number | string>(0);
  setValue(2);
  setValue('val');
  setValue(true);
```

위의 두 함수는 오류가 나지 않지만 맨 아래의 함수는 오류가 난다.

## Forms

이번에는 리액트와 타입스크립트를 활용해 Form을 만들어보자.

```JavaScript
import { useState } from 'react';
import styled from 'styled-components';

function App() {
  const [username, setUsername] = useState('');

  const onChange = (e) => {};

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="user name"
          value={username}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;

```

그런데 작성하고 나면 onChange함수의 prop에 오류가 난다. any 타입이기 때문이다. 최대한 any 타입을 넣지 않도록 하자. 타입스크립트에서 이벤트의 타입을 지정해보자.

```JavaScript
  const onChange = (e:React.FormEvent) => {};

```

이러한 이벤트 정의를 혼자 알기는 거의 불가능하다. 이럴 때는 늘 구글링을 해야한다. 또는 syntheticEvent를 찾아보자.

그리고 어떠한 element가 이 이벤트를 발생시키는지 특정해주자.

```JavaScript
  const onChange = (e:React.FormEvent<HTMLInputElement>) => {};

```

그럼 타입스크립트는 InputElement가 이벤트를 실행시킨단 걸 알게 된다.

또한 타입스크립트에선 target 대신 currentTarget으로 이벤트 값을 불러온다.

```JavaScript
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

```

이제 onChange 함수를 완성시키자.

```JavaScript
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setUsername(value);
  };
```

이번엔 버튼을 누르고 submit 하는 방법에 대해 알아보자.

```JavaScript
import { useState } from 'react';
import styled from 'styled-components';

function App() {
  const [username, setUsername] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setUsername(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello', username);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="user name"
          value={username}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;

```

아까의 응용을 하면 쉽다.

## 3.6 Themes

이번에는 타입스크립트를 styled-components의 theme과 접목해보자.

@types/styled-components 에는 타입스크립트에게 styled-components를 설명해주는 index.d.ts 라는 파일이 있다. theme을 사용해주기 위해 우리도 declaration 파일을 하나 만들자. src 폴더 안에 styled.d.ts 파일을 만들면 된다. 이 파일은 전에 있던 파일을 덮어쓴다.
[https://styled-components.com/docs/api#typescript](https://styled-components.com/docs/api#typescript)에 접속해서 아래 코드를 복사 붙여넣기 하자.

```JavaScript
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}

```

그리고 아래와 같이 수정하자.

```JavaScript
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}

```

이번에는 theme.ts를 만들어주고 theme을 설정하자. 테마의 속성은 위의 DefaultTheme과 같은 속성을 가져야 한다.

```JavaScript
import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  bgColor: 'white',
  textColor: 'black',
  btnColor: 'tomato',
};

export const darkTheme: DefaultTheme = {
  bgColor: 'black',
  textColor: 'white',
  btnColor: 'teal',
};

```

이제 ThemeProvider를 index 파일에 import 하자.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

한번 theme을 사용해보자.

```JavaScript
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
`;
const H1 = styled.h1`
  color: ${({ theme }) => theme.textColor};
`;

function App() {
  return (
    <div>
      <Container>
        <H1>Hello</H1>
      </Container>
    </div>
  );
}

export default App;

```
