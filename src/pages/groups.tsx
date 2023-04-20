import GroupsList from "@/components/molecules/groups";
import { NextPage } from "next";
import { Suspense } from "react";

const Groups: NextPage = () => {
  return (
    <Suspense fallback={<p>Loading groups...</p>}>
      <GroupsList />
    </Suspense>
  );
};

export default Groups;
