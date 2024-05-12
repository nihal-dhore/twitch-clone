
import { Sidebar, SidebarSkeleton } from "@/app/(browse)/_components/sidebar";
import { Container } from "./_components/container";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/libs/auth";
import { UpdateScreen } from "@/components/UpdateScreen";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "./_components/navbar";

export default async function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);

  {
    session ?? redirect("/signin");
  }

  if (!session?.user.username) {
    return (
      <>
        <Navbar />
        <UpdateScreen />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
}