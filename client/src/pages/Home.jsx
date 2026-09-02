import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Services from '../components/Services'
import About from '../components/About'
import Skills from '../components/Skills'
import Process from '../components/Process'
import Experience from '../components/Experience'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Services />
      <About />
      <Skills />
      <Process />
      <Experience />
      <Testimonials />
      <Contact />
    </main>
  )
}
