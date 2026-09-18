import Sidebar from "@/layouts/admin-layout/Sidebar";
import React from "react";
import NotificationBell from "@/components/NotificationBell";

const Adminlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <main className="admin-main"><div className="admin-notifications"><NotificationBell /></div>{children}</main>
    </>
  );
};

export default Adminlayout;
