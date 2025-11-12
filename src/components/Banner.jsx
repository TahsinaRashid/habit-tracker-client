// import { useEffect, useState } from "react";
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

// const videos = [
//   "https://cdn.dribbble.com/userupload/4010931/file/original-f26eeb2658709967fecd96743b18fea0.mp4",
//   "https://cdn.dribbble.com/userupload/44661216/file/071296252392fb7052f787e6e6820c87.mp4",
//   "https://cdn.dribbble.com/userupload/44281391/file/e04543a0c926981fcea327ed45482f27.mp4",
// ];

// const Banner = () => {
//   const [current, setCurrent] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % videos.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   const prevSlide = () =>
//     setCurrent((current - 1 + videos.length) % videos.length);
//   const nextSlide = () => setCurrent((current + 1) % videos.length);

//   return (
//     <>
//     <div className="absolute w-full flex top-15 left-0 justify-center ">
//       <div className="max-w-7xl mx-auto">
//         <div className="relative w-full overflow-hidden bg-black shadow-2xl">
//           <div
//             className="flex transition-transform duration-700 ease-in-out"
//             style={{ transform: `translateX(-${current * 100}%)` }}
//           >
//             {videos.map((src, i) => (
//               <div key={i} className="w-full shrink-0 relative">
//                 <video
//                   src={src}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   className="w-full h-[60vh] object-cover brightness-90"
//                 />
//                 <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
//           >
//             <FaAngleDoubleLeft className="w-6 h-6" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
//           >
//             <FaAngleDoubleRight className="w-6 h-6" />
//           </button>
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//             {videos.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrent(i)}
//                 className={`h-2 w-2 rounded-full transition-all ${
//                   current === i ? "bg-white w-4" : "bg-white/50"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="mb-[500px]"></div>
//     </>
//   );
// };

// export default Banner;



import { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const videos = [
  "https://cdn.dribbble.com/userupload/4010931/file/original-f26eeb2658709967fecd96743b18fea0.mp4",
  "https://cdn.dribbble.com/userupload/44661216/file/071296252392fb7052f787e6e6820c87.mp4",
  "https://cdn.dribbble.com/userupload/44281391/file/e04543a0c926981fcea327ed45482f27.mp4",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((current - 1 + videos.length) % videos.length);
  const nextSlide = () => setCurrent((current + 1) % videos.length);

  return (
    <section className="relative w-full overflow-hidden bg-black shadow-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {videos.map((src, i) => (
          <div key={i} className="w-full shrink-0 relative">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[60vh] object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
      >
        <FaAngleDoubleLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
      >
        <FaAngleDoubleRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              current === i ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
