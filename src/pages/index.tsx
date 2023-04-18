import Layout from "@/components/molecules/layout/layout";
import { useGetUserCourcesQuery } from "@/services/courcesApi";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, error, isLoading } = useGetUserCourcesQuery();
  return <Layout />;
}
