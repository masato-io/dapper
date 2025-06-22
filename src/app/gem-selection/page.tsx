"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const gems = [
  {
    id: 1,
    src: "/gem1.png",
    name: "gem1",
    videoUrl:
      "https://s3-figma-videos-production-sig.figma.com/video/ORG/1052233811748731750/694444d0623b3ded409b7fae6cde11520e9bc06e?Expires=1751846400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U6McsRRJu8-ELNcsvyB3IpD2uP4axdlHwaTcgw7VwcXms5C1BL9~Kd2ElxR0~5Cjq1eXb1M8m0Jj9HEdJKcerPnCNKebuo8RcDy~TpCbezl5KlxVuTnOjxfoRN3TbvsDFwcKzdERzCDdcq7XrQtlFbpkRMY7VSKtgSBiZN0Xl0bJFpvZvKTBhwAGfD8bkDJYoX~ojqitvjdip~yJ7uKt0MIs~3aO41V1stub2v4-GaHumliTJRKy8HTZFk2O1~D~mJYc8S6VETJuEXKhVkVx9qJKUve6MwWLMFtswf-k55CJb9NrAUI2xv~3uN7YKsmbrt5-a4Xg1K7e8ptG~PFk~A__",
  },
  {
    id: 2,
    src: "/gem2.png",
    name: "gem2",
    videoUrl:
      "https://s3-figma-videos-production-sig.figma.com/video/ORG/1052233811748731750/db09e87a80a9aff75322b1d4a112d56a8ebadc80?Expires=1751846400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jwGBA-JlFemH3eo-fVEkj8oXqH9bSDXwU2KAH20H-EKaqB8cDz3FGuS5wK4NrE6vYCpIAWU~fxesxlxIob65yi0idyOihun0YOWeQ3tLImldAV8nso8rEAxcYXA-T3tOZ5ezQSvzTT9SYlCAJs4o9~euAkunYplOAKfNkvVsPrzZEOzUf9MVnROkkPxOG4tVS0Ey6Fag39Lsgl~3gbGtD1JdkArlNs1pXfeEWCQO8-tNgujT~w1czlHzIhW3hKkdWHeqIvlM2obEdWZ1SGmY9HwHQHCHNTcNTBTfgrxu60yITyCQSiegdrGifSGlA1OifzwnUi9UkED6LaBDMxY2ag__",
  },
  {
    id: 3,
    src: "/gem3.png",
    name: "gem3",
    videoUrl:
      "https://s3-figma-videos-production-sig.figma.com/video/ORG/1052233811748731750/866f63000d3f0625dd37e43360b3f5883d9457ee?Expires=1751846400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WG6D2n5BV0NZ5KTRcfXHzCAI-yYqGiC5C4mZt4w6hUfsUSqKxwZFEeLyMMH79TlUGK~K8Ls-ba8mK6YgrS~vdVeFG211Aezhkl1wEfnzFSiz8cpEBzNU-bC~AC5ea69-KJWynmCWBKFVj5Iz6Lcy8SPhudAUdVjQD8gBggS-PCtnEBUnlYyW0K3VDQXK9~BjNIyJDbG~QBpJj5cP0Lk5on~HYkB8PjktkK~03JBA~r6S3etTE09z14AkeB1zY8u~qBjXMpTsfevMvDxdYFXt2eC9be21eG3DGlWluxvZ-T~sI~X86ZtdXIQdU6QPDFVtyLANYOX5EZzzRAXRruaMiQ__",
  },
  {
    id: 4,
    src: "/gem4.png",
    name: "gem4",
    videoUrl:
      "https://s3-figma-videos-production-sig.figma.com/video/ORG/1052233811748731750/d73a7f716bd761d8106454929188a47fb457fea3?Expires=1751846400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KfXsGcLhuK49RJbSVNWfLC4Ziht40pEl62yEt62LVRdS-mOqm20HeWTcZIJFaCtZO45z90WVTX31gRg8Npch7bR3FREEBSvnyEHvf94OKvNQfIozrshD9Wk1vxP963e5-DT5VLxsAQCflGfJCxFGBuW7626R6Iht5~dwfkth53Y0KPb82nkyJkgrLwlVYf3-mj7dULAcOSDb6D~yveSPF9nCHFF0DUlksw1yTPtclTUKwA9dx14oYNmqm5sYrcgN8wVRNBs5-UGixHyq8SdlQ30vf~VtTd9o3AjrMjyGrGYnX3TGTJnst3RvDGCN-Rp~5u3YReI~qT3P0hegOLuuwA__",
  },
];

