import './home.css'
import style from './style'
import { useEffect, useRef, useState } from 'react'
import AOS from "aos"
import "aos/dist/aos.css"


const Home = () => {
  
  const [pageLoading, setPageLoading] = useState(false)
  useEffect(() => {
    AOS.init()
    AOS.refresh()

  }, [])



  



  return (
    pageLoading ? <h1>pageLoading</h1>
      : <>

        <main>
          <article>
            <div id="progressBarContainer" >
              <div id="progressBar" ></div>
            </div>

            <section className="section hero has-bg-image" aria-label="home">
              <div className="container">
                <div className="hero-content" data-aos="fade-right" data-aos-offset="200" data-aos-duration="1000" >
                  <h1 className="h1 section-title">
                    The Best Website for students to <span className="span" data-aos="zoom-in"
                      data-aos-delay="500">Search</span> for Events.
                  </h1>
                  <p className="hero-text">
                    Hello future engineers!<br />Welcome to <b>Event Manage</b>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                  </p>
                  

                </div>

              </div>
            </section>
            <div className="hero-banner">
                <div className="noticeboard" data-aos="flip-right" data-aos-duration="1000"
                    style={{
                      alignItems: 'center' ,
                      justifyContent: 'center' ,
                    }}
                  >
                    <div  data-aos="fade-right" data-aos-duration="400">
                        <img style={{cursor:'pointer'}} alt='YeildSmart' height={470} width={480} src='https://imgs.search.brave.com/6lIbOVHQ3UPMn4ZoBW4oH5D6-XdR-o_qNCgjO3fvuYg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjgzNTk2MDE1NDMt/ODQzYmZhZWYyOTFh/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TW53/eE1qQTNmREI4TUh4/elpXRnlZMmg4Tm54/OFpYWmxiblFsTWpC/dFlXNWhaMlZ0Wlc1/MGZHVnVmREI4ZkRC/OGZBPT0mdz0xMDAw/JnE9ODA'  />
                    </div>
                </div>
            </div>

            <section className="section about" id='about' aria-label="about">
              <div className="container">
                <div className="about-content">
                  <p className="section-subtitle" style={{ "color": "var(--gray-web)" }}>About Us</p>
                  <h3 className="h2 section-title" data-aos="fade-right" data-aos-duration="400">
                    A group of enthusiastic <span className="span" data-aos="zoom-in" data-aos-delay="300">Engineers keen to</span> help
                    their fellow Engineers.
                  </h3>
                  <p className="section-text" style={{ "color": "var(--gray-web)" }}>
                  Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                  
                    
                  </p>
                  <ul className="about-list" style={{ "fontSize": "1.5rem" }}>
                    <li className="about-item">
                      <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                      <span className="span" data-aos="zoom-in">Dummy Data 1</span>
                    </li>
                    <li className="about-item">
                      <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                      <span className="span" data-aos="zoom-in" data-aos-delay="300">Dummy Data 2</span>
                    </li>
                    <li className="about-item">
                      <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
                      <span className="span" data-aos="zoom-in" data-aos-delay="600">Dummy Data 3</span>
                    </li>
                  </ul>
                </div>

              </div>
            </section>



          </article>
        </main>
      </>
  )
}


export default Home