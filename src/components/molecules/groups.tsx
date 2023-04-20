import {
  Group,
  useAddGroupMutation,
  useDeleteGroupMutation,
  useGetAllGroupsQuery,
} from "@/services/Groups/groupApi";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import Button from "../atoms/button";
import WithPermission from "../atoms/withPermission";

const GroupsList: FC = () => {
  const { data, error } = useGetAllGroupsQuery();
  const [addGroup] = useAddGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [groupValue, setGroupValue] = useState("");
  const router = useRouter();

  if (error) {
    return <p>Ошибка загрузки данных</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="font-montserrat mb-0">Группы кампусных курсов</h2>
      <WithPermission roles={["Admin"]}>
        <>
          <Button
            value="Создать"
            className="mt-3 mb-3"
            onClick={() => addGroup({ name: groupValue })}
          />
          <input
            placeholder="group"
            value={groupValue}
            onChange={(e) => setGroupValue(e.target.value)}
          />
        </>
      </WithPermission>
      <ul className="pl-0">
        {data?.map((group: Group) => (
          <li
            className="flex justify-between list-none border-solid border border-slate-300 p-4 font-montserrat"
            key={group.name}
            onClick={() =>
              router.push({
                pathname: `/groups/${group.id}`,
                query: { name: group.name },
              })
            }
          >
            <p>{group.name}</p>
            <WithPermission roles={["Admin"]}>
              <div className="flex">
                <Button
                  value="Редактировать"
                  className="w-full bg-yellow-400 hover:bg-yellow-600"
                />
                <Button
                  value="Удалить"
                  onClick={(e) => {
                    deleteGroup(group.id);
                    e.stopPropagation();
                  }}
                  className="ml-4 w-full bg-red-500 hover:bg-red-700"
                />
              </div>
            </WithPermission>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
