import React, { useState } from 'react';
import Animation from './components/Animation.jsx';
import './App.css';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <div className="App">
      <Animation width='600px' onComplete={handleAnimationComplete} />
    </div>
  );
}

export default App;
