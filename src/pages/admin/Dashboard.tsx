import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Car } from '../../types/car';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Star, 
  Clock, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleStatus(id: string, field: 'is_featured' | 'is_latest', value: boolean) {
    try {
      const { error } = await supabase
        .from('cars')
        .update({ [field]: !value })
        .eq('id', id);

      if (error) throw error;
      setCars(cars.map(car => car.id === id ? { ...car, [field]: !value } : car));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  }

  async function deleteCar(id: string) {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCars(cars.filter(car => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(search.toLowerCase()) ||
    car.year.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#111] border-b border-[#222] py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-[30px] h-[2px] bg-primary-red"></div>
          <h1 className="font-display text-[20px] tracking-[2px] uppercase">Management Console</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/" target="_blank" className="text-[12px] text-muted-text hover:text-white flex items-center gap-2 transition-colors">
            View Website <ExternalLink size={14} />
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-[12px] text-primary-red hover:text-white transition-colors uppercase font-bold tracking-[1px]"
          >
            Logout <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1320px] mx-auto w-full px-6 md:px-12 py-10">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-[#222] py-3 pl-12 pr-4 text-white font-body text-[14px] outline-none focus:border-primary-red transition-colors"
            />
          </div>
          
          <Link 
            to="/admin/add-car"
            className="w-full md:w-auto bg-primary-red hover:bg-deep-red transition-all px-8 py-3 font-body font-bold text-[12px] uppercase tracking-[1.5px] flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus size={18} /> Add New Vehicle
          </Link>
        </div>

        {/* Cars List */}
        <div className="bg-[#111] border border-[#222] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] bg-[#181818]">
                <th className="p-5 font-body text-[11px] text-muted-text uppercase tracking-[2px]">Vehicle Details</th>
                <th className="p-5 font-body text-[11px] text-muted-text uppercase tracking-[2px]">Price</th>
                <th className="p-5 font-body text-[11px] text-muted-text uppercase tracking-[2px]">Visibility</th>
                <th className="p-5 font-body text-[11px] text-muted-text uppercase tracking-[2px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-red mx-auto"></div>
                  </td>
                </tr>
              ) : filteredCars.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-muted-text font-body text-[14px]">
                    No vehicles found in the inventory.
                  </td>
                </tr>
              ) : (
                filteredCars.map((car) => (
                  <tr key={car.id} className="border-b border-[#222] hover:bg-[#151515] transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img 
                          src={car.image_url} 
                          alt={car.name} 
                          className="w-16 h-12 object-cover border border-[#222]" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                          <span className="font-body font-bold text-[15px]">{car.name}</span>
                          <span className="font-body text-[12px] text-muted-text">{car.year} · {car.body_type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="font-mono text-[14px] text-primary-red font-bold">{car.price}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleStatus(car.id, 'is_featured', car.is_featured)}
                          title={car.is_featured ? 'Remove from Featured' : 'Mark as Featured'}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                            car.is_featured ? 'bg-[rgba(200,16,46,0.15)] text-primary-red border border-primary-red/30' : 'bg-[#222] text-muted-text border border-transparent hover:border-[#444]'
                          }`}
                        >
                          <Star size={12} fill={car.is_featured ? 'currentColor' : 'none'} /> Featured
                        </button>
                        <button 
                          onClick={() => toggleStatus(car.id, 'is_latest', car.is_latest)}
                          title={car.is_latest ? 'Remove from Latest' : 'Mark as Latest Arrival'}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                            car.is_latest ? 'bg-[rgba(255,255,255,0.1)] text-white border border-white/30' : 'bg-[#222] text-muted-text border border-transparent hover:border-[#444]'
                          }`}
                        >
                          <Clock size={12} /> Latest
                        </button>
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/admin/edit-car/${car.id}`}
                          className="p-2 text-muted-text hover:text-white hover:bg-[#222] rounded transition-all"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => deleteCar(car.id)}
                          className="p-2 text-muted-text hover:text-primary-red hover:bg-[rgba(200,16,46,0.1)] rounded transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
