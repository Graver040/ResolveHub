import { useState, useEffect } from 'react';
import api from '../../services/api';
import { UserCheck } from 'lucide-react';

const AssignComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [officers, setOfficers] = useState([]);
  
  const [selectedComplaint, setSelectedComplaint] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [compRes, deptRes, offRes] = await Promise.all([
        api.get('/complaints'),
        api.get('/departments'),
        api.get('/users/officers/all')
      ]);
      setComplaints(compRes.data.filter(c => c.status !== 'Resolved'));
      setDepartments(deptRes.data);
      setOfficers(offRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredOfficers = selectedDepartment 
    ? officers.filter(o => o.department?._id === selectedDepartment)
    : officers;

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedComplaint || !selectedDepartment || !selectedOfficer) return;
    
    setLoading(true);
    try {
      await api.put(`/complaints/${selectedComplaint}`, {
        department: selectedDepartment,
        assignedOfficer: selectedOfficer,
        status: 'In Progress' // typically shifts to in progress once assigned
      });
      // Reset form
      setSelectedComplaint('');
      setSelectedDepartment('');
      setSelectedOfficer('');
      fetchData(); // refresh lists
    } catch (error) {
      console.error('Error assigning:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">Assign Complaints</h1>
      
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Task Assignment</h2>
            <p className="text-sm text-gray-500">Route complaints to the appropriate department and officer.</p>
          </div>
        </div>

        <form onSubmit={handleAssign} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Complaint</label>
            <select 
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
              value={selectedComplaint}
              onChange={(e) => setSelectedComplaint(e.target.value)}
              required
            >
              <option value="">-- Select a complaint --</option>
              {complaints.map(c => (
                <option key={c._id} value={c._id}>
                  {c.title} ({c.category}) - By {c.citizen?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setSelectedOfficer(''); // reset officer when dept changes
                }}
                required
              >
                <option value="">-- Choose Department --</option>
                {departments.map(d => (
                  <option key={d._id} value={d._id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assign Officer</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white disabled:opacity-50"
                value={selectedOfficer}
                onChange={(e) => setSelectedOfficer(e.target.value)}
                required
                disabled={!selectedDepartment}
              >
                <option value="">-- Select Officer --</option>
                {filteredOfficers.map(o => (
                  <option key={o._id} value={o._id}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading || !selectedComplaint || !selectedDepartment || !selectedOfficer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 disabled:shadow-none"
            >
              {loading ? 'Assigning...' : 'Assign Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignComplaints;
