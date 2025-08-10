import Lottie from 'lottie-react';
import { Avatar } from 'rte-utils';
import NuclearAnimation from './assets/NuclearAnimation.json';
export function AvatarDemo() {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Avatar</h3>
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'start',
          flexWrap: 'wrap',
          border: '1px solid #ccc',
          padding: '1rem',
        }}
      >
        {/* Text/Initials Avatars */}
        <div>
          <h4>Text/Initials</h4>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <Avatar>JD</Avatar>
            <Avatar>AB</Avatar>
            <Avatar>MK</Avatar>
          </div>
        </div>

        {/* With Images */}
        <div>
          <h4>With Images</h4>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <Avatar>
              <Lottie
                animationData={NuclearAnimation}
                style={{ width: 80, height: 80 }}
                loop={true}
              />
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
