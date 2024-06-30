import { useEffect, useRef, useState } from 'react';
// import "./styles/slick.css";
// import "./styles/slick-theme.css";
import styles from './App.module.css';
import Header from './components/Header/Header';
import AboutMe from './views/AboutMe/AboutMe';
import Projects from './views/Projects/Projects';
import TAB_OPTIONS from './enums/tabOptions';
import Welcome from './views/Welcome/Welcome';
import ViewContainer from './components/ViewContainer/ViewContainer';
import WorkHistory from './views/WorkHistory/WorkHistory';


export default function App() {

  const [activeTab, setActiveTab] = useState(TAB_OPTIONS.WELCOME)

  const welcomeRef = useRef();
  const aboutRef = useRef();
  const projectRef = useRef();
  const historyRef = useRef();

  const TAB_REF_LINK = {
    WELCOME: welcomeRef,
    ABOUT: aboutRef,
    PROJECTS: projectRef, 
    HISTORY: historyRef
  }

  useEffect(() => {
    function updateActiveTab() {
      let allRefs = [welcomeRef, aboutRef, projectRef, historyRef];
      let scrollY = window.scrollY;

      allRefs.forEach((elmRef, index) => {
        const sectionHeight = elmRef.current.offsetHeight;
        const sectionTop = (elmRef.current.getBoundingClientRect().top + window.scrollY) - 75;
      if (
        scrollY === sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ){
        const activeElm = Object.keys(TAB_OPTIONS)[index];
        setActiveTab(TAB_OPTIONS[activeElm])
      } else return;
    })

    }
    window.addEventListener("scrollend", updateActiveTab);

    return () => (window.removeEventListener("scrollend", updateActiveTab)
  );

  }, []);

  function handleScrollChange(e, id) {
    e.preventDefault();
    if(id === "ABOUT") {
      aboutRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      setActiveTab(TAB_OPTIONS.ABOUT);
    } else if (id === "PROJECTS"){
      projectRef.current.scrollIntoView({block: 'end',  behavior: 'smooth' });
      setActiveTab(TAB_OPTIONS.PROJECTS);
    }else if (id === "WELCOME"){
      welcomeRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      setActiveTab(TAB_OPTIONS.WELCOME);
    }else if (id === "HISTORY"){
      historyRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      setActiveTab(TAB_OPTIONS.HISTORY);
    }
  }

  const changeActiveTab = (id) => {
    setActiveTab(id);
  }

 return (
  <>
    <Header handleScrollChange={handleScrollChange} activeTab={activeTab}></Header>

    <ViewContainer 
      key={TAB_OPTIONS.WELCOME} 
      changeActiveTab={changeActiveTab} 
      id={TAB_OPTIONS.WELCOME} 
      ref={welcomeRef}>
        <Welcome/>
    </ViewContainer>
    <ViewContainer 
      key={TAB_OPTIONS.ABOUT} 
      changeActiveTab={changeActiveTab} 
      id={TAB_OPTIONS.ABOUT} 
      ref={aboutRef}>
        <AboutMe />
    </ViewContainer>
    <ViewContainer 
      key={TAB_OPTIONS.PROJECTS} 
      changeActiveTab={changeActiveTab} 
      id={TAB_OPTIONS.PROJECTS} 
      ref={projectRef}>
        <Projects/>
    </ViewContainer>
    <ViewContainer 
      key={TAB_OPTIONS.HISTORY} 
      changeActiveTab={changeActiveTab} 
      id={TAB_OPTIONS.HISTORY} 
      ref={historyRef}>
        <WorkHistory/>
    </ViewContainer>

  </>
 )
}

