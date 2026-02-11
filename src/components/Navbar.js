import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState(null); // State for logged-in user
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
        }
        else {
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
    const langMenuRef = React.useRef(null);
    const userMenuRef = React.useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setLangMenuOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
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
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLangMenuOpen(false);
        setIsOpen(false);
    };
    const currentLangLabel = languages.find(l => l.code === i18n.language)?.label || 'English';
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { className: "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300", children: [_jsx("div", { className: "w-full px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs(Link, { to: "/home", className: "flex items-center group cursor-pointer", children: [_jsx("img", { src: logo, alt: "FinSaathi Logo", className: "h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" }), _jsx("span", { className: "ml-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-blue transition-colors", children: "FinSaathi" })] }), _jsxs("div", { className: "hidden md:flex items-center space-x-6", children: [navLinks.map((link) => (_jsx("a", { href: link.href, className: "flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue font-medium transition-colors duration-200", children: _jsx("span", { children: link.name }) }, link.name))), _jsxs("div", { className: "flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "relative", ref: langMenuRef, children: [_jsxs("button", { onClick: () => { setLangMenuOpen(!langMenuOpen); setUserMenuOpen(false); }, className: "flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-brand-blue transition-colors px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-brand-blue", children: [_jsx(Globe, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-semibold", children: currentLangLabel })] }), langMenuOpen && (_jsx("div", { className: "absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2", children: languages.map((lang) => (_jsxs("button", { onClick: () => changeLanguage(lang.code), className: clsx("w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between", i18n.language === lang.code ? "text-brand-blue font-bold" : "text-gray-700 dark:text-gray-200"), children: [_jsx("span", { children: lang.name }), _jsx("span", { className: "text-xs text-gray-400", children: lang.label })] }, lang.code))) }))] }), user ? (_jsxs("div", { className: "relative", ref: userMenuRef, children: [_jsxs("button", { onClick: () => { setUserMenuOpen(!userMenuOpen); setLangMenuOpen(false); }, className: "flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-brand-blue transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800", children: [_jsx("div", { className: "w-8 h-8 bg-brand-light-blue/20 rounded-full flex items-center justify-center border border-brand-blue/20", children: _jsx(User, { className: "w-5 h-5 text-brand-blue" }) }), _jsx(ChevronDown, { className: "w-4 h-4" })] }), userMenuOpen && (_jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden", children: [_jsxs("button", { onClick: () => { setShowProfileModal(true); setUserMenuOpen(false); }, className: "w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3", children: [_jsx(User, { className: "w-4 h-4" }), _jsx("span", { children: "Profile" })] }), _jsxs("button", { onClick: toggleTheme, className: "w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3 border-t border-gray-50 dark:border-gray-700", children: [theme === 'light' ? _jsx(Moon, { className: "w-4 h-4" }) : _jsx(Sun, { className: "w-4 h-4" }), _jsx("span", { children: theme === 'light' ? 'Dark Mode' : 'Light Mode' })] }), _jsxs("button", { onClick: handleLogout, className: "w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3 border-t border-gray-50 dark:border-gray-700", children: [_jsx(LogOut, { className: "w-4 h-4" }), _jsx("span", { children: "Logout" })] })] }))] })) : (_jsxs(Link, { to: "/login", className: "flex items-center space-x-2 bg-brand-blue text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm", children: [_jsx(LogIn, { className: "w-4 h-4" }), _jsx("span", { children: "Login" })] }))] })] }), _jsxs("div", { className: "md:hidden flex items-center space-x-4 relative", ref: userMenuRef, children: [user && (_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => { setUserMenuOpen(!userMenuOpen); setIsOpen(false); }, className: "text-gray-600 dark:text-gray-300 focus:outline-none", children: _jsx("div", { className: "w-8 h-8 bg-brand-light-blue/20 rounded-full flex items-center justify-center border border-brand-blue/20", children: _jsx(User, { className: "w-5 h-5 text-brand-blue" }) }) }), userMenuOpen && (_jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden z-50", children: [_jsxs("button", { onClick: () => { setShowProfileModal(true); setUserMenuOpen(false); }, className: "w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3", children: [_jsx(User, { className: "w-4 h-4" }), _jsx("span", { children: "Profile" })] }), _jsxs("button", { onClick: toggleTheme, className: "w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3 border-t border-gray-50 dark:border-gray-700", children: [theme === 'light' ? _jsx(Moon, { className: "w-4 h-4" }) : _jsx(Sun, { className: "w-4 h-4" }), _jsx("span", { children: theme === 'light' ? 'Dark Mode' : 'Light Mode' })] }), _jsxs("button", { onClick: handleLogout, className: "w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3 border-t border-gray-50 dark:border-gray-700", children: [_jsx(LogOut, { className: "w-4 h-4" }), _jsx("span", { children: "Logout" })] })] }))] })), !user && (_jsx(Link, { to: "/login", className: "text-gray-600 dark:text-gray-300", children: _jsx(User, { className: "w-6 h-6" }) })), _jsx("button", { onClick: () => setIsOpen(!isOpen), className: "text-gray-600 dark:text-gray-300 hover:text-brand-blue focus:outline-none p-2", children: isOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] })] }) }), isOpen && (_jsx("div", { className: "md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 shadow-xl absolute w-full animate-slideDown overflow-y-auto max-h-[80vh]", children: _jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3", children: [navLinks.map((link) => (_jsxs("a", { href: link.href, className: "flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-blue hover:bg-brand-light-blue dark:hover:bg-slate-800 transition-all", onClick: () => setIsOpen(false), children: [_jsx(link.icon, { className: "w-5 h-5" }), _jsx("span", { children: link.name })] }, link.name))), _jsxs("div", { className: "border-t border-gray-100 dark:border-gray-800 my-2 pt-4 px-3", children: [_jsx("p", { className: "text-xs font-semibold text-gray-400 uppercase mb-3", children: "Language" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: languages.map((lang) => (_jsx("button", { onClick: () => changeLanguage(lang.code), className: clsx("px-3 py-2 text-sm rounded-lg border text-center transition-all", i18n.language === lang.code
                                                    ? "bg-brand-blue text-white border-brand-blue shadow-md"
                                                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-blue"), children: lang.label }, lang.code))) })] })] }) }))] }), showProfileModal && user && (_jsx("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in", children: _jsxs("div", { className: "bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 scale-100", children: [_jsxs("div", { className: "bg-brand-blue/10 p-6 flex justify-between items-start", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-brand-blue", children: _jsx(User, { className: "w-8 h-8" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: user.name }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Personal Profile" })] })] }), _jsx("button", { onClick: () => setShowProfileModal(false), className: "bg-white/50 hover:bg-white p-2 rounded-full text-gray-600 hover:text-gray-900 transition-all border border-transparent hover:border-gray-200", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-gray-600", children: [_jsx("div", { className: "bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-full mr-4", children: _jsx(Mail, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-400 font-semibold uppercase tracking-wider", children: "Email Address" }), _jsx("p", { className: "font-medium text-gray-800 dark:text-gray-100", children: user.email })] })] }), _jsxs("div", { className: "flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-gray-600", children: [_jsx("div", { className: "bg-green-100 dark:bg-green-900/30 p-2.5 rounded-full mr-4", children: _jsx(Phone, { className: "w-5 h-5 text-green-600 dark:text-green-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-400 font-semibold uppercase tracking-wider", children: "Mobile Number" }), _jsx("p", { className: "font-medium text-gray-800 dark:text-gray-100", children: user.mobile || 'Not Provided' })] })] }), _jsxs("div", { className: "flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-gray-600", children: [_jsx("div", { className: "bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-full mr-4", children: _jsx(DollarSign, { className: "w-5 h-5 text-purple-600 dark:text-purple-400" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-xs text-gray-400 font-semibold uppercase tracking-wider", children: "Monthly Income" }), isEditingIncome ? (_jsxs("div", { className: "flex items-center space-x-2 mt-1", children: [_jsx("input", { type: "number", value: editedIncome, onChange: (e) => setEditedIncome(e.target.value), className: "w-full px-2 py-1 text-base border-b-2 border-brand-blue bg-transparent focus:outline-none text-gray-800 dark:text-white font-bold", autoFocus: true }), _jsx("button", { onClick: handleSaveIncome, className: "bg-green-500 hover:bg-green-600 text-white p-1 rounded-md", children: _jsx(CheckCircle2, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => setIsEditingIncome(false), className: "bg-red-500 hover:bg-red-600 text-white p-1 rounded-md", children: _jsx(X, { className: "w-4 h-4" }) })] })) : (_jsxs("div", { className: "flex items-center justify-between mt-0.5", children: [_jsxs("p", { className: "font-bold text-lg text-emerald-600 dark:text-emerald-400", children: ["\u20B9", user.monthly_income || '0'] }), _jsx("button", { onClick: handleEditIncome, className: "p-1.5 text-gray-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition-all", title: "Edit Income", children: _jsx(Edit2, { className: "w-4 h-4" }) })] }))] })] })] }), _jsx("button", { onClick: () => setShowProfileModal(false), className: "w-full py-3 bg-brand-blue hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95", children: "Close Profile" })] })] }) }))] }));
};
export default Navbar;
