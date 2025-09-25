import React, { useState } from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { DEMO_PROJECTS } from '../data/demoServices';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'construction', label: 'Construction' },
    { id: 'business-development', label: 'Business Development' },
    { id: 'software', label: 'Software' },
    { id: 'it', label: 'IT Services' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? DEMO_PROJECTS
    : DEMO_PROJECTS.filter(project => project.type === selectedCategory);

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
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="aspect-video bg-neutral-200 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-neutral-400 text-sm">Project Image</span>';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-white text-neutral-900 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ExternalLink size={20} />
                  </button>
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
};

export default Portfolio;
