import { NextPage } from "next";
import { Group } from "./api/groups";

type GroupsProps = {
  groups: Group[];
};

const Groups: NextPage<GroupsProps> = ({ groups }) => {
  return (
    <ul>
      {groups.map((group: Group) => (
        <li key={group.name}>{group.name}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/groups");
  const groups = await res.json();

  return {
    props: {
      groups,
    },
  };
}

export default Groups;
