import React from 'react';

export default function Section1() {
  return (
    <div className="bg-gray-800 flex items-center text-white py-10">
      <div className="flex flex-col">
        <h4 className="h4">Welcome back</h4>
        <p className='p1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Vel elit scelerisque mauris pellentesque. Dis parturient montes nascetur ridiculus mus. Nulla facilisi etiam dignissim diam quis enim. Tempor commodo ullamcorper a lacus vestibulum sed. Suspendisse faucibus interdum posuere lorem ipsum dolor. </p>
        <button className="button-viewmore">View More</button>
        <button className="button-plus">+</button>
        <button className="button-create">+ Create</button>
      </div>
      <div>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <lottie-player src="https://lottie.host/5114af7a-ac9a-4017-9098-f02dcc2e5b97/oO3QhXg0AR.json"
          background="#2d3748"
          speed="1"
          style={{ width: '300px', height: '300px' }}
          loop=""
          autoplay
          direction="1"
          mode="normal">
        </lottie-player>
      </div>
    </div>
  );
}
