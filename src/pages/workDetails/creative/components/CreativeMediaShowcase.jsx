import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CreativeMediaShowcase = ({ mediaImages, brandImages, title, t }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (mediaImages.length === 0 && brandImages.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
      {mediaImages.length > 0 && (
        <div className="space-y-4">
           
          <Swiper
            modules={[Autoplay, Thumbs]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={mediaImages.length > 1}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            className="w-full rounded-3xl shadow-xl"
          >
            {mediaImages.map((src, index) => (
              <SwiperSlide key={`${src}-${index}`}>
                <div className="group relative overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)]/60 shadow-2xl">
                  <img
                    src={src}
                    alt={`${title} media ${index + 1}`}
                    className="h-full w-full max-h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-[var(--background)]/10 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {mediaImages.length > 1 && (
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              watchSlidesProgress
              spaceBetween={12}
              slidesPerView={Math.min(mediaImages.length, 4)}
              className="w-full rounded-2xl"
            >
              {mediaImages.map((src, index) => (
                <SwiperSlide key={`thumb-${index}`} className="cursor-pointer">
                  <img
                    src={src}
                    alt={`Thumb ${index + 1}`}
                    className="h-[70px] w-full rounded-2xl object-cover opacity-80 transition border border-[var(--foreground)]/10 bg-[var(--container-bg)]/70 hover:opacity-100"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}

      {brandImages.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.6em] text-[var(--foreground)]/60">
            {t("work.details.creative.brandImages")}
          </h2>
          <Swiper
            effect={"coverflow"}
            grabCursor
            centeredSlides
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination
            modules={[EffectCoverflow, Pagination]}
            className="brandImagesSwiper"
          >
            {brandImages.map((src, index) => (
              <SwiperSlide key={`brand-${index}`}>
                <img
                  src={src}
                  alt={`${title} brand ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default CreativeMediaShowcase;
