import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Plus, Trash2, Edit3, Save, X,
  Users, ShoppingBag, Image, Shield, BarChart3,
  Upload, Check
} from 'lucide-react';
import { Button }  from '@/components/ui/button';
import { Input }   from '@/components/ui/input';
import { Label }   from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { allProductsData } from '@/data/products';

// ── Dados mock de pedidos (futuramente viram do backend) ──────
const mockOrders = [
  { id: 'ORD-001', customer: 'João Silva',    total: 119.90, status: 'Pago',       date: '2025-01-10', items: ['Camiseta Fé em Deus (Creme) x1'] },
  { id: 'ORD-002', customer: 'Maria Souza',   total: 299.80, status: 'Aguardando', date: '2025-01-11', items: ['Camiseta Dragão x2'] },
  { id: 'ORD-003', customer: 'Pedro Santos',  total: 149.90, status: 'Enviado',    date: '2025-01-12', items: ['Cropped Roxa x1'] },
];

const STATUS_COLORS = {
  'Pago':       'bg-green-500/20 text-green-400 border-green-500/30',
  'Aguardando': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Enviado':    'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Cancelado':  'bg-red-500/20 text-red-400 border-red-500/30',
};

// ── Formulário em branco para novo produto ────────────────────
const emptyProduct = {
  name: '', price: '', category: 'Camisetas',
  description: '', availableSizes: [], colors: [],
  images: [], tags: [],
};

const TABS = [
  { id: 'overview',  label: 'Visão Geral',  icon: BarChart3  },
  { id: 'products',  label: 'Produtos',     icon: Package    },
  { id: 'orders',    label: 'Pedidos',      icon: ShoppingBag},
  { id: 'customers', label: 'Clientes',     icon: Users      },
];

