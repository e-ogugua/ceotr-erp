import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Package, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 12,
    activeLeads: 25,
    inventoryItems: 150,
    totalRevenue: 2500000
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeLeads: prev.activeLeads + Math.floor(Math.random() * 3) - 1,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 10000)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { icon: <Package />, label: 'Add Inventory', href: '/inventory' },
    { icon: <Users />, label: 'Manage Leads', href: '/leads' },
    { icon: <DollarSign />, label: 'Create Invoice', href: '/invoices' },
    { icon: <Calendar />, label: 'New Project', href: '/projects' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-primary-600">{stats.totalProjects}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm">Active Leads</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeLeads}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm">Inventory Items</p>
                <p className="text-2xl font-bold text-purple-600">{stats.inventoryItems}</p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-600">₦{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg hover:bg-primary-50 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary-200">
                  <div className="text-primary-600">{action.icon}</div>
                </div>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-600">{action.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-neutral-800">New project started: Jesus Power Arena</p>
                <p className="text-sm text-neutral-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-neutral-800">New lead added: TechCorp Solutions</p>
                <p className="text-sm text-neutral-600">4 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
