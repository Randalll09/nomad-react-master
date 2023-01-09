# TYPESCRIPT

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

8:08
