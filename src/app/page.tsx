"use client"
import { Footer } from "@awvremusic/awvre-ui-web"
import { useIsMobile } from "@/features/common/hooks/useIsMobile";
import { QuickLinksPageView } from "@/features/quickLinksPage/components/QuickLinksPageView";

export default function Home() {

  const isMobile = useIsMobile();

  return (
    <>
      <main className={`flex min-h-screen flex-col items-center justify-between ${isMobile ? 'p-4' : 'p-24'} mb-5`} style={{ maxWidth: 1080, marginLeft: "auto", marginRight: "auto" }}>
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
          <QuickLinksPageView />
        </div>
      </main>
      <Footer />
    </>
  )
}
