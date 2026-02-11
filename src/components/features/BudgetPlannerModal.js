import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { PiggyBank, Plus, Trash2, IndianRupee, PieChart as PieChartIcon, TrendingUp, ShieldCheck, Banknote } from 'lucide-react';
import FeatureModal from './FeatureModal';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];
const BudgetPlannerModal = ({ isOpen, onClose }) => {
    const [salary, setSalary] = useState(0);
    const [expenses, setExpenses] = useState([
        { id: 1, name: 'Rent / House', amount: '' },
        { id: 2, name: 'Food', amount: '' },
        { id: 3, name: 'Travel', amount: '' },
        { id: 4, name: 'Bills', amount: '' },
        { id: 5, name: 'Entertainment', amount: '' },
    ]);
    const [newExpenseName, setNewExpenseName] = useState('');
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setSalary(parseFloat(user.monthly_income) || 0);
        }
    }, [isOpen]);
    const handleExpenseChange = (id, value) => {
        setExpenses(expenses.map(exp => exp.id === id ? { ...exp, amount: value } : exp));
    };
    const addExpense = () => {
        if (newExpenseName.trim()) {
            setExpenses([...expenses, { id: Date.now(), name: newExpenseName, amount: '' }]);
            setNewExpenseName('');
        }
    };
    const removeExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };
    const totalExpenses = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
    const remainingAmount = salary - totalExpenses;
    const chartData = [
        ...expenses.map(exp => ({ name: exp.name, value: parseFloat(exp.amount) || 0 })),
        { name: 'Savings', value: Math.max(0, remainingAmount) }
    ].filter(item => item.value > 0);
    const getRecommendations = (savings) => {
        if (savings <= 0)
            return [];
        if (savings >= 1000 && savings <= 4000) {
            return [
                {
                    title: "Recurring Deposit (RD)",
                    rate: "6-7%",
                    risk: "Low",
                    desc: "Safe monthly savings with guaranteed returns.",
                    icon: PiggyBank,
                    color: "text-blue-600 bg-blue-50"
                },
                {
                    title: "Savings Account",
                    rate: "3-4%",
                    risk: "Low",
                    desc: "High liquidity for emergencies.",
                    icon: Banknote,
                    color: "text-green-600 bg-green-50"
                },
                {
                    title: "Digital Gold",
                    rate: "Market Linked",
                    risk: "Medium",
                    desc: "Start small with gold investment.",
                    icon: ShieldCheck,
                    color: "text-yellow-600 bg-yellow-50"
                },
                {
                    title: "Chit Funds",
                    rate: "Varies",
                    risk: "Medium",
                    desc: "Community savings for lump sum needs.",
                    icon: TrendingUp,
                    color: "text-purple-600 bg-purple-50"
                }
            ];
        }
        else if (savings > 4000 && savings <= 10000) {
            return [
                {
                    title: "Bank FD / RD",
                    rate: "6.5-8%",
                    risk: "Low",
                    desc: "Secure growth with decent interest.",
                    icon: PiggyBank,
                    color: "text-indigo-600 bg-indigo-50"
                },
                {
                    title: "Mutual Fund SIP",
                    rate: "10-12%",
                    risk: "Medium",
                    desc: "Wealth creation via equity exposure.",
                    icon: TrendingUp,
                    color: "text-purple-600 bg-purple-50"
                },
                {
                    title: "PPF (Public Provident Fund)",
                    rate: "7.1%",
                    risk: "Low",
                    desc: "Long term tax-free savings.",
                    icon: ShieldCheck,
                    color: "text-emerald-600 bg-emerald-50"
                },
                {
                    title: "Liquid Funds",
                    rate: "6-7%",
                    risk: "Low-Medium",
                    desc: "Better than savings account, easy withdrawal.",
                    icon: Banknote,
                    color: "text-cyan-600 bg-cyan-50"
                }
            ];
        }
        else if (savings > 10000) {
            return [
                {
                    title: "Diversified Equity SIP",
                    rate: "12-15%",
                    risk: "Medium-High",
                    desc: "High growth potential for long term.",
                    icon: TrendingUp,
                    color: "text-orange-600 bg-orange-50"
                },
                {
                    title: "Sovereign Gold Bonds",
                    rate: "2.5% + Appreciation",
                    risk: "Low",
                    desc: "Government backed gold investment.",
                    icon: ShieldCheck,
                    color: "text-yellow-600 bg-yellow-50"
                },
                {
                    title: "NPS (National Pension System)",
                    rate: "9-11%",
                    risk: "Medium",
                    desc: "Retirement planning with tax benefits.",
                    icon: PiggyBank,
                    color: "text-blue-600 bg-blue-50"
                },
                {
                    title: "Corporate FDs",
                    rate: "8-9%",
                    risk: "Medium",
                    desc: "Higher rates than bank FDs.",
                    icon: Banknote,
                    color: "text-teal-600 bg-teal-50"
                }
            ];
        }
        return [];
    };
    const recommendations = getRecommendations(remainingAmount);
    return (_jsx(FeatureModal, { isOpen: isOpen, onClose: onClose, title: "Smart Budget Planner", icon: PiggyBank, color: "bg-emerald-500", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-emerald-600 font-medium uppercase", children: "Monthly Income" }), _jsxs("p", { className: "text-2xl font-bold text-emerald-800", children: ["\u20B9", salary.toLocaleString('en-IN')] })] }), _jsx("div", { className: "bg-white p-2 rounded-full shadow-sm", children: _jsx(IndianRupee, { className: "w-6 h-6 text-emerald-500" }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start", children: [_jsxs("div", { className: "space-y-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm h-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("h3", { className: "font-bold text-gray-800 flex items-center", children: [_jsx("span", { className: "w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-2 text-sm", children: "1" }), "Monthly Expenses"] }), _jsxs("span", { className: "text-xs font-medium text-gray-400", children: [expenses.length, " Categories"] })] }), _jsx("div", { className: "max-h-[250px] lg:max-h-[320px] overflow-y-auto space-y-3 pr-2 custom-scrollbar", children: expenses.map((exp) => (_jsxs("div", { className: "group flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100", children: [_jsxs("div", { className: "flex-grow", children: [_jsx("p", { className: "text-xs font-semibold text-gray-600 mb-1 ml-1", children: exp.name }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium", children: "\u20B9" }), _jsx("input", { type: "number", value: exp.amount, onChange: (e) => handleExpenseChange(exp.id, e.target.value), className: "w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all", placeholder: "0" })] })] }), _jsx("button", { onClick: () => removeExpense(exp.id), className: "text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100", title: "Remove expense", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }, exp.id))) }), _jsxs("div", { className: "flex items-center space-x-2 pt-4 border-t border-gray-100 mt-2", children: [_jsx("input", { type: "text", value: newExpenseName, onChange: (e) => setNewExpenseName(e.target.value), placeholder: "Add new category...", className: "flex-grow px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all", onKeyDown: (e) => e.key === 'Enter' && addExpense() }), _jsx("button", { onClick: addExpense, disabled: !newExpenseName.trim(), className: "bg-emerald-600 text-white p-2.5 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all active:scale-95", children: _jsx(Plus, { className: "w-5 h-5" }) })] })] }), _jsxs("div", { className: "bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden h-full", children: [_jsxs("h3", { className: "font-bold text-gray-800 mb-6 flex items-center self-start w-full", children: [_jsx("span", { className: "w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-sm", children: "2" }), "Spending Breakdown"] }), _jsxs("div", { className: "w-full h-[220px] relative z-10", children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: chartData, cx: "50%", cy: "50%", innerRadius: 65, outerRadius: 85, paddingAngle: 4, dataKey: "value", stroke: "none", children: chartData.map((entry, index) => (_jsx(Cell, { fill: entry.name === 'Savings' ? '#10b981' : COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => [`₹${value.toLocaleString()}`, 'Amount'], contentStyle: { borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } }), _jsx(Legend, { layout: "horizontal", verticalAlign: "bottom", align: "center", wrapperStyle: { fontSize: '12px', paddingTop: '20px' }, iconSize: 8, iconType: "circle" })] }) }), _jsxs("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none", children: [_jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest", children: "Saved" }), _jsxs("p", { className: `text-xl font-bold ${remainingAmount >= 0 ? 'text-emerald-600' : 'text-red-500'}`, children: [Math.round((Math.max(0, remainingAmount) / (salary || 1)) * 100), "%"] })] })] }), _jsxs("div", { className: "w-full mt-6 space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative z-10", children: [_jsxs("div", { className: "flex justify-between items-center text-sm border-b border-gray-50 pb-2", children: [_jsx("span", { className: "text-gray-500", children: "Total Expenses" }), _jsxs("span", { className: "font-bold text-gray-800", children: ["\u20B9", totalExpenses.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between items-center pt-1", children: [_jsx("span", { className: "text-gray-600 font-bold", children: "Net Savings" }), _jsxs("span", { className: `font-black text-xl ${remainingAmount >= 0 ? 'text-emerald-600' : 'text-red-500'}`, children: ["\u20B9", remainingAmount.toLocaleString()] })] })] }), _jsx("div", { className: "absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" }), _jsx("div", { className: "absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" })] })] }), remainingAmount > 0 && recommendations.length > 0 && (_jsxs("div", { className: "animate-in slide-in-from-bottom-5 fade-in duration-500", children: [_jsxs("h3", { className: "font-bold text-gray-800 mb-3 flex items-center", children: [_jsx(TrendingUp, { className: "w-5 h-5 mr-2 text-emerald-600" }), "Smart Investment Suggestions"] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: recommendations.map((rec, index) => (_jsxs("div", { className: "border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-white relative overflow-hidden group", children: [_jsx("div", { className: `absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity ${rec.color}`, children: _jsx(rec.icon, { className: "w-16 h-16" }) }), _jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("div", { className: `p-2 rounded-lg ${rec.color} bg-opacity-20`, children: _jsx(rec.icon, { className: "w-6 h-6" }) }), _jsxs("span", { className: "text-xs font-bold px-2 py-1 bg-gray-100 rounded-full text-gray-600 border border-gray-200", children: [rec.rate, " Returns"] })] }), _jsx("h4", { className: "font-bold text-gray-900", children: rec.title }), _jsx("p", { className: "text-xs text-gray-500 mt-1 mb-3", children: rec.desc }), _jsxs("div", { className: "flex items-center text-xs font-medium text-gray-400", children: [_jsx(ShieldCheck, { className: "w-3 h-3 mr-1" }), "Success Rate: ", _jsx("span", { className: "text-gray-600 ml-1", children: rec.risk === 'Low' ? 'High' : 'Medium' })] })] }, index))) })] }))] }) }));
};
export default BudgetPlannerModal;
