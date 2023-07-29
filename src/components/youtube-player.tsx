import YtHelper from "youtube-player";
import { FC, useEffect, useRef } from "react";

type Props = {
  videoId: string;
  options?: object;
};

export const YoutubePlayer: FC<Props> = ({ videoId, options }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      YtHelper(videoRef.current, {
        videoId,
        playerVars: options,
      });
    }
  }, [options, videoId]);

  return <div ref={videoRef}></div>;
};
