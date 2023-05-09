import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Intro from '../components/Intro';
import About from '../components/About';
import CourseHome from '../components/course/CourseHome';
import Counter from '../components/Counter';
import Work from "../components/Work"
import Contact from '../components/Contact';

export default function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <Intro />
            <About />
            <CourseHome />
            <Counter />
            <Work />
            <Contact />
        </>
    )
}