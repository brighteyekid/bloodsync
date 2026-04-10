import React, { useState, useEffect } from 'react';
import { CalendarPlus, Edit2, Trash2, MapPin, Clock } from 'lucide-react';
import { eventApi } from '../../api/axios';

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    type: 'blood_drive' | 'awareness' | 'training';
    status: 'upcoming' | 'ongoing' | 'completed';
    created_at?: string;
}

const EventManagement: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        location: '',
        description: '',
        type: 'blood_drive' as Event['type'],
        status: 'upcoming' as Event['status']
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const eventData = {
                ...formData,
                date: formData.date,
                time: formData.time
            };

            if (editingEvent) {
                await eventApi.update(editingEvent.id, eventData);
            } else {
                await eventApi.create(eventData);
            }
            await fetchEvents();
            resetForm();
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await eventApi.getAll();
            if (response.data?.status === 'success') {
                const formattedEvents = response.data.data.map((event: Event) => ({
                    ...event,
                    date: new Date(event.date).toISOString().split('T')[0],
                    time: event.time.substring(0, 5)
                }));
                setEvents(formattedEvents);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const resetForm = () => {
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: '09:00',
            location: '',
            description: '',
            type: 'blood_drive',
            status: 'upcoming'
        });
        setEditingEvent(null);
        setShowForm(false);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            ...event,
            date: event.date,
            time: event.time.substring(0, 5)
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await eventApi.delete(id);
                await fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        return timeString.substring(0, 5);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Event Logistics</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all"
                >
                    <CalendarPlus size={18} /> Add Mission
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200]">
                    <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-2xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-red-50 rounded-full opacity-50" />
                        
                        <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight relative z-10">
                            {editingEvent ? 'Secure Edit: Event' : 'Initialize New Event'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Mission Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Deployment Date</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={e => setFormData({...formData, date: e.target.value})}
                                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Deployment Time</label>
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={e => setFormData({...formData, time: e.target.value})}
                                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Geo-Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={e => setFormData({...formData, location: e.target.value})}
                                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Mission Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={e => setFormData({...formData, type: e.target.value as Event['type']})}
                                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm appearance-none"
                                    >
                                        <option value="blood_drive">Blood Drive</option>
                                        <option value="awareness">Awareness Campaign</option>
                                        <option value="training">Training Session</option>
                                    </select>
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Operational Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({...formData, status: e.target.value as Event['status']})}
                                        className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm appearance-none"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Mission Parameters</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm resize-none"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-8 py-4 border border-gray-100 rounded-2xl text-gray-400 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all font-bold"
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    {editingEvent ? 'Override Data' : 'Execute Mission'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <div key={event.id} className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white/50 p-8 hover:shadow-xl transition-all duration-500">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{event.title}</h3>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(event)} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(event.id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4 text-gray-500">
                            <p className="flex items-center gap-3 text-xs font-bold italic">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-300"><CalendarPlus size={14} /></div> {formatDate(event.date)}
                            </p>
                            <p className="flex items-center gap-3 text-xs font-bold italic">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-300"><Clock size={14} /></div> {formatTime(event.time)}
                            </p>
                            <p className="flex items-center gap-3 text-xs font-bold italic">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-300"><MapPin size={14} /></div> {event.location}
                            </p>
                        </div>
                        <p className="mt-6 text-gray-400 text-xs font-semibold leading-relaxed line-clamp-2 italic">{event.description}</p>
                        <div className="mt-8 flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                                event.type === 'blood_drive' ? 'bg-red-50 text-red-600' :
                                event.type === 'awareness' ? 'bg-blue-50 text-blue-600' :
                                'bg-green-50 text-green-600'
                            }`}>
                                {event.type.replace('_', ' ')}
                            </span>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                                event.status === 'upcoming' ? 'bg-yellow-50 text-yellow-600' :
                                event.status === 'ongoing' ? 'bg-green-50 text-green-600' :
                                'bg-gray-100 text-gray-400'
                            }`}>
                                {event.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManagement; 