import request from 'umi-request';
import type { IResponse } from '@/interface/IQuery';
import type {
  ICollaborationItemParams,
  ICollaborationItemResult,
} from '@/interface/IEvents';
import { collaborationItem, groupMembersResult, needSignInListMock } from './mockData';

export const getCollaborationList = async (
  params: ICollaborationItemParams,
): Promise<IResponse<ICollaborationItemResult[]>> => {
  const response = await request.post('/calendar/collaborationItem/list', {
    data: params,
  });
  // return response;
  return collaborationItem;
};

export const getGroupMembers = async (): Promise<IResponse<any[]>> => {
  const response = await request.get('/calendar/account/groupMembers', {});
  // return response;
  return groupMembersResult;
};

type needSignInList = {
  date: string;
};
export const getNeedSignInList = async (params: {
  startTime: string;
  endTime: string;
}): Promise<IResponse<needSignInList[]>> => {
  const response = await request.post('/calendar/needSignIn/list', {
    data: params,
  });
  // return response;
  return needSignInListMock;
};
