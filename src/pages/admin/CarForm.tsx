import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Car } from '../../types/car';
import { ArrowLeft, Save, Upload, X, Loader2 } from 'lucide-react';

export default function CarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Car>>({
    name: '',
    spec: '',
    price: '',
    year: new Date().getFullYear().toString(),
    body_type: 'Sedan',
    image_url: '',
    is_featured: false,
    is_latest: false,
    description: '',
    engine: '',
    mileage: '',
    fuel_type: '',
    transmission: '',
    gallery: [],
    contact_number: '+8801718-388292',
  });

  useEffect(() => {
    if (isEdit) {
      fetchCar();
    }
  }, [id]);

  async function fetchCar() {
    try {
      setFetching(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) setFormData(data);
    } catch (error) {
      console.error('Error fetching car:', error);
      alert('Failed to fetch car details');
      navigate('/admin/dashboard');
    } finally {
      setFetching(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `car-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from('automuseum')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('automuseum')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const newUrls: string[] = [];

      for (const fileObj of Array.from(files)) {
        const file = fileObj as File;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `car-gallery/${fileName}`;

        const { error } = await supabase.storage
          .from('automuseum')
          .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('automuseum')
          .getPublicUrl(filePath);
        
        newUrls.push(publicUrl);
      }

      setFormData(prev => ({ 
        ...prev, 
        gallery: [...(prev.gallery || []), ...newUrls] 
      }));
    } catch (error: any) {
      console.error('Error uploading gallery images:', error);
      alert('Error uploading images: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== index)
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.image_url) {
      alert('Please upload an image first');
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        const { error } = await supabase
          .from('cars')
          .update(formData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cars')
          .insert([formData]);
        if (error) throw error;
      }
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Error saving car:', error);
      alert('Error saving car: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-red" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white pb-20">
      <header className="bg-[#111] border-b border-[#222] py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="p-2 hover:bg-[#222] rounded-full transition-colors text-muted-text hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-[30px] h-[2px] bg-primary-red"></div>
          <h1 className="font-display text-[20px] tracking-[2px] uppercase">
            {isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h1>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto w-full px-6 py-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Image Section */}
          <div className="bg-[#111] border border-[#222] p-8">
            <h2 className="font-display text-[16px] uppercase tracking-[2px] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-primary-red rounded-full"></span>
              Vehicle Media
            </h2>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#333] hover:border-primary-red/50 transition-colors p-10 relative overflow-hidden group mb-6">
              {formData.image_url ? (
                <>
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="max-h-[400px] object-contain mb-4" 
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                    className="absolute top-4 right-4 p-2 bg-primary-red hover:bg-deep-red text-white rounded-full transition-all shadow-lg"
                  >
                    <X size={18} />
                  </button>
                  <p className="text-[12px] text-muted-text font-body uppercase tracking-[1px]">Click to change image</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  {uploading ? (
                    <Loader2 className="animate-spin text-primary-red" size={40} />
                  ) : (
                    <Upload size={40} className="text-[#333] group-hover:text-primary-red transition-colors" />
                  )}
                  <div className="text-center">
                    <p className="font-body font-bold text-[14px]">Click to upload high-res car image</p>
                    <p className="text-[11px] text-muted-text mt-1 uppercase tracking-[1px]">JPEG, PNG, WEBP (Max 5MB)</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploading} />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Or Paste Image URL</label>
              <input 
                type="url" 
                name="image_url" 
                value={formData.image_url} 
                onChange={handleChange}
                className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                placeholder="https://example.com/car-image.jpg"
              />
              <p className="text-[10px] text-[#666] mt-1 italic">Note: Manual URLs are useful for images hosted on external servers.</p>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="bg-[#111] border border-[#222] p-8">
            <h2 className="font-display text-[16px] uppercase tracking-[2px] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-primary-red rounded-full"></span>
              Additional Images (Gallery)
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {formData.gallery?.map((url, idx) => (
                <div key={idx} className="relative aspect-video bg-[#181818] border border-[#222] group overflow-hidden">
                  <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-primary-red text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <div className="relative aspect-video border-2 border-dashed border-[#333] hover:border-primary-red/50 transition-colors flex flex-col items-center justify-center cursor-pointer">
                <Upload size={20} className="text-[#444]" />
                <span className="text-[10px] text-muted-text uppercase mt-2">Add Images</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleGalleryUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  disabled={uploading}
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Add URL Manually</label>
              <div className="flex gap-2">
                <input 
                  type="url" 
                  id="gallery-url"
                  className="bg-[#181818] border border-[#333] p-4 flex-grow text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="https://example.com/other-angle.jpg"
                />
                <button 
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('gallery-url') as HTMLInputElement;
                    if (input.value) {
                      setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), input.value] }));
                      input.value = '';
                    }
                  }}
                  className="bg-[#222] px-6 text-[12px] uppercase tracking-[1px] font-bold hover:bg-primary-red transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-[#111] border border-[#222] p-8">
            <h2 className="font-display text-[16px] uppercase tracking-[2px] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-primary-red rounded-full"></span>
              Core Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Vehicle Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="e.g. Mercedes-Benz S-Class"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Internal Price (Hidden from site)</label>
                <input 
                  type="text" name="price" value={formData.price} onChange={handleChange}
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="e.g. ৳2,50,00,000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Contact Number for this Vehicle</label>
                <input 
                  type="text" name="contact_number" value={formData.contact_number} onChange={handleChange}
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="+8801718-388292"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Model Year</label>
                <input 
                  type="text" name="year" value={formData.year} onChange={handleChange} required
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="2024"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Body Type</label>
                <select 
                  name="body_type" value={formData.body_type} onChange={handleChange}
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red appearance-none"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="MPV">MPV</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-[#111] border border-[#222] p-8">
            <h2 className="font-display text-[16px] uppercase tracking-[2px] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-primary-red rounded-full"></span>
              Technical Specifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Core Spec/Performance</label>
                <input 
                  type="text" name="spec" value={formData.spec} onChange={handleChange}
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="e.g. 3.0L Inline-6 · Hybrid"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Engine Details</label>
                <input 
                  type="text" name="engine" value={formData.engine} onChange={handleChange}
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="V8 Twin-Turbo"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Mileage</label>
                <input 
                  type="text" name="mileage" value={formData.mileage} onChange={handleChange}
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="5,000 KM"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Transmission</label>
                <input 
                  type="text" name="transmission" value={formData.transmission} onChange={handleChange}
                  className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red"
                  placeholder="9G-TRONIC"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label className="font-body text-[10px] text-muted-text uppercase tracking-[2px]">Full Description</label>
              <textarea 
                name="description" value={formData.description} onChange={handleChange} rows={5}
                className="bg-[#181818] border border-[#333] p-4 text-white font-body text-[14px] outline-none focus:border-primary-red resize-none"
                placeholder="Describe the vehicle's features and condition..."
              />
            </div>
          </div>

          {/* Site Visibility */}
          <div className="bg-[#111] border border-[#222] p-8">
            <h2 className="font-display text-[16px] uppercase tracking-[2px] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-primary-red rounded-full"></span>
              Placement & Visibility
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-10">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange}
                  className="w-5 h-5 accent-primary-red cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-body font-bold text-[14px] group-hover:text-primary-red transition-colors">Show on Homepage</span>
                  <span className="text-[11px] text-muted-text uppercase tracking-[1px]">Featured Vehicle Section</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" name="is_latest" checked={formData.is_latest} onChange={handleChange}
                  className="w-5 h-5 accent-primary-red cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-body font-bold text-[14px] group-hover:text-primary-red transition-colors">Mark as Latest Arrival</span>
                  <span className="text-[11px] text-muted-text uppercase tracking-[1px]">Show in Latest & New Collections</span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-primary-red hover:bg-deep-red transition-all py-5 font-body font-bold text-[14px] text-white uppercase tracking-[3px] flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50 mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {loading ? 'Processing...' : (isEdit ? 'Update Vehicle Listing' : 'Publish Vehicle Listing')}
          </button>
        </form>
      </main>
    </div>
  );
}
