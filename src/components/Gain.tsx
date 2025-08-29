import { useState } from 'react';
import './Gain.css';

export function Gain() {
  const [points, setPoints] = useState<number | null>(null);

  const handleGainPoints = () => {
    setPoints(200); // example
    setTimeout(() => setPoints(null), 2000); // hide after 2s
  };

  return (
    <div className="gain">
      <button onClick={handleGainPoints}>Gain 200</button>

      <div className="score-area">{points && <div className="points">+{points}</div>}</div>
    </div>
  );
}
