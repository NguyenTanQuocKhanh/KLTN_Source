import { getVideoDurationInSeconds } from 'get-video-duration';

export const getVideoDuration = async (path: string) => {
  return await getVideoDurationInSeconds(path);
};
