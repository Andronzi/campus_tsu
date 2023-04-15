import GroupsList from "@/components/molecules/groups";
import Layout from "@/components/molecules/layout/layout";
import { NextPage } from "next";
import { Suspense } from "react";

const Groups: NextPage = () => {
  return (
    <Suspense fallback={<p>Loading groups...</p>}>
      <Layout>
        <GroupsList />
      </Layout>
    </Suspense>
  );
};

export default Groups;
