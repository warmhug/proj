
export interface IProps {
  parentRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  visible: boolean;
  getSelectedNode: () => HTMLDivElement | null;
  onVisibleChange: (visible: boolean) => void;
}