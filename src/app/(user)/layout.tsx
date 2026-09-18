import Footer from "@/layouts/user-layout/Footer";
import Header from "@/layouts/user-layout/Header";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-20">{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
