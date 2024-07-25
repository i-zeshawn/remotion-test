import React from 'react';
import { useCurrentFrame, interpolate, useVideoConfig, spring } from 'remotion';

const MyVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const pathLength = 2500;
  const pathProgress = interpolate(frame, [0, 100], [0, pathLength], {
    extrapolateLeft: 'extend',
    extrapolateRight: 'extend',
  });
  const zoomOutSpringBeginning = spring({
    frame,
    fps,
    from:2,
    to: 1,
    config: {
      damping: 500,
      stiffness: 500,
      mass: 1,
    },
  });

  const zoomOutSpringEnd = spring({
    frame: frame - 50,
    fps,
    from: 1.5,
    to: 1,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 1,
    },
  });

  const beginningOpacity = interpolate(frame, [0, 40], [0, 1.5]);
  const middleOpacity = interpolate(frame, [40, 80], [0, 1]);
  const endOpacity = interpolate(frame, [80, 100], [0, 1]);
  const thatsItOpacity = interpolate(frame, [90, 100], [0, 1]);
  const scale = frame < 40 ? zoomOutSpringBeginning : frame < 80 ? 2 : frame < 100 ? zoomOutSpringEnd : null;
  const drawPathStyle = {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength - pathProgress,
  };
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', width: '100%', height: '100%', position: 'relative', transform: `scaleX(${scale})` }}>
      <svg width={width} height={height} viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
        <path id="wavyPath"d="M3,1100 C700,50 900,50 1520,1100"  stroke="yellow" strokeWidth="10" fill="none" style={drawPathStyle} />
        <text fill="white" fontSize="50" fontWeight="bold" opacity={beginningOpacity}>
          <textPath href="#wavyPath" startOffset="5%">
            BEGINNING
          </textPath>
        </text>
        <text fill="white" fontSize="50" fontWeight="bold" opacity={middleOpacity}>
          <textPath href="#wavyPath" startOffset="45%">
            MIDDLE
          </textPath>
        </text>
        <text fill="white" fontSize="50" fontWeight="bold" opacity={endOpacity}>
          <textPath href="#wavyPath" startOffset="90%">
            END
          </textPath>
        </text>
        <text fill="yellow" fontSize="100" fontWeight="bold" opacity={thatsItOpacity} x="780" y="580" textAnchor="middle">
          THAT'S IT!
        </text>
      </svg>
    </div>
  );
};

export default MyVideo;
