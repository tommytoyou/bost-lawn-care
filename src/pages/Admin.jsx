import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useContent } from '../context/ContentContext';

const ADMIN_PASSWORD = 'bost2024';

/**
 * Admin dashboard with authentication and tabs for managing Services,
 * Testimonials, Gallery, and Site Content. All edits persist via ContentContext.
 */
export default function Admin() {
  const [isAuth, setIsAuth] = useState(
    () => sessionStorage.getItem('bost_admin_auth') === 'true'
  );
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState('services');

  const {
    services, setServices,
    testimonials, setTestimonials,
    gallery, setGallery,
    siteContent, setSiteContent,
  } = useContent();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true);
      sessionStorage.setItem('bost_admin_auth', 'true');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    sessionStorage.removeItem('bost_admin_auth');
  };

  // ---- Login Screen ----
  if (!isAuth) {
    return (
      <div className="py-16 lg:py-24 min-h-[60vh] flex items-center justify-center">
        <motion.div
          className="bg-white rounded-xl shadow-md p-8 max-w-sm w-full mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-dark mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
              error={passwordError}
              placeholder="Enter admin password"
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              Log In
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'content', label: 'Content' },
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-dark">Admin Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-dark hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'services' && (
          <ServicesTab services={services} setServices={setServices} />
        )}
        {activeTab === 'testimonials' && (
          <TestimonialsTab testimonials={testimonials} setTestimonials={setTestimonials} />
        )}
        {activeTab === 'gallery' && (
          <GalleryTab gallery={gallery} setGallery={setGallery} />
        )}
        {activeTab === 'content' && (
          <ContentTab siteContent={siteContent} setSiteContent={setSiteContent} />
        )}
      </div>
    </div>
  );
}

