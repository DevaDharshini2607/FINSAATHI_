import React, { useState, useEffect } from 'react';
import { Menu, X, Home, BookOpen, Layers, HelpCircle, Phone, Globe, User, LogOut, Moon, Sun, ChevronDown, LogIn, Mail, DollarSign, Edit2, CheckCircle2 } from 'lucide-react';
import logo from '../assets/logo_v2.jpg';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isEditingIncome, setIsEditingIncome] = useState(false);
    const [editedIncome, setEditedIncome] = useState('');
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [user, setUser] = useState<any>(null); // State for logged-in user
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check for user in localStorage on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const handleEditIncome = () => {
        setEditedIncome(user.monthly_income || '');
        setIsEditingIncome(true);
    };

    const handleSaveIncome = () => {
        const updatedUser = { ...user, monthly_income: editedIncome };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditingIncome(false);
    };

    const langMenuRef = React.useRef<HTMLDivElement>(null);
    const userMenuRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setLangMenuOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navLinks = [
        { name: 'Home', icon: Home, href: '/home' },
        { name: 'Features', icon: Layers, href: '#features' },
        { name: 'Tutorials', icon: BookOpen, href: '#tutorials' },
        { name: 'FAQ', icon: HelpCircle, href: '#faq' },
        { name: 'Contact', icon: Phone, href: '#contact' },
    ];

    const languages = [
        { code: 'en', name: 'English', label: 'English' },
        { code: 'hi', name: 'Hindi', label: 'हिंदी' },
        { code: 'ta', name: 'Tamil', label: 'தமிழ்' },
        { code: 'ml', name: 'Malayalam', label: 'മലയാളം' },
        { code: 'te', name: 'Telugu', label: 'తెలుగు' },
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLangMenuOpen(false);
        setIsOpen(false);
    };

    const currentLangLabel = languages.find(l => l.code === i18n.language)?.label || 'English';

    return (
        <>
            <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/home" className="flex items-center group cursor-pointer">
                            <img
                                src={logo}
                                alt="FinSaathi Logo"
                                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal"
                            />
                            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-blue transition-colors">
                                FinSaathi
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue font-medium transition-colors duration-200"
                                >
                                    <span>{link.name}</span>
                                </a>
                            ))}

                            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                                {/* Language Dropdown */}
                                <div className="relative" ref={langMenuRef}>
                                    <button
                                        onClick={() => { setLangMenuOpen(!langMenuOpen); setUserMenuOpen(false); }}
                                        className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-brand-blue transition-colors px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-brand-blue"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span className="text-sm font-semibold">{currentLangLabel}</span>
                                    </button>

                                    {langMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => changeLanguage(lang.code)}
                                                    className={clsx(
                                                        "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between",
                                                        i18n.language === lang.code ? "text-brand-blue font-bold" : "text-gray-700 dark:text-gray-200"
                                                    )}
                                                >
                                                    <span>{lang.name}</span>
                                                    <span className="text-xs text-gray-400">{lang.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* User Profile Dropdown OR Login Button */}
                                {user ? (
                                    <div className="relative" ref={userMenuRef}>
                                        <button
                                            onClick={() => { setUserMenuOpen(!userMenuOpen); setLangMenuOpen(false); }}
                                            className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-brand-blue transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
                                        >
                                            <div className="w-8 h-8 bg-brand-light-blue/20 rounded-full flex items-center justify-center border border-brand-blue/20">
                                                <User className="w-5 h-5 text-brand-blue" />
                                            </div>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>

                                        {userMenuOpen && (
                                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                                                {/* Profile Button */}
                                                <button
                                                    onClick={() => { setShowProfileModal(true); setUserMenuOpen(false); }}
                                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3"
                                                >
                                                    <User className="w-4 h-4" />
                                                    <span>Profile</span>
                                                </button>

                                                {/* Theme Toggle */}
                                                <button
                                                    onClick={toggleTheme}
                                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3 border-t border-gray-50 dark:border-gray-700"
                                                >
                                                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                                                </button>

                                                {/* Logout */}
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3 border-t border-gray-50 dark:border-gray-700"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="flex items-center space-x-2 bg-brand-blue text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span>Login</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button - Keeping existing logic, just improved style */}
                        <div className="md:hidden flex items-center space-x-4 relative" ref={userMenuRef}>
                            {/* Mobile User Icon (Simple) */}
                            {user && (
                                <div className="relative">
                                    <button
                                        onClick={() => { setUserMenuOpen(!userMenuOpen); setIsOpen(false); }}
                                        className="text-gray-600 dark:text-gray-300 focus:outline-none"
                                    >
                                        <div className="w-8 h-8 bg-brand-light-blue/20 rounded-full flex items-center justify-center border border-brand-blue/20">
                                            <User className="w-5 h-5 text-brand-blue" />
                                        </div>
                                    </button>

                                    {/* Mobile User Dropdown */}
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden z-50">
                                            {/* Profile Button */}
                                            <button
                                                onClick={() => { setShowProfileModal(true); setUserMenuOpen(false); }}
                                                className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3"
                                            >
                                                <User className="w-4 h-4" />
                                                <span>Profile</span>
                                            </button>

                                            {/* Theme Toggle */}
                                            <button
                                                onClick={toggleTheme}
                                                className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3 border-t border-gray-50 dark:border-gray-700"
                                            >
                                                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                                            </button>

                                            {/* Logout */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3 border-t border-gray-50 dark:border-gray-700"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Fallback for non-logged in user (though typically hidden or uses different logic) */}
                            {!user && (
                                <Link to="/login" className="text-gray-600 dark:text-gray-300">
                                    <User className="w-6 h-6" />
                                </Link>
                            )}


                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-600 dark:text-gray-300 hover:text-brand-blue focus:outline-none p-2"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 shadow-xl absolute w-full animate-slideDown overflow-y-auto max-h-[80vh]">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-blue hover:bg-brand-light-blue dark:hover:bg-slate-800 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span>{link.name}</span>
                                </a>
                            ))}

                            {/* Mobile Language Grid */}
                            <div className="border-t border-gray-100 dark:border-gray-800 my-2 pt-4 px-3">
                                <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Language</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={clsx(
                                                "px-3 py-2 text-sm rounded-lg border text-center transition-all",
                                                i18n.language === lang.code
                                                    ? "bg-brand-blue text-white border-brand-blue shadow-md"
                                                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-blue"
                                            )}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Profile Modal Overlay */}
            {showProfileModal && user && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 scale-100">
                        {/* Header */}
                        <div className="bg-brand-blue/10 p-6 flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-brand-blue">
                                    <User className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Personal Profile</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowProfileModal(false)}
                                className="bg-white/50 hover:bg-white p-2 rounded-full text-gray-600 hover:text-gray-900 transition-all border border-transparent hover:border-gray-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Details Body */}
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-full mr-4">
                                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Address</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-100">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-full mr-4">
                                        <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Mobile Number</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-100">{user.mobile || 'Not Provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-full mr-4">
                                        <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Monthly Income</p>

                                        {isEditingIncome ? (
                                            <div className="flex items-center space-x-2 mt-1">
                                                <input
                                                    type="number"
                                                    value={editedIncome}
                                                    onChange={(e) => setEditedIncome(e.target.value)}
                                                    className="w-full px-2 py-1 text-base border-b-2 border-brand-blue bg-transparent focus:outline-none text-gray-800 dark:text-white font-bold"
                                                    autoFocus
                                                />
                                                <button onClick={handleSaveIncome} className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-md">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => setIsEditingIncome(false)} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between mt-0.5">
                                                <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400">₹{user.monthly_income || '0'}</p>
                                                <button
                                                    onClick={handleEditIncome}
                                                    className="p-1.5 text-gray-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition-all"
                                                    title="Edit Income"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowProfileModal(false)}
                                className="w-full py-3 bg-brand-blue hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                Close Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