const AdminPage = () => {
  const { users, currentUser } = useAuth();
  const [activeTab,    setActiveTab   ] = useState('overview');
  const [products,     setProducts    ] = useState(allProductsData);
  const [orders,       setOrders      ] = useState(mockOrders);
  const [editingId,    setEditingId   ] = useState(null);
  const [showAddForm,  setShowAddForm ] = useState(false);
  const [form,         setForm        ] = useState(emptyProduct);
  const [editForm,     setEditForm    ] = useState(null);

  // ── Funções de produto ─────────────────────────────────────
  const handleAdd = () => {
    if (!form.name || !form.price) return;
    const newProduct = { ...form, id: Date.now(), price: form.price.replace(',', '.') };
    setProducts(prev => [...prev, newProduct]);
    setForm(emptyProduct);
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Remover este produto?')) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleEditSave = () => {
    setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } : p));
    setEditingId(null);
    setEditForm(null);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // ── Totais ─────────────────────────────────────────────────
  const totalRevenue   = orders.filter(o => o.status === 'Pago').reduce((s, o) => s + o.total, 0);
  const pendingOrders  = orders.filter(o => o.status === 'Aguardando').length;
  const customers      = users.filter(u => u.role !== 'admin');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50">
        <div className="container mx-auto container-padding py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                  Painel Administrativo
                </h1>
                <p className="text-xs text-muted-foreground">Logado como {currentUser?.name}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 overflow-x-auto pb-1">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}>
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto container-padding py-8">

        {/* ── VISÃO GERAL ─────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { label: 'Receita (Pagos)',    value: `R$ ${totalRevenue.toFixed(2).replace('.',',')}`, icon: BarChart3, color: 'text-green-400' },
                { label: 'Pedidos',            value: orders.length,  icon: ShoppingBag, color: 'text-blue-400' },
                { label: 'Pedidos Pendentes',  value: pendingOrders,  icon: Package,     color: 'text-yellow-400' },
                { label: 'Clientes',           value: customers.length, icon: Users,     color: 'text-purple-400' },
              ].map(card => (
                <div key={card.label} className="bg-card border border-border/40 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{card.label}</p>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <p className={`text-2xl font-black ${card.color}`} style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Pedidos recentes */}
            <div className="bg-card border border-border/40 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border/40">
                <h2 className="font-semibold text-foreground">Pedidos Recentes</h2>
              </div>
              <div className="divide-y divide-border/30">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground">{order.id} — {order.customer}</p>
                      <p className="text-xs text-muted-foreground truncate">{order.items.join(', ')}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded border font-medium ${STATUS_COLORS[order.status] || ''}`}>{order.status}</span>
                      <p className="text-sm font-bold text-accent" style={{ fontFamily: "'Space Mono',monospace" }}>
                        R$ {order.total.toFixed(2).replace('.',',')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUTOS ────────────────────────────────────── */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                {products.length} Produtos
              </h2>
              <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" /> Adicionar Produto
              </Button>
            </div>

            {/* Formulário de adição */}
            {showAddForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-primary/30 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-primary" /> Novo Produto
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Nome *</Label>
                    <Input placeholder="Ex: Camiseta Dragão Azul" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Preço (R$) *</Label>
                    <Input placeholder="Ex: 129.90" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Categoria</Label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full h-10 rounded-md border border-input bg-input/60 px-3 text-sm text-foreground">
                      <option>Camisetas</option>
                      <option>Croppeds</option>
                      <option>Acessórios</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Tamanhos (separados por vírgula)</Label>
                    <Input placeholder="P, M, G, GG"
                      value={form.availableSizes.join(', ')}
                      onChange={e => setForm({...form, availableSizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                      className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Cores (separadas por vírgula)</Label>
                    <Input placeholder="Preto, Branco, Vermelho"
                      value={form.colors.join(', ')}
                      onChange={e => setForm({...form, colors: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                      className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">URL da Imagem</Label>
                    <Input placeholder="/images/products/meu-produto.webp"
                      value={form.images[0] || ''}
                      onChange={e => setForm({...form, images: [e.target.value]})}
                      className="bg-input/60" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Descrição</Label>
                    <Input placeholder="Descreva o produto..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="bg-input/60" />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="h-4 w-4 mr-2" /> Salvar Produto
                  </Button>
                  <Button variant="outline" onClick={() => { setShowAddForm(false); setForm(emptyProduct); }}>
                    <X className="h-4 w-4 mr-2" /> Cancelar
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Lista de produtos */}
            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className="bg-card border border-border/40 rounded-lg overflow-hidden">
                  {editingId === product.id ? (
                    /* Edição inline */
                    <div className="p-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">Nome</Label>
                          <Input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="bg-input/60 h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">Preço</Label>
                          <Input value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="bg-input/60 h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">Tamanhos</Label>
                          <Input value={editForm.availableSizes?.join(', ')} onChange={e => setEditForm({...editForm, availableSizes: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} className="bg-input/60 h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">Cores</Label>
                          <Input value={editForm.colors?.join(', ')} onChange={e => setEditForm({...editForm, colors: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} className="bg-input/60 h-9 text-sm" />
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="text-xs text-muted-foreground mb-1 block">Descrição</Label>
                          <Input value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="bg-input/60 h-9 text-sm" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleEditSave} className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 text-xs">
                          <Check className="h-3.5 w-3.5 mr-1" /> Salvar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="h-8 text-xs">
                          <X className="h-3.5 w-3.5 mr-1" /> Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Visualização */
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0 border border-border/30">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Image className="h-6 w-6 text-muted-foreground/40" /></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category} · {product.colors?.join(', ')}</p>
                        <p className="text-xs text-muted-foreground">Tamanhos: {product.availableSizes?.join(', ')}</p>
                      </div>
                      <p className="text-accent font-bold flex-shrink-0" style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.85rem' }}>
                        R$ {parseFloat(product.price).toFixed(2).replace('.',',')}
                      </p>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(product)} className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(product.id)} className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PEDIDOS ─────────────────────────────────────── */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
              {orders.length} Pedidos
            </h2>
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="bg-card border border-border/40 rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground text-sm">{order.id}</p>
                        <span className={`text-xs px-2 py-0.5 rounded border font-medium ${STATUS_COLORS[order.status] || ''}`}>{order.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer} · {order.date}</p>
                      <p className="text-xs text-muted-foreground mt-1">{order.items.join(', ')}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold text-accent" style={{ fontFamily: "'Space Mono',monospace" }}>
                        R$ {order.total.toFixed(2).replace('.',',')}
                      </p>
                      <div className="flex gap-1">
                        {['Aguardando','Pago','Enviado','Cancelado'].map(status => (
                          <button key={status} onClick={() => handleOrderStatus(order.id, status)}
                            className={`text-[10px] px-2 py-1 rounded border transition-colors ${order.status === status ? 'border-accent text-accent bg-accent/10' : 'border-border/40 text-muted-foreground hover:border-foreground/30'}`}>
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CLIENTES ────────────────────────────────────── */}
        {activeTab === 'customers' && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
              {customers.length} Cliente{customers.length !== 1 ? 's' : ''}
            </h2>
            {customers.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Nenhum cliente cadastrado ainda.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {customers.map(user => (
                  <div key={user.id} className="bg-card border border-border/40 rounded-lg px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {user.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-muted/40 border border-border/30 text-muted-foreground">
                      {user.role === 'admin' ? 'Admin' : 'Cliente'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;
