/**
 * Portfolio.jsx - Project portfolio component for CEOTR Ltd ERP Suite
 *
 * This component displays the company's project portfolio with interactive galleries,
 * category filtering, and lightbox functionality. It showcases completed projects
 * with detailed information and visual galleries for each project.
 *
 * Features:
 * - Interactive project gallery with lightbox modal
 * - Category filtering system (Construction, IT, Software, Business)
 * - Responsive grid layout for all device sizes
 * - Image fallback system for HEIC/WebP compatibility
 * - Optimized lightbox state management
 *
 * @returns {JSX.Element} The portfolio showcase component
 */
import React, { useState, useMemo, useCallback, memo } from 'react';
import { ExternalLink, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { DEMO_PROJECTS } from '../data/demoServices';

const Portfolio = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Memoized categories array to prevent recreation on every render
  const categories = useMemo(() => [
    { id: 'all', label: 'All Projects' },
    { id: 'construction', label: 'Construction' },
    { id: 'business-development', label: 'Business Development' },
    { id: 'software', label: 'Software' },
    { id: 'it', label: 'IT Services' }
  ], []);

  // Memoized filtered projects to prevent recalculation on every render
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'all'
      ? DEMO_PROJECTS
      : DEMO_PROJECTS.filter(project => project.type === selectedCategory);
  }, [selectedCategory]);

  // Memoized lightbox handlers to prevent recreation on every render
  const openLightbox = useCallback((project, imageIndex) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  }, []);

  // Memoized image navigation handlers
  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore our recent projects and see how we've helped businesses achieve their goals
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card group overflow-hidden">
              {/* Project Image Gallery */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="aspect-video bg-neutral-200 flex items-center justify-center relative">
                  {/* Main Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openLightbox(project, 0)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(project, 0);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open lightbox for ${project.title}`}
                    onError={(e) => {
                      // Try WebP fallback for HEIC images
                      if (project.image.includes('.HEIC') && !e.target.src.includes('.webp')) {
                        const webpPath = project.image.replace('.HEIC', '.webp');
                        e.target.src = webpPath;
                      } else {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-neutral-400 text-sm">Project Image</span>';
                      }
                    }}
                  />

                  {/* Gallery Thumbnails */}
                  {project.gallery && project.gallery.length > 1 && (
                    <div className="absolute bottom-2 left-2 right-2 flex gap-1 overflow-x-auto">
                      {project.gallery.slice(0, 4).map((image, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-neutral-200 rounded cursor-pointer flex-shrink-0"
                          onClick={() => openLightbox(project, index)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openLightbox(project, index);
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label={`Open lightbox for ${project.title} image ${index + 1}`}
                        >
                          <img
                            src={image}
                            alt={`${project.title} ${index + 1}`}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              // Try WebP fallback for HEIC images
                              if (image.includes('.HEIC') && !e.target.src.includes('.webp')) {
                                const webpPath = image.replace('.HEIC', '.webp');
                                e.target.src = webpPath;
                              } else {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-neutral-300 rounded flex items-center justify-center text-xs text-neutral-500">IMG</div>';
                              }
                            }}
                          />
                        </div>
                      ))}
                      {project.gallery.length > 4 && (
                        <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center text-white text-xs font-bold">
                          +{project.gallery.length - 4}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openLightbox(project, 0)}
                      className="opacity-0 group-hover:opacity-100 bg-white text-neutral-900 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {categories.find(cat => cat.id === project.type)?.label}
                  </span>
                  <div className="flex items-center text-neutral-500 text-sm">
                    <Calendar size={16} className="mr-1" />
                    {project.completionDate}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-neutral-500">
                  Client: <span className="font-medium">{project.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Main Image */}
              <img
                src={selectedProject.gallery[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  // Try WebP fallback for HEIC images in lightbox
                  if (e.target.src.includes('.HEIC') && !e.target.src.includes('.webp')) {
                    const webpPath = e.target.src.replace('.HEIC', '.webp');
                    e.target.src = webpPath;
                  } else {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="max-w-full max-h-full bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-500 text-lg">Image not available</div>';
                  }
                }}
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedProject.gallery.length}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-6">
            Ready to start your next project? Let's discuss how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Start Your Project
            </button>
            <button className="btn-secondary">
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Portfolio;
