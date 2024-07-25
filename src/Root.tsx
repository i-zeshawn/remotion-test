import { Composition } from "remotion";
import MyVideo from "./MyVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
        <Composition
        id="WavyTextAnimation"
        component={MyVideo}
        durationInFrames={110}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
