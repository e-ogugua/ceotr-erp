import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Package, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const Inventory = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Cement Bags', category: 'Construction Materials', quantity: 500, unitPrice: 2500, supplier: 'Lafarge Nigeria', lastUpdated: '2024-01-15' },
    { id: 2, name: 'Steel Rods', category: 'Construction Materials', quantity: 200, unitPrice: 15000, supplier: 'African Steel', lastUpdated: '2024-01-10' },
    { id: 3, name: 'Laptops', category: 'IT Equipment', quantity: 10, unitPrice: 350000, supplier: 'HP Nigeria', lastUpdated: '2024-01-12' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Construction Materials', 'IT Equipment', 'Office Supplies'];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || item.category === categoryFilter)
  );

  const handleAddItem = () => {
    console.log('Add new inventory item');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Inventory Management</h1>
          <button
            onClick={handleAddItem}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-primary-600">{items.length}</p>
              </div>
              <Package className="w-8 h-8 text-primary-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-600">{items.filter(i => i.quantity < 50).length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm">Total Value</p>
                <p className="text-2xl font-bold text-green-600">₦{(items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)).toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-neutral-400 w-5 h-5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-neutral-50 to-primary-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {item.quantity} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      ₦{item.unitPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {item.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quantity < 50 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          <AlertTriangle size={12} />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle size={12} />
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-primary-600 hover:text-primary-900 p-2 hover:bg-primary-50 rounded transition-colors duration-200">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors duration-200">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
