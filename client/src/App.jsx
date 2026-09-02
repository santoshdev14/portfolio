import { Routes, Route, Outlet } from 'react-router-dom'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function MainLayout() {
  return (
    <div className="relative">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/* 404 Standalone Page - only shows 404 and Back to Home button */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
