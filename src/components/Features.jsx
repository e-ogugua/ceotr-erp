import React from 'react';
import { Zap, Shield, Users, Lightbulb, TrendingUp, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'Cutting-edge solutions that drive your business forward',
      image: '/images/others/ai-powered-development.png',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security & Trust',
      description: 'Robust security measures protecting your valuable data',
      image: '/images/others/cybersecurity.jpg',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Skilled professionals dedicated to your success',
      image: '/images/others/scaling_remote_teams_in_africa.png',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Smart Solutions',
      description: 'Intelligent approaches to complex business challenges',
      image: '/images/others/mobile-first.png',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Focused',
      description: 'Strategies designed to scale your business sustainably',
      image: '/images/others/business-growth.png',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Connecting African innovation with world-class standards',
      image: '/images/others/african-tech..png',
      color: 'from-indigo-500 to-blue-600'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Choose CEOTR Ltd?
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            We combine innovation, expertise, and dedication to deliver exceptional results
            that drive your business success in today's competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-xl transition-all duration-300">
              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}></div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br ${feature.color} flex items-center justify-center">
                        <div class="text-white text-center">
                          <div class="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                            ${feature.icon}
                          </div>
                          <h3 class="font-semibold">${feature.title}</h3>
                        </div>
                      </div>
                    `;
                  }}
                />

                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-600 shadow-lg">
                  {feature.icon}
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Excellence Level</span>
                    <span className="font-semibold text-primary-600">100%</span>
                  </div>
                  <div className="mt-2 w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-neutral-200 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-neutral-600 mb-8 text-lg">
              Join the growing list of successful businesses that trust CEOTR Ltd
              to deliver exceptional results and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4 text-lg">
                Get Started Today
              </button>
              <button className="btn-secondary px-8 py-4 text-lg">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
