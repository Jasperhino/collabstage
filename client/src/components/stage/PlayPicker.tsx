import React from 'react';

export default function PlayPicker() {
  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="/assets/backgrounds/hogwarts.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://media.istockphoto.com/id/1280886224/video/glitch-question-mark-on-vintage-twitched-television-screen-animation-of-a-question-mark.jpg?s=640x640&k=20&c=7DoCbOoMXJBYLILufqdMrOR1ULrxIhvO4aCD6C5b3VE=" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://media.istockphoto.com/id/1280886224/video/glitch-question-mark-on-vintage-twitched-television-screen-animation-of-a-question-mark.jpg?s=640x640&k=20&c=7DoCbOoMXJBYLILufqdMrOR1ULrxIhvO4aCD6C5b3VE=" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="https://media.istockphoto.com/id/1280886224/video/glitch-question-mark-on-vintage-twitched-television-screen-animation-of-a-question-mark.jpg?s=640x640&k=20&c=7DoCbOoMXJBYLILufqdMrOR1ULrxIhvO4aCD6C5b3VE=" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
