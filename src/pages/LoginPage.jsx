
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual login logic (e.g., Supabase Auth)
    console.log('Login attempt:', loginForm);
    toast({ title: "Login Simulado", description: "Bem-vindo de volta! (Simulação)" });
    // On successful login from backend, you would redirect or set auth state.
    // For now, redirect to home
    localStorage.setItem('1worldstrt_user', JSON.stringify({ email: loginForm.email, name: "Usuário Teste" }));
    navigate('/'); 
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({ title: "Erro no Cadastro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    // TODO: Implement actual registration logic (e.g., Supabase Auth)
    console.log('Register attempt:', registerForm);
    toast({ title: "Cadastro Simulado", description: "Sua conta foi criada com sucesso! (Simulação)" });
     // On successful registration from backend, you might auto-login or ask user to login.
    // For now, switch to login and clear register form
    localStorage.setItem('1worldstrt_user', JSON.stringify({ email: registerForm.email, name: registerForm.name }));
    setIsLogin(true);
    setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
    navigate('/');
  };

  return (
    <div className="container mx-auto section-padding flex items-center justify-center container-padding">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-card p-8 rounded-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <LogIn className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold text-card-foreground">
            {isLogin ? 'Bem-vindo de Volta!' : 'Crie Sua Conta'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'Acesse sua conta para continuar.' : 'Junte-se à comunidade 1worldstrt.'}
          </p>
        </div>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <Label htmlFor="login-email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="login-email" name="email" type="email" placeholder="seuemail@exemplo.com" required value={loginForm.email} onChange={handleLoginChange} className="pl-10 bg-input"/>
              </div>
            </div>
            <div>
              <Label htmlFor="login-password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="login-password" name="password" type="password" placeholder="Sua senha" required value={loginForm.password} onChange={handleLoginChange} className="pl-10 bg-input"/>
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
              Entrar
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div>
              <Label htmlFor="register-name">Nome Completo</Label>
              <div className="relative">
                 <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="register-name" name="name" type="text" placeholder="Seu nome completo" required value={registerForm.name} onChange={handleRegisterChange} className="pl-10 bg-input"/>
              </div>
            </div>
            <div>
              <Label htmlFor="register-email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="register-email" name="email" type="email" placeholder="seuemail@exemplo.com" required value={registerForm.email} onChange={handleRegisterChange} className="pl-10 bg-input"/>
              </div>
            </div>
            <div>
              <Label htmlFor="register-password">Senha</Label>
              <div className="relative">
                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="register-password" name="password" type="password" placeholder="Crie uma senha forte" required value={registerForm.password} onChange={handleRegisterChange} className="pl-10 bg-input"/>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirme sua senha" required value={registerForm.confirmPassword} onChange={handleRegisterChange} className="pl-10 bg-input"/>
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
              Cadastrar
            </Button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-primary/80">
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
