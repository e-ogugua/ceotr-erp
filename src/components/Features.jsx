import React from 'react';
import { Zap, Shield, Users, Lightbulb, TrendingUp, Globe, ArrowRight, Star, Target, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'Cutting-edge solutions that drive your business forward',
      image: '/images/others/ai-powered-development.png',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'from-blue-50 to-purple-50'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security & Trust',
      description: 'Robust security measures protecting your valuable data',
      image: '/images/others/cybersecurity.jpg',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Skilled professionals dedicated to your success',
      image: '/images/others/scaling_remote_teams_in_africa.png',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Smart Solutions',
      description: 'Intelligent approaches to complex business challenges',
      image: '/images/others/mobile-first.png',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'from-cyan-50 to-blue-50'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Focused',
      description: 'Strategies designed to scale your business sustainably',
      image: '/images/others/business-growth.png',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Connecting African innovation with world-class standards',
      image: '/images/others/african-tech..png',
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'from-indigo-50 to-blue-50'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Digital Marketing',
      description: 'Strategic marketing solutions to expand your reach',
      image: '/images/others/digital-marketing..png',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Custom Development',
      description: 'Tailored software solutions for unique business needs',
      image: '/images/others/earn-to-code.png',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'from-teal-50 to-cyan-50'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
      <div className="container-enhanced">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-slide-in">
            <Star size={16} className="animate-pulse-glow" />
            Why Choose Us
          </div>
          <h2 className="section-title mb-4">
            Why Choose CEOTR Ltd?
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            We combine innovation, expertise, and dedication to deliver exceptional results
            that drive your business success in today's competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-enhanced group hover-lift">
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-4">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed mb-6">{feature.description}</p>
              <a
                href="#services"
                className="btn-outline inline-flex items-center gap-2 group/btn"
              >
                Learn More
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">500+</div>
                <div className="text-primary-200">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400 mb-2">10+</div>
                <div className="text-accent-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">99%</div>
                <div className="text-green-200">Success Rate</div>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-neutral-300 mb-8 text-lg max-w-2xl mx-auto">
              Join hundreds of successful businesses that trust CEOTR Ltd for their
              digital transformation and growth strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-glass"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-neutral-900 font-semibold px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
