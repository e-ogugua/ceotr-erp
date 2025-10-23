/**
 * About.jsx - About section component for CEOTR Ltd ERP Suite
 *
 * This component displays company information, team members, statistics,
 * and service overview. It provides a comprehensive view of the company's
 * capabilities and team structure.
 *
 * Performance Optimizations:
 * - React.memo to prevent unnecessary re-renders when props haven't changed
 * - useMemo for expensive arrays (stats, services, values) to prevent recreation
 * - Image optimization with lazy loading for team member photos
 * - Optimized team member card rendering
 *
 * @returns {JSX.Element} The about section component
 */
import { memo, useMemo } from 'react';
import { Award, Users, Target, Building, Briefcase, Server, Code, MapPin, Mail, Phone } from 'lucide-react';
import { COMPANY_INFO, DEMO_TEAM } from '../data/demoServices';

const About = memo(() => {
  // Memoized stats array to prevent recreation on every render
  const stats = useMemo(() => [
    {
      icon: <Building size={32} />,
      number: '50+',
      label: 'Projects Completed',
      color: 'text-blue-600'
    },
    {
      icon: <Users size={32} />,
      number: '25+',
      label: 'Team Members',
      color: 'text-green-600'
    },
    {
      icon: <Award size={32} />,
      number: '10+',
      label: 'Years Experience',
      color: 'text-purple-600'
    },
    {
      icon: <Target size={32} />,
      number: '100%',
      label: 'Client Satisfaction',
      color: 'text-orange-600'
    }
  ], []);

  // Memoized services array for overview section
  const services = useMemo(() => [
    {
      icon: <Building className="w-8 h-8" />,
      title: 'General Contracting',
      description: 'Complete construction and project management services',
      features: ['Full project planning', 'Quality control', 'Transparent budgeting']
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: 'IT Solutions',
      description: 'Technology services and digital transformation',
      features: ['Custom software', 'System integration', 'Cloud migration']
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Business Consulting',
      description: 'Strategic planning and business development',
      features: ['Market analysis', 'Financial modeling', 'Process optimization']
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Software Development',
      description: 'Custom applications and web development',
      features: ['React/Node.js', 'Mobile apps', 'API integrations']
    }
  ], []);

  // Memoized company values array
  const values = useMemo(() => [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Excellence',
      description: 'We deliver superior quality in every project'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaboration',
      description: 'Working together to achieve your goals'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Embracing cutting-edge solutions'
    }
  ], []);

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            About {COMPANY_INFO.name}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {COMPANY_INFO.fullName} is a leading provider of professional services,
            specializing in construction, IT solutions, business consulting, and software development.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-300 group">
              <div className={`mb-3 flex justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                {stat.number}
              </div>
              <div className="text-neutral-600 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-neutral-900">
              Our Mission & Vision
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Founded in {COMPANY_INFO.founded} with a vision to bridge the gap between traditional business practices
              and modern technological solutions, {COMPANY_INFO.name} has grown into a trusted partner
              for businesses across various industries in {COMPANY_INFO.headquarters.split(',')[1]}.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Our mission is to deliver exceptional professional services that exceed client expectations while
              maintaining the highest standards of quality, innovation, and integrity. We are committed to
              building lasting relationships through transparent communication and reliable project delivery.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm border border-neutral-200">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 text-primary-600">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-1">{value.title}</h4>
                  <p className="text-xs text-neutral-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <h4 className="text-xl font-semibold text-neutral-900 mb-6 text-center">Company Overview</h4>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-medium text-neutral-900">Headquarters</div>
                    <div className="text-sm text-neutral-600">{COMPANY_INFO.headquarters}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-medium text-neutral-900">Contact</div>
                    <div className="text-sm text-neutral-600">{COMPANY_INFO.phone.join(' | ')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-medium text-neutral-900">Email</div>
                    <div className="text-sm text-neutral-600">{COMPANY_INFO.email.join(' | ')}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <div className="text-sm text-neutral-500 mb-2">Founded</div>
                  <div className="font-semibold text-neutral-900">{COMPANY_INFO.founded}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-200 mb-16">
          <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
            Our Core Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:bg-neutral-50 transition-all duration-300 group cursor-pointer">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <div className="text-primary-600">
                    {service.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-neutral-600 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="text-xs text-neutral-500 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-200">
          <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
            Meet Our Leadership Team
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DEMO_TEAM.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-200 shadow-lg">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy" // Lazy load team member images
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-2">
                  {member.name}
                </h4>
                <p className="text-primary-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                  >
                    LinkedIn Profile →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
