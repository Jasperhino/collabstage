import React from 'react';
import Header from '../header/Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow">
        <section className="relative">
          {/* Illustration behind hero content */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
            <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                  <stop stopColor="#FFF" offset="0%" />
                  <stop stopColor="#EAEAEA" offset="77.402%" />
                  <stop stopColor="#DFDFDF" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="url(#illustration-01)" fillRule="evenodd">
                <circle cx="1232" cy="128" r="128" />
                <circle cx="155" cy="443" r="64" />
              </g>
            </svg>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="text-center pb-12 md:pb-16">
                <h1
                  className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                  data-aos="zoom-y-out"
                >
                  Welcome to{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                    collabStage
                  </span>
                </h1>
                <div className="max-w-3xl mx-auto">
                  <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                    Create an interactive theatre experience on the spot.
                  </p>
                  <div
                    className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                    data-aos="zoom-y-out"
                    data-aos-delay="300"
                  >
                    <div>
                      <Link className="btn text-white btn-primary w-full mb-4 sm:w-auto sm:mb-0" to="/stage/create">
                        Create new stage
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                        to="/stage/join"
                      >
                        Join a stage
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero image */}
              <div>
                <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
                  <div className="flex flex-col justify-center">
                    <svg
                      className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto"
                      width="768"
                      height="432"
                      viewBox="0 0 768 432"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hero-ill-a">
                          <stop stopColor="#FFF" offset="0%" />
                          <stop stopColor="#EAEAEA" offset="77.402%" />
                          <stop stopColor="#DFDFDF" offset="100%" />
                        </linearGradient>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="99.24%" id="hero-ill-b">
                          <stop stopColor="#FFF" offset="0%" />
                          <stop stopColor="#EAEAEA" offset="48.57%" />
                          <stop stopColor="#DFDFDF" stopOpacity="0" offset="100%" />
                        </linearGradient>
                        <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="hero-ill-e">
                          <stop stopColor="#E0A82E" offset="0%" />
                          <stop stopColor="#F9D72F" offset="100%" />
                        </radialGradient>
                        <circle id="hero-ill-d" cx="384" cy="216" r="64" />
                      </defs>
                      <g fill="none" fillRule="evenodd">
                        <circle fillOpacity=".04" fill="url(#hero-ill-a)" cx="384" cy="216" r="128" />
                        <circle fillOpacity=".16" fill="url(#hero-ill-b)" cx="384" cy="216" r="96" />
                        <g fillRule="nonzero">
                          <use fill="#000" xlinkHref="#hero-ill-d" />
                          <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
