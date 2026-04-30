import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Plus, Trash2, Edit3, Save, X,
  Users, ShoppingBag, Image, Shield, BarChart3,
  Check, Settings, MessageCircle, QrCode, Smartphone,
  ChevronDown, Eye, Upload
} from 'lucide-react';
import { Button }   from '@/components/ui/button';
import { Input }    from '@/components/ui/input';
import { Label }    from '@/components/ui/label';
import { useAuth }  from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext';
import { useStoreConfig } from '@/contexts/StoreConfigContext';
import { useProducts } from '@/contexts/ProductsContext';
import { useToast } from '@/components/ui/use-toast';

const STATUS_COLORS = {
  'Pago':       'bg-green-500/20 text-green-400 border-green-500/30',
  'Aguardando': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Enviado':    'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Cancelado':  'bg-red-500/20 text-red-400 border-red-500/30',
};

const emptyProduct = {
  name: '', price: '', category: 'Camisetas',
  description: '', availableSizes: [], colors: [],
  images: [], tags: [], initialStock: '10',
};

const TABS = [
  { id: 'overview',  label: 'Visão Geral',  icon: BarChart3   },
  { id: 'products',  label: 'Produtos',     icon: Package     },
  { id: 'orders',    label: 'Pedidos',      icon: ShoppingBag },
  { id: 'customers', label: 'Clientes',     icon: Users       },
  { id: 'pix',       label: 'PIX',          icon: QrCode      },
  { id: 'whatsapp',  label: 'WhatsApp',     icon: MessageCircle },
];

