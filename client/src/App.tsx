import React from 'react';
import Header from './components/header';
import Content from './pages/content';
import { Toaster } from './components/ui/toast/toaster';

const App : React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen gap-4">
      <Header />
      <Content />
      <Toaster />
    </div>
  );
}

export default App;