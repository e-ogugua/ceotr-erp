/**
 * AnalyticsDashboard.jsx - Real-time analytics component for CEOTR Ltd ERP Suite
 *
 * Displays live business metrics with simulated real-time updates.
 * This component is used in the Services section to show business performance data.
 *
 * Performance Optimizations:
 * - React.memo to prevent unnecessary re-renders when props haven't changed
 * - useCallback for event handlers to prevent child component re-renders
 * - useMemo for expensive calculations and derived state
 * - Controlled update intervals to prevent performance issues
 *
 * @returns {JSX.Element} The analytics dashboard component
 */
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { TrendingUp, Users, Eye, Clock, MessageCircle, Phone } from 'lucide-react';

const AnalyticsDashboard = memo(() => {
  const [stats, setStats] = useState({
    visitors: 0,
    pageViews: 0,
    avgTime: 0,
    popularService: 'IT Solutions'
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Memoized initial stats to prevent recreation on every render
  const initialStats = useMemo(() => ({
    visitors: 0,
    pageViews: 0,
    avgTime: 0,
    popularService: 'IT Solutions'
  }), []);

  useEffect(() => {
    // Simulate real-time analytics updates with controlled intervals
    const interval = setInterval(() => {
      setStats(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        avgTime: Math.max(1, prev.avgTime + (Math.random() - 0.5) * 0.2),
        popularService: prev.popularService
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array - only run once

  // Memoized chat submit handler to prevent recreation on every render
  const handleChatSubmit = useCallback((e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      console.log('Chat message:', chatMessage);
      setChatMessage('');
      // Simulate response delay
      setTimeout(() => {
        alert('Thank you for your message! Our team will get back to you shortly.');
      }, 1000);
    }
  }, [chatMessage]);

  // Memoized formatted stats to prevent recalculation on every render
  const formattedStats = useMemo(() => ({
    visitors: stats.visitors.toLocaleString(),
    pageViews: stats.pageViews.toLocaleString(),
    avgTime: stats.avgTime.toFixed(1),
    popularService: stats.popularService
  }), [stats]);

  return (
    <>
      {/* Analytics Dashboard */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 shadow-xl mb-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary-400" />
          <h3 className="text-xl font-bold">Live Analytics</h3>
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400 mb-1">
              {formattedStats.visitors}+
            </div>
            <div className="text-neutral-300 text-sm">Visitors Today</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Users className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-400">↗ +12%</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-accent-400 mb-1">
              {formattedStats.pageViews}+
            </div>
            <div className="text-neutral-300 text-sm">Page Views</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Eye className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-blue-400">↗ +8%</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {formattedStats.avgTime}m
            </div>
            <div className="text-neutral-300 text-sm">Avg. Time</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-400">↗ +15%</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {formattedStats.popularService}
            </div>
            <div className="text-neutral-300 text-sm">Popular Service</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-400">Top Choice</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-glow"
        >
          <MessageCircle size={24} />
        </button>

        {chatOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-slide-in">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-xs text-primary-100">We typically reply in a few minutes</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 max-h-64 overflow-y-auto">
              <div className="bg-neutral-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-neutral-700">
                  👋 Hi! How can we help you today? Our team is here to assist with your project needs.
                </p>
                <p className="text-xs text-neutral-500 mt-1">Just now</p>
              </div>
            </div>

            <form onSubmit={handleChatSubmit} className="p-4 border-t border-neutral-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>

            <div className="px-4 pb-4">
              <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
                <a href="tel:+2348064508595" className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                  <Phone size={14} />
                  Call Now
                </a>
                <span>•</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export default AnalyticsDashboard;
