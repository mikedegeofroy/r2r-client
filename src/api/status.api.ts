import { SERVER_API } from '@/lib/constants';
import axios from 'axios';

interface StatusResponse {
  id: string;
  status: 'Failed' | 'InQueue' | 'InProgress' | 'Completed';
  url: string;
}

export const getStatus = async (id: string) => {
  console.log('getting status')
  return await axios.get<StatusResponse>(`${SERVER_API}/avatar/status?id=${id}`);
};
