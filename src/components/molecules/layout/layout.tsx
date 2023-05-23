import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./header";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div>
      <Header />
      <Toaster />
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
