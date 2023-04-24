import { FC } from "react";

type CourseInfoListProps = {
  children: React.ReactNode;
};

const CourseInfoListContainer: FC<CourseInfoListProps> = ({ children }) => (
  <ul className="m-0 p-0 list-none border-solid border border-slate-300 rounded-b-md">
    {children}
  </ul>
);

export default CourseInfoListContainer;
