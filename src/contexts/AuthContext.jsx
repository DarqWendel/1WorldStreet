/**
 * ============================================================
 * AUTH CONTEXT — Sistema de Autenticação
 * ============================================================
 * Gerencia login de cliente e administrador.
 *
 * CREDENCIAIS DO ADMIN (altere aqui antes de publicar):
 *   Email: admin@1worldstrt.com
 *   Senha: admin123
 *
 * TODO (backend): substitua a lógica de login pelo fetch à sua API:
 *   POST /api/auth/login  → { email, password } → { token, user }
 *   POST /api/auth/register → { name, email, password } → { token, user }
 *
 * Depois guarde o token no localStorage e valide nas rotas protegidas.
 * ============================================================
 */

import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

// ── Credenciais do administrador ─────────────────────────────
// Altere antes de publicar em produção!
const ADMIN_EMAIL    = 'admin@1worldstrt.com';
const ADMIN_PASSWORD = 'admin123';

// ── Banco de usuários em memória (substituir por API) ─────────
// Usuários de teste pré-cadastrados:
const INITIAL_USERS = [
  { id: 1, name: 'Admin', email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin' },
];

const STORAGE_KEY_USER  = '1worldstrt_user';
const STORAGE_KEY_USERS = '1worldstrt_users';

export const AuthProvider = ({ children }) => {
  // Usuário logado atualmente
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_USER)); }
    catch { return null; }
  });

  // Base de usuários cadastrados (simulando banco)
  const [users, setUsers] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS));
      return saved?.length ? saved : INITIAL_USERS;
    } catch { return INITIAL_USERS; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    else localStorage.removeItem(STORAGE_KEY_USER);
  }, [currentUser]);

  // ── LOGIN ─────────────────────────────────────────────────
  const login = (email, password) => {
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return { success: false, error: 'E-mail ou senha incorretos.' };
    // Não salva a senha no estado
    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  };

  // ── CADASTRO ──────────────────────────────────────────────
  const register = (name, email, password) => {
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, error: 'Este e-mail já está cadastrado.' };
    const newUser = { id: Date.now(), name, email, password, role: 'customer' };
    setUsers(prev => [...prev, newUser]);
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  };

  // ── LOGOUT ────────────────────────────────────────────────
  const logout = () => setCurrentUser(null);

  // ── HELPERS ───────────────────────────────────────────────
  const isAdmin    = currentUser?.role === 'admin';
  const isLoggedIn = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, isAdmin, login, register, logout, users }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook de atalho
export const useAuth = () => useContext(AuthContext);
