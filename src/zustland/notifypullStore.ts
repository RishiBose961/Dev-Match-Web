import { create } from 'zustand';

type Notification = {
  status: string;
  // add other fields as needed
};

type NotificationStore = {
  notifications: Notification[];
  setNotifications: (notis: Notification[]) => void;
  unreadCount: () => number;
};

const useNotifypullStore= create<NotificationStore>((set, get) => ({
  notifications: [],

  setNotifications: (notis) => set({ notifications: notis }),

  unreadCount: () => get().notifications?.filter(n => n.status === "unread").length
}));

export default useNotifypullStore;
