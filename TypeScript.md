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
