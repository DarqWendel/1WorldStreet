import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button }   from '@/components/ui/button';
import { Input }    from '@/components/ui/input';
import { Label }    from '@/components/ui/label';
import { motion }   from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth }  from '@/contexts/AuthContext';

const LoginPage = () => {
  const [tab,         setTab        ] = useState('login'); // 'login' | 'register'
  const [showPass,    setShowPass   ] = useState(false);
  const [loading,     setLoading    ] = useState(false);

  const [loginData,   setLoginData  ] = useState({ email: '', password: '' });
  const [regData,     setRegData    ] = useState({ name: '', email: '', password: '', confirm: '' });

  const { login, register } = useAuth();
  const { toast }           = useToast();
  const navigate            = useNavigate();
  const location            = useLocation();

  // Redireciona para onde o usuário tentou ir antes (ou home)
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = login(loginData.email, loginData.password);
    setLoading(false);
    if (result.success) {
      toast({ title: `Bem-vindo de volta, ${result.user.name}! 👋` });
      navigate(from, { replace: true });
    } else {
      toast({ title: 'Erro ao entrar', description: result.error, variant: 'destructive' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regData.password !== regData.confirm) {
      toast({ title: 'As senhas não coincidem', variant: 'destructive' });
      return;
    }
    if (regData.password.length < 6) {
      toast({ title: 'Senha muito curta', description: 'Use pelo menos 6 caracteres.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const result = register(regData.name, regData.email, regData.password);
    setLoading(false);
    if (result.success) {
      toast({ title: `Conta criada! Bem-vindo, ${result.user.name}! 🎉` });
      navigate(from, { replace: true });
    } else {
      toast({ title: 'Erro ao cadastrar', description: result.error, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center container mx-auto container-padding py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/images/brand/logo.webp" alt="1worldstrt" className="h-14 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            {tab === 'login' ? 'Entre na sua conta para continuar' : 'Crie sua conta para comprar'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-border/40">
            <button onClick={() => setTab('login')}
              className={`flex-1 py-4 text-sm font-semibold tracking-wider uppercase transition-colors ${tab === 'login' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground'}`}>
              <LogIn className="h-4 w-4 inline mr-2" /> Entrar
            </button>
            <button onClick={() => setTab('register')}
              className={`flex-1 py-4 text-sm font-semibold tracking-wider uppercase transition-colors ${tab === 'register' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground'}`}>
              <UserPlus className="h-4 w-4 inline mr-2" /> Cadastrar
            </button>
          </div>

          <div className="p-8">
            {/* LOGIN */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" required placeholder="seu@email.com"
                      value={loginData.email} onChange={e => setLoginData({...loginData, email: e.target.value})}
                      className="pl-9 bg-input/60" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type={showPass ? 'text' : 'password'} required placeholder="Sua senha"
                      value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})}
                      className="pl-9 pr-9 bg-input/60" />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" size="lg" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider">
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            )}

            {/* CADASTRO */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="text" required placeholder="Seu nome"
                      value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})}
                      className="pl-9 bg-input/60" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" required placeholder="seu@email.com"
                      value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})}
                      className="pl-9 bg-input/60" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type={showPass ? 'text' : 'password'} required placeholder="Mínimo 6 caracteres"
                      value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})}
                      className="pl-9 pr-9 bg-input/60" />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="password" required placeholder="Repita a senha"
                      value={regData.confirm} onChange={e => setRegData({...regData, confirm: e.target.value})}
                      className="pl-9 bg-input/60" />
                  </div>
                </div>
                <Button type="submit" size="lg" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider">
                  {loading ? 'Criando conta...' : 'Criar conta'}
                </Button>
              </form>
            )}

            {/* Dica admin */}
            <div className="mt-6 pt-5 border-t border-border/30 text-center">
              <p className="text-xs text-muted-foreground/50 flex items-center justify-center gap-1">
               
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