const GemSelectionPage = () => {
  const gemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeGem, setActiveGem] = useState<{
    index: number;
    rect: DOMRect;
  } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredGem, setHoveredGem] = useState<number | null>(null);

  useEffect(() => {
    if (activeGem) {
      const timer = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(timer);
    }
  }, [activeGem]);

  const handleGemSelect = (index: number) => {
    if (activeGem) return;
    const rect = gemRefs.current[index]?.getBoundingClientRect();
    if (rect) {
      setActiveGem({ index, rect });
      setHoveredGem(null);
    }
  };

  const handleTransitionEnd = () => {
    if (!isAnimating) {
      setActiveGem(null);
    }
  };

  const closeVideo = () => {
    setIsAnimating(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-700
          ${isAnimating ? "opacity-100" : "opacity-0"}
          ${activeGem ? "pointer-events-auto" : "pointer-events-none"}
        `}
        onClick={closeVideo}
      />

      <div
        className={`
        relative h-full w-full overflow-y-auto pt-20 pb-8 px-4 md:pt-4 z-30 transition-opacity duration-700
        ${
          activeGem && isAnimating
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }
      `}
      >
        {/* The original grid, which will be hidden during animation */}
        <div className="min-h-full flex items-center justify-center">
          <div className="w-full max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {gems.map((gem, index) => (
                <div
                  key={gem.id}
                  ref={(el) => {
                    gemRefs.current[index] = el;
                  }}
                  className={`
                    relative group cursor-pointer transform transition-all duration-500 ease-out
                    w-full max-w-[400px] sm:max-w-none mx-auto aspect-square 
                    rounded-xl md:rounded-2xl overflow-hidden animate-float
                    ${
                      hoveredGem === index
                        ? "scale-[1.03] md:scale-[1.05] z-10"
                        : "scale-100"
                    }
                  `}
                  style={{
                    animationDuration: `${3 + index * 0.5}s`,
                    animationDelay: `${index * 0.2}s`,
                    opacity: activeGem?.index === index ? 0 : 1,
                    transition:
                      activeGem?.index === index
                        ? "opacity 0.1s linear"
                        : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                    boxShadow:
                      hoveredGem === index
                        ? "0 0 40px 10px rgba(255, 255, 255, 0.2), 0 0 60px 20px rgba(255, 255, 255, 0.1)"
                        : "0 0 0px 0px rgba(255, 255, 255, 0)",
                  }}
                  onMouseEnter={() => !activeGem && setHoveredGem(index)}
                  onMouseLeave={() => setHoveredGem(null)}
                  onClick={() => handleGemSelect(index)}
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                      hoveredGem === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl -z-10 bg-gradient-to-r from-purple-500/40 to-blue-500/40 blur-xl scale-125" />

                    <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl">
                      <div className="absolute top-1/4 -left-1/4 w-full h-full bg-gradient-to-br from-cyan-400/30 via-transparent to-transparent blur-2xl transform rotate-45 animate-pulse" />
                      <div className="absolute bottom-1/4 -right-1/4 w-full h-full bg-gradient-to-tl from-pink-400/30 via-transparent to-transparent blur-2xl transform -rotate-45 animate-pulse" />
                    </div>

                    <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl">
                      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent blur-xl transform -translate-y-1/2 animate-shimmer" />
                      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-tl from-white/30 to-transparent blur-lg transform translate-y-1/2 animate-shimmer" />
                    </div>

                    <div className="absolute inset-0 mix-blend-screen opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/20" />
                    </div>
                  </div>

                  <div className="absolute inset-0">
                    <Image
                      src={gem.src}
                      alt={gem.name}
                      fill
                      className="object-cover mix-blend-lighten"
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The animating player */}
      {activeGem && (
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            position: "fixed",
            transition: "all 700ms ease-in-out",
            top: isAnimating ? "50%" : `${activeGem.rect.top}px`,
            left: isAnimating ? "50%" : `${activeGem.rect.left}px`,
            width: isAnimating
              ? "clamp(250px, 90vw, 600px)"
              : `${activeGem.rect.width}px`,
            height: isAnimating ? "auto" : `${activeGem.rect.height}px`,
            transform: isAnimating
              ? "translate(-50%, -50%)"
              : "translate(0, 0)",
            zIndex: 50,
          }}
          className="rounded-xl md:rounded-2xl overflow-hidden relative"
        >
          <video
            key={activeGem.index}
            src={gems[activeGem.index].videoUrl}
            className="w-full h-full object-contain"
            autoPlay
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.5;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.2);
          }
        }

        @keyframes shimmer-smooth {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(-50%) scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-50%) scale(1.1) rotate(5deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.6;
            transform: rotate(45deg) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: rotate(45deg) scale(1.05);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-5%, -5%) rotate(120deg);
          }
          66% {
            transform: translate(5%, 5%) rotate(240deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        :global(.animate-shimmer) {
          animation: shimmer 2s ease-in-out infinite;
        }

        :global(.animate-shimmer-smooth) {
          animation: shimmer-smooth 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        :global(.animate-pulse-slow) {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        :global(.animate-gradient-shift) {
          animation: gradient-shift 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        :global(.animate-fadeIn) {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default GemSelectionPage;
