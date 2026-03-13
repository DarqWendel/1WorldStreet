import { useState, useEffect } from "react";

const TOAST_LIMIT = 1;
let count = 0;
function generateId() { count = (count + 1) % Number.MAX_VALUE; return count.toString(); }

const toastStore = {
  state: { toasts: [] },
  listeners: [],
  getState: () => toastStore.state,
  setState: (next) => {
    toastStore.state = typeof next === 'function' ? next(toastStore.state) : { ...toastStore.state, ...next };
    toastStore.listeners.forEach(l => l(toastStore.state));
  },
  subscribe: (listener) => {
    toastStore.listeners.push(listener);
    return () => { toastStore.listeners = toastStore.listeners.filter(l => l !== listener); };
  },
};

export const toast = ({ ...props }) => {
  const id = generateId();
  const dismiss = () => toastStore.setState(s => ({ ...s, toasts: s.toasts.filter(t => t.id !== id) }));
  const update  = (p)  => toastStore.setState(s => ({ ...s, toasts: s.toasts.map(t => t.id === id ? { ...t, ...p } : t) }));
  toastStore.setState(s => ({ ...s, toasts: [{ ...props, id, dismiss }, ...s.toasts].slice(0, TOAST_LIMIT) }));
  return { id, dismiss, update };
};

export function useToast() {
  const [state, setState] = useState(toastStore.getState());
  useEffect(() => toastStore.subscribe(setState), []);
  useEffect(() => {
    const timeouts = state.toasts.map(t => {
      if (t.duration === Infinity) return null;
      return setTimeout(() => t.dismiss(), t.duration || 5000);
    }).filter(Boolean);
    return () => timeouts.forEach(clearTimeout);
  }, [state.toasts]);
  return { toast, toasts: state.toasts };
}
