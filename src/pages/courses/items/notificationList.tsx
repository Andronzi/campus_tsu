import { Notification } from "@/services/Course/types";
import { FC } from "react";

type NotificationListProps = {
  notifications: Notification[];
};

const NotificationList: FC<NotificationListProps> = ({ notifications }) => (
  <>
    {notifications.map((notification: Notification, index: number) => (
      <li
        className={`flex px-3 py-2 border-x-0 border-t border-b-0 border-solid border-slate-300 ${
          notification.isImportant && "bg-red-500 text-white"
        } last:rounded-b-md`}
        key={index}
      >
        {notification.text}
      </li>
    ))}
  </>
);

export default NotificationList;
