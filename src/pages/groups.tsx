// import GroupsList from "@/components/molecules/groups";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const GroupsList = dynamic(() => import("@/components/molecules/groups"), {
  suspense: true,
});

const Groups: NextPage = () => {
  return (
    <Suspense fallback={<p>Loading groups...</p>}>
      <GroupsList />
    </Suspense>
  );
};

export default Groups;
