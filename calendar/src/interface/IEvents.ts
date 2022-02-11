export interface IEventItem {
  id: number | string;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  isCustom?: boolean;
  eventType?: string;
  bizType?: string;
  bizData?: any;
}

export type ICollaborationItemParams = {
  participateTypes: string[];
  startTime: string;
  endTime: string;
  groupMemberId: number;
  deliveryProjectIds: number[];
  itemTypes: string[];
};

export interface ICollaborationItemResult {
  id: number;
  name: string;
  projectId: number;
  projectName: string;
  type: string;
  statusId: number;
  statusName: string;
  statusType: string;
  overdue?: boolean;
  startTime?: string;
  endTime?: string;
  actualHours?: string;
  creator?: number;
  creatorName?: string;
  assignedUserId?: number;
  assignedUserName?: string;
  mode?: string;
  subType?: string;
}