const AdminPage = () => {
  const { users, currentUser }           = useAuth();
  const { orders, updateOrderStatus }    = useOrders();
  const { config, updateConfig }         = useStoreConfig();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast }                        = useToast();

  const [activeTab,   setActiveTab  ] = useState('overview');
  const [editingId,   setEditingId  ] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form,        setForm       ] = useState(emptyProduct);
  const [editForm,    setEditForm   ] = useState(null);

  // PIX form local state
  const [pixForm, setPixForm] = useState({
    pixKey: config.pixKey,
    pixKeyType: config.pixKeyType,
    pixReceiverName: config.pixReceiverName,
    pixQrCodeUrl: config.pixQrCodeUrl,
  });

  // WhatsApp form local state
  const [waForm, setWaForm] = useState({
    whatsappNumber: config.whatsappNumber,
    whatsappMessage: config.whatsappMessage,
  });

  const [saving, setSaving] = useState(false);

  // ── Produto — Adicionar ────────────────────────────────────
  const handleAdd = async () => {
    if (!form.name || !form.price) {
      toast({ title: 'Preencha nome e preço.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await addProduct(form);
      setForm(emptyProduct);
      setShowAddForm(false);
      toast({ title: 'Produto adicionado!' });
    } catch (err) {
      toast({ title: 'Erro ao salvar produto.', description: String(err.message), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Remover este produto?')) {
      try {
        await deleteProduct(id);
        toast({ title: 'Produto removido.' });
      } catch (err) {
        toast({ title: 'Erro ao remover.', variant: 'destructive' });
      }
    }
  };

  const handleEditSave = async () => {
    try {
      await updateProduct(editingId, editForm);
      setEditingId(null);
      setEditForm(null);
      toast({ title: 'Produto atualizado!' });
    } catch (err) {
      toast({ title: 'Erro ao atualizar.', variant: 'destructive' });
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  // ── PIX — Salvar ───────────────────────────────────────────
  const handleSavePix = () => {
    updateConfig(pixForm);
    toast({ title: 'Configurações PIX salvas!' });
  };

  // ── WhatsApp — Salvar ──────────────────────────────────────
  const handleSaveWa = () => {
    updateConfig(waForm);
    toast({ title: 'Configurações WhatsApp salvas!' });
  };

  // ── Totais para overview ───────────────────────────────────
  const totalRevenue  = orders.filter(o => o.status === 'Pago').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Aguardando').length;
  const customers     = users.filter(u => u.role !== 'admin');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50">
        <div className="container mx-auto container-padding py-6">
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
                { label: 'Receita (Pagos)',   value: `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`, icon: BarChart3, color: 'text-green-400' },
                { label: 'Pedidos',           value: orders.length,    icon: ShoppingBag, color: 'text-blue-400'   },
                { label: 'Aguardando',        value: pendingOrders,    icon: Package,     color: 'text-yellow-400' },
                { label: 'Clientes',          value: customers.length, icon: Users,       color: 'text-purple-400' },
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

            <div className="bg-card border border-border/40 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border/40">
                <h2 className="font-semibold text-foreground">Pedidos Recentes</h2>
              </div>
              {orders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Nenhum pedido ainda.</p>
                </div>
              ) : (
                <div className="divide-y divide-border/30">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground">{order.id} — {order.customer?.name}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`text-xs px-2 py-1 rounded border font-medium ${STATUS_COLORS[order.status] || ''}`}>{order.status}</span>
                        <p className="text-sm font-bold text-accent" style={{ fontFamily: "'Space Mono',monospace" }}>
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Tamanhos (vírgula)</Label>
                    <Input placeholder="P, M, G, GG"
                      value={form.availableSizes.join(', ')}
                      onChange={e => setForm({...form, availableSizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                      className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Cores (vírgula)</Label>
                    <Input placeholder="Preto, Branco"
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
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Estoque inicial por tamanho</Label>
                    <Input placeholder="Ex: 10" type="number" min="0"
                      value={form.initialStock}
                      onChange={e => setForm({...form, initialStock: e.target.value})}
                      className="bg-input/60" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Descrição</Label>
                    <Input placeholder="Descreva o produto..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="bg-input/60" />
                  </div>
                </div>
                {/* Preview da imagem */}
                {form.images[0] && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                    <img src={form.images[0]} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-border/40" />
                  </div>
                )}
                <div className="flex gap-3 mt-4">
                  <Button onClick={handleAdd} disabled={saving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="h-4 w-4 mr-2" /> {saving ? 'Salvando...' : 'Salvar Produto'}
                  </Button>
                  <Button variant="outline" onClick={() => { setShowAddForm(false); setForm(emptyProduct); }}>
                    <X className="h-4 w-4 mr-2" /> Cancelar
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className="bg-card border border-border/40 rounded-lg overflow-hidden">
                  {editingId === product.id ? (
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
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">URL Imagem</Label>
                          <Input value={editForm.images?.[0] || ''} onChange={e => setEditForm({...editForm, images: [e.target.value]})} className="bg-input/60 h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">Categoria</Label>
                          <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})}
                            className="w-full h-9 rounded-md border border-input bg-input/60 px-3 text-sm text-foreground">
                            <option>Camisetas</option><option>Croppeds</option><option>Acessórios</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="text-xs text-muted-foreground mb-1 block">Descrição</Label>
                          <Input value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="bg-input/60 h-9 text-sm" />
                        </div>
                      </div>
                      {editForm.images?.[0] && (
                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                          <img src={editForm.images[0]} alt="Preview" className="w-20 h-20 object-cover rounded border border-border/40" />
                        </div>
                      )}
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
                        {product.stock && Object.keys(product.stock).length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {Object.entries(product.stock).map(([size, qty]) => (
                              <div key={size} className="flex items-center gap-1 bg-muted/40 border border-border/30 rounded px-1.5 py-0.5">
                                <span className="text-[10px] font-semibold text-muted-foreground">{size}</span>
                                <button onClick={() => updateStock(product.id, size, qty - 1)}
                                  className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors text-xs leading-none">−</button>
                                <span className={`text-[11px] font-bold w-5 text-center ${qty === 0 ? 'text-destructive' : qty <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>{qty}</span>
                                <button onClick={() => updateStock(product.id, size, qty + 1)}
                                  className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-green-400 transition-colors text-xs leading-none">+</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-accent font-bold flex-shrink-0" style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.85rem' }}>
                        R$ {parseFloat(product.price).toFixed(2).replace('.', ',')}
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
              {orders.length} Pedido{orders.length !== 1 ? 's' : ''}
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Nenhum pedido ainda.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="bg-card border border-border/40 rounded-lg p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="font-semibold text-foreground text-sm font-mono">{order.id}</p>
                          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${STATUS_COLORS[order.status] || ''}`}>{order.status}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.customer?.name} · {order.customer?.email}</p>
                        {order.customer?.phone && <p className="text-xs text-muted-foreground">{order.customer.phone}</p>}
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                        {order.address && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {order.address.address}, {order.address.city} - {order.address.state}
                          </p>
                        )}
                        {order.items && (
                          <div className="mt-2">
                            {order.items.map((item, i) => (
                              <p key={i} className="text-xs text-muted-foreground">
                                • {item.name} ({item.selectedSize} {item.selectedColor}) x{item.quantity}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <p className="text-lg font-bold text-accent" style={{ fontFamily: "'Space Mono',monospace" }}>
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </p>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {['Aguardando', 'Pago', 'Enviado', 'Cancelado'].map(status => (
                            <button key={status} onClick={() => updateOrderStatus(order.id, status)}
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
            )}
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
                    <span className="text-xs px-2 py-1 rounded bg-muted/40 border border-border/30 text-muted-foreground">Cliente</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PIX ─────────────────────────────────────────── */}
        {activeTab === 'pix' && (
          <div className="max-w-lg">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
              <QrCode className="h-5 w-5 text-primary" /> Configurações PIX
            </h2>
            <div className="bg-card border border-border/40 rounded-lg p-6 space-y-5">
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Tipo da Chave PIX</Label>
                <select value={pixForm.pixKeyType} onChange={e => setPixForm({...pixForm, pixKeyType: e.target.value})}
                  className="w-full h-10 rounded-md border border-input bg-input/60 px-3 text-sm text-foreground">
                  <option value="email">E-mail</option>
                  <option value="cpf">CPF</option>
                  <option value="telefone">Telefone</option>
                  <option value="aleatoria">Chave Aleatória</option>
                </select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Chave PIX *</Label>
                <Input
                  value={pixForm.pixKey}
                  onChange={e => setPixForm({...pixForm, pixKey: e.target.value})}
                  placeholder="Ex: contato@loja.com"
                  className="bg-input/60 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Nome do Recebedor *</Label>
                <Input
                  value={pixForm.pixReceiverName}
                  onChange={e => setPixForm({...pixForm, pixReceiverName: e.target.value})}
                  placeholder="Nome que aparece no PIX"
                  className="bg-input/60"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">URL do QR Code (opcional)</Label>
                <Input
                  value={pixForm.pixQrCodeUrl}
                  onChange={e => setPixForm({...pixForm, pixQrCodeUrl: e.target.value})}
                  placeholder="https://... (imagem do QR Code)"
                  className="bg-input/60"
                />
                {pixForm.pixQrCodeUrl && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1">Preview QR Code:</p>
                    <img src={pixForm.pixQrCodeUrl} alt="QR Code" className="w-32 h-32 object-contain border border-border/40 rounded bg-white p-1" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Gere o QR Code no app do seu banco e cole o link da imagem aqui.
                </p>
              </div>
              <Button onClick={handleSavePix} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Save className="h-4 w-4 mr-2" /> Salvar Configurações PIX
              </Button>
            </div>

            {/* Preview atual */}
            <div className="mt-6 bg-muted/20 border border-border/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Configuração atual ativa</p>
              <p className="text-sm text-foreground">Chave: <span className="font-mono text-accent">{config.pixKey}</span></p>
              <p className="text-sm text-foreground">Recebedor: <span className="font-medium">{config.pixReceiverName}</span></p>
              <p className="text-sm text-foreground">Tipo: <span className="font-medium">{config.pixKeyType}</span></p>
            </div>
          </div>
        )}

        {/* ── WHATSAPP ─────────────────────────────────────── */}
        {activeTab === 'whatsapp' && (
          <div className="max-w-lg">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
              <MessageCircle className="h-5 w-5 text-green-400" /> Configurações WhatsApp
            </h2>
            <div className="bg-card border border-border/40 rounded-lg p-6 space-y-5">
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Número do WhatsApp *</Label>
                <Input
                  value={waForm.whatsappNumber}
                  onChange={e => setWaForm({...waForm, whatsappNumber: e.target.value})}
                  placeholder="5585999999999"
                  className="bg-input/60 font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Formato: 55 + DDD + número (sem espaços ou hifens). Ex: 5585999999999
                </p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Mensagem padrão</Label>
                <textarea
                  value={waForm.whatsappMessage}
                  onChange={e => setWaForm({...waForm, whatsappMessage: e.target.value})}
                  rows={10}
                  className="w-full rounded-md border border-input bg-input/60 px-3 py-2 text-sm text-foreground resize-y font-mono"
                />
                <div className="mt-2 bg-muted/30 border border-border/30 rounded p-3 text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground mb-1">Variáveis disponíveis:</p>
                  <p><code className="text-accent">{'{orderId}'}</code> — Número do pedido</p>
                  <p><code className="text-accent">{'{items}'}</code> — Lista de produtos</p>
                  <p><code className="text-accent">{'{total}'}</code> — Valor total</p>
                </div>
              </div>
              <Button onClick={handleSaveWa} className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold">
                <Save className="h-4 w-4 mr-2" /> Salvar Configurações WhatsApp
              </Button>
            </div>

            <div className="mt-6 bg-muted/20 border border-border/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Número atual ativo</p>
              <p className="text-sm font-mono text-accent">{config.whatsappNumber}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;
