import React, { useState, useEffect } from 'react';
import { FaCalendarPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Event Management</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                    <FaCalendarPlus /> Add New Event
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h3 className="text-xl font-bold mb-4">
                            {editingEvent ? 'Edit Event' : 'Add New Event'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={e => setFormData({...formData, date: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Time</label>
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={e => setFormData({...formData, time: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={e => setFormData({...formData, location: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={e => setFormData({...formData, type: e.target.value as Event['type']})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    >
                                        <option value="blood_drive">Blood Drive</option>
                                        <option value="awareness">Awareness Campaign</option>
                                        <option value="training">Training Session</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({...formData, status: e.target.value as Event['status']})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    {editingEvent ? 'Update Event' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2 text-gray-600">
                            <p className="flex items-center gap-2">
                                <FaCalendarPlus /> {formatDate(event.date)}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaClock /> {formatTime(event.time)}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt /> {event.location}
                            </p>
                        </div>
                        <p className="mt-4 text-gray-700">{event.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                event.type === 'blood_drive' ? 'bg-red-100 text-red-800' :
                                event.type === 'awareness' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                                {event.type.replace('_', ' ')}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                event.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                                event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
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