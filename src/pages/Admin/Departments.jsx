import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Plus, Trash2, Building } from 'lucide-react';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptDesc, setNewDeptDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    try {
      const { data } = await api.get('/departments');
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!newDeptName) return;
    setLoading(true);
    try {
      await api.post('/departments', { name: newDeptName, description: newDeptDesc });
      setNewDeptName('');
      setNewDeptDesc('');
      fetchDepartments();
    } catch (error) {
      console.error('Error adding department:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      await api.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">Departments Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Department Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600"/> Add New
            </h2>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  placeholder="e.g. Water Works"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                  value={newDeptDesc}
                  onChange={(e) => setNewDeptDesc(e.target.value)}
                  placeholder="Handles water related issues..."
                />
              </div>
              <button 
                type="submit" 
                disabled={loading || !newDeptName}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Save Department'}
              </button>
            </form>
          </div>
        </div>

        {/* Departments List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {departments.map((dept) => (
              <div key={dept._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 opacity-50 group-hover:bg-blue-100 transition-colors"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <button 
                      onClick={() => handleDelete(dept._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Delete Department"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 flex-grow">{dept.description || 'No description provided.'}</p>
                </div>
              </div>
            ))}
            {departments.length === 0 && (
              <div className="col-span-full p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                No departments found. Create one.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Departments;
