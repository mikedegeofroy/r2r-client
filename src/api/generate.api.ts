import { SERVER_API } from '@/lib/constants';
import axios from 'axios';

interface GenerateImageResponse {
  id: string;
}

export const generateImage = async (
  url: string,
  color: string,
  backgroundColor: string
) => {
  return await axios.post<GenerateImageResponse>(
    `${SERVER_API}/avatar/generate`,
    {
      url,
      color,
      backgroundColor,
    }
  );
};