/* ====== Services Tab ====== */
function ServicesTab({ services, setServices }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (service) => {
    setEditingId(service.id);
    setEditForm({ name: service.name, description: service.description });
  };

  const saveEdit = () => {
    setServices(services.map((s) =>
      s.id === editingId ? { ...s, ...editForm } : s
    ));
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div key={service.id} className="bg-white rounded-lg shadow-sm p-5 border">
          {editingId === service.id ? (
            <div className="space-y-3">
              <Input
                name="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Service name"
              />
              <Input
                name="description"
                type="textarea"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
              />
              <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={saveEdit} className="gap-1">
                  <FaSave className="w-3 h-3" /> Save
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} className="gap-1">
                  <FaTimes className="w-3 h-3" /> Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-dark">{service.name}</h3>
                <p className="text-light-text text-sm mt-1">{service.description}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => startEdit(service)} className="flex-shrink-0">
                <FaEdit className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ====== Testimonials Tab ====== */
function TestimonialsTab({ testimonials, setTestimonials }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', location: '', rating: 5, quote: '' });

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditForm({ name: t.name, location: t.location, rating: t.rating, quote: t.quote });
  };

  const saveEdit = () => {
    setTestimonials(testimonials.map((t) =>
      t.id === editingId ? { ...t, ...editForm } : t
    ));
    setEditingId(null);
  };

  const deleteTestimonial = (id) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  const addTestimonial = () => {
    const newId = Math.max(0, ...testimonials.map((t) => t.id)) + 1;
    setTestimonials([...testimonials, { ...newForm, id: newId }]);
    setNewForm({ name: '', location: '', rating: 5, quote: '' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="primary" size="sm" onClick={() => setShowAdd(!showAdd)} className="gap-1">
          <FaPlus className="w-3 h-3" /> Add Testimonial
        </Button>
      </div>

      {showAdd && (
        <div className="bg-green-50 rounded-lg p-5 border border-green-200 space-y-3">
          <Input name="name" value={newForm.name} onChange={(e) => setNewForm({ ...newForm, name: e.target.value })} placeholder="Customer name" />
          <Input name="location" value={newForm.location} onChange={(e) => setNewForm({ ...newForm, location: e.target.value })} placeholder="Neighborhood" />
          <Input name="quote" type="textarea" value={newForm.quote} onChange={(e) => setNewForm({ ...newForm, quote: e.target.value })} placeholder="Testimonial quote" />
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={addTestimonial} className="gap-1">
              <FaSave className="w-3 h-3" /> Add
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {testimonials.map((t) => (
        <div key={t.id} className="bg-white rounded-lg shadow-sm p-5 border">
          {editingId === t.id ? (
            <div className="space-y-3">
              <Input name="name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
              <Input name="location" value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} placeholder="Location" />
              <Input name="quote" type="textarea" value={editForm.quote} onChange={(e) => setEditForm({ ...editForm, quote: e.target.value })} placeholder="Quote" />
              <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={saveEdit} className="gap-1">
                  <FaSave className="w-3 h-3" /> Save
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-dark">{t.name} <span className="font-normal text-light-text text-sm">— {t.location}</span></p>
                <p className="text-light-text text-sm mt-1 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(t)}>
                  <FaEdit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteTestimonial(t.id)} className="!text-red-500 hover:!bg-red-50">
                  <FaTrash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ====== Gallery Tab ====== */
function GalleryTab({ gallery, setGallery }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newForm, setNewForm] = useState({ imageUrl: '', category: 'Mowing', caption: '' });

  const deleteImage = (id) => {
    setGallery(gallery.filter((img) => img.id !== id));
  };

  const addImage = () => {
    if (!newForm.imageUrl.trim()) return;
    const newId = Math.max(0, ...gallery.map((g) => g.id)) + 1;
    setGallery([...gallery, { ...newForm, id: newId }]);
    setNewForm({ imageUrl: '', category: 'Mowing', caption: '' });
    setShowAdd(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="primary" size="sm" onClick={() => setShowAdd(!showAdd)} className="gap-1">
          <FaPlus className="w-3 h-3" /> Add Image
        </Button>
      </div>

      {showAdd && (
        <div className="bg-green-50 rounded-lg p-5 border border-green-200 space-y-3 mb-6">
          <Input name="imageUrl" value={newForm.imageUrl} onChange={(e) => setNewForm({ ...newForm, imageUrl: e.target.value })} placeholder="Image URL" />
          <Input name="category" type="select" value={newForm.category} onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}>
            <option value="Mowing">Mowing</option>
            <option value="Cleanups">Cleanups</option>
            <option value="Transformations">Transformations</option>
          </Input>
          <Input name="caption" value={newForm.caption} onChange={(e) => setNewForm({ ...newForm, caption: e.target.value })} placeholder="Caption" />
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={addImage} className="gap-1">
              <FaSave className="w-3 h-3" /> Add
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((img) => (
          <div key={img.id} className="relative group rounded-lg overflow-hidden shadow-sm">
            <img src={img.imageUrl} alt={img.caption} className="w-full aspect-square object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <button
                onClick={() => deleteImage(img.id)}
                className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all cursor-pointer"
                aria-label="Delete image"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
              <p className="text-white text-xs truncate">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====== Content Tab ====== */
function ContentTab({ siteContent, setSiteContent }) {
  const [form, setForm] = useState({
    headline: siteContent.homepage.headline,
    subheadline: siteContent.homepage.subheadline,
    aboutParagraph1: siteContent.about.paragraphs[0] || '',
    aboutParagraph2: siteContent.about.paragraphs[1] || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSiteContent({
      ...siteContent,
      homepage: { ...siteContent.homepage, headline: form.headline, subheadline: form.subheadline },
      about: { ...siteContent.about, paragraphs: [form.aboutParagraph1, form.aboutParagraph2] },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border space-y-6">
      <div>
        <h3 className="font-bold text-dark mb-3">Homepage</h3>
        <Input
          label="Headline"
          name="headline"
          value={form.headline}
          onChange={(e) => setForm({ ...form, headline: e.target.value })}
        />
        <Input
          label="Subheadline"
          name="subheadline"
          type="textarea"
          value={form.subheadline}
          onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
        />
      </div>

      <div>
        <h3 className="font-bold text-dark mb-3">About Page</h3>
        <Input
          label="Paragraph 1"
          name="aboutParagraph1"
          type="textarea"
          value={form.aboutParagraph1}
          onChange={(e) => setForm({ ...form, aboutParagraph1: e.target.value })}
        />
        <Input
          label="Paragraph 2"
          name="aboutParagraph2"
          type="textarea"
          value={form.aboutParagraph2}
          onChange={(e) => setForm({ ...form, aboutParagraph2: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="primary" onClick={handleSave} className="gap-1">
          <FaSave className="w-4 h-4" /> Save Changes
        </Button>
        {saved && (
          <motion.span
            className="text-green-600 font-medium text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Changes saved!
          </motion.span>
        )}
      </div>
    </div>
  );
}
