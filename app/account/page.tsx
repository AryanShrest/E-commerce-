import type { Metadata } from "next";
import AccountPageClient from "@/app/components/AccountPageClient";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Account | Zymowine.com",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const initialMode = mode === "signup" ? "signup" : "login";

  return (
    <>
      <AnnouncementBar />
      <Header />
      <AccountPageClient initialMode={initialMode} />
      <Footer />
    </>
  );
}
