// In: src/app/components/ProjectCarousel.js

"use client"; // This is CRUCIAL for interactivity

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function ProjectCarousel({ projects }) {
  const [activeFilter, setActiveFilter] = useState('Case Studies');
  const [swiper, setSwiper] = useState(null);

  const filterButtons = ['Case Studies', 'Projects'];
  
  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'Case Studies') return p.type === 'case-study';
    if (activeFilter === 'Projects') return p.type === 'project';
    return true;
  });

  const goPrev = () => {
    if (swiper) swiper.slidePrev();
  };

  const goNext = () => {
    if (swiper) swiper.slideNext();
  };

  return (
    <section className="py-16">
      {/* Header with Title and Filters */}
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-4xl font-bold text-gray-900 text-left">
          <span className="block">Case Insights &</span>
          <span className="block">Key Projects</span>
        </h2>
        <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
          {filterButtons.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`py-1.5 px-4 rounded-md text-sm font-semibold transition-colors ${
                activeFilter === filter
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'bg-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        pagination={{
          el: '.custom-swiper-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
      >
        {filteredProjects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md group border border-gray-200">
              <img src={project.image} alt={project.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800">{project.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation & Pagination */}
      <div className="flex justify-between items-center mt-8">
        <div className="custom-swiper-pagination flex space-x-2" />
        <div className="flex space-x-2">
          <button onClick={goPrev} className="bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
            <FiChevronLeft className="text-gray-600" />
          </button>
          <button onClick={goNext} className="bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors">
            <FiChevronRight className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}