import { create } from 'zustand';
import api from '../lib/api';
import { Email } from '../types/email';

interface EmailStore {
  emails: Email[];
  selectedEmail: Email | null;
  loading: boolean;
  error: string | null;
  fetchEmails: () => Promise<void>;
  getEmail: (id: number) => Promise<void>;
  createEmail: (email: Email) => Promise<void>;
  updateEmail: (id: number, email: Email) => Promise<void>;
  deleteEmail: (id: number) => Promise<void>;
  setSelectedEmail: (email: Email | null) => void;
}

const useEmailStore = create<EmailStore>((set, get) => ({
  emails: [],
  selectedEmail: null,
  loading: false,
  error: null,

  fetchEmails: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/emails');
      set({ emails: response.data, loading: false });
    } catch (error: any) {
      console.error('Error fetching emails:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
      set({
        error: `Failed to fetch emails: ${error.message}`,
        loading: false,
      });
    }
  },

  getEmail: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/emails/${id}`);
      set({ selectedEmail: response.data, loading: false });
    } catch (error: any) {
      console.error('Error fetching email:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
      set({
        error: `Failed to fetch email: ${error.message}`,
        loading: false,
      });
    }
  },

  createEmail: async (email: Email) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/emails', email);
      set((state) => ({
        emails: [response.data, ...state.emails],
        loading: false,
      }));
    } catch (error: any) {
      console.error('Error creating email:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
      set({
        error: `Failed to create email: ${error.message}`,
        loading: false,
      });
    }
  },

  updateEmail: async (id: number, email: Email) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/emails/${id}`, email);
      set((state) => ({
        emails: state.emails.map((e) =>
          e.id === id ? response.data : e
        ),
        selectedEmail: response.data,
        loading: false,
      }));
    } catch (error: any) {
      console.error('Error updating email:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
      set({
        error: `Failed to update email: ${error.message}`,
        loading: false,
      });
    }
  },

  deleteEmail: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/emails/${id}`);
      set((state) => ({
        emails: state.emails.filter((e) => e.id !== id),
        selectedEmail:
          state.selectedEmail?.id === id ? null : state.selectedEmail,
        loading: false,
      }));
    } catch (error: any) {
      console.error('Error deleting email:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
      set({
        error: `Failed to delete email: ${error.message}`,
        loading: false,
      });
    }
  },

  setSelectedEmail: (email: Email | null) =>
    set({ selectedEmail: email }),
}));

export default useEmailStore;
