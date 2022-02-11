export const DRAFT_EVENT = 'draft-event';

export enum ParticipateTypesEnum {
  ASSIGN = 'assign',
  CREATE = 'create',
  CONCERN = 'concern',
}
export const ParticipateTypesMap = {
  [ParticipateTypesEnum.ASSIGN]: '我负责的',
  [ParticipateTypesEnum.CREATE]: '我创建的',
  [ParticipateTypesEnum.CONCERN]: '我关注的',
};

export enum CalendarTypesEnum {
  MY_CALENDAR = 'myCalendar',
  My_TEAM_CALENDAR = 'myTeamCalendar',
}
export const CalendarTypesMap = {
  [CalendarTypesEnum.MY_CALENDAR]: '我的日历',
  [CalendarTypesEnum.My_TEAM_CALENDAR]: '我团队的日历',
};

export const COLLABORATION_MATTER = 'collaborationMatter';
