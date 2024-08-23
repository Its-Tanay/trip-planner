import React from 'react';
import Header from './components/header';
import Content from './pages/content';

const App : React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen gap-4">
      <Header />
      <Content />
    </div>
  );
}

export default App;