import { Outlet } from 'react-router-dom'
import { AnnouncementBar } from './AnnouncementBar.jsx'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
