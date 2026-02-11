import React, { useState, useEffect } from 'react';
import { PiggyBank, Plus, Trash2, IndianRupee, PieChart as PieChartIcon, TrendingUp, ShieldCheck, Banknote } from 'lucide-react';
import FeatureModal from './FeatureModal';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface BudgetPlannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Expense {
    id: number;
    name: string;
    amount: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];

const BudgetPlannerModal: React.FC<BudgetPlannerModalProps> = ({ isOpen, onClose }) => {
    const [salary, setSalary] = useState<number>(0);
    const [expenses, setExpenses] = useState<Expense[]>([
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

    const handleExpenseChange = (id: number, value: string) => {
        setExpenses(expenses.map(exp => exp.id === id ? { ...exp, amount: value } : exp));
    };

    const addExpense = () => {
        if (newExpenseName.trim()) {
            setExpenses([...expenses, { id: Date.now(), name: newExpenseName, amount: '' }]);
            setNewExpenseName('');
        }
    };

    const removeExpense = (id: number) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const totalExpenses = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
    const remainingAmount = salary - totalExpenses;

    const chartData = [
        ...expenses.map(exp => ({ name: exp.name, value: parseFloat(exp.amount) || 0 })),
        { name: 'Savings', value: Math.max(0, remainingAmount) }
    ].filter(item => item.value > 0);

    const getRecommendations = (savings: number) => {
        if (savings <= 0) return [];

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
        } else if (savings > 4000 && savings <= 10000) {
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
        } else if (savings > 10000) {
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

    return (
        <FeatureModal
            isOpen={isOpen}
            onClose={onClose}
            title="Smart Budget Planner"
            icon={PiggyBank}
            color="bg-emerald-500"
        >
            <div className="space-y-6">
                {/* Salary Display */}
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-emerald-600 font-medium uppercase">Monthly Income</p>
                        <p className="text-2xl font-bold text-emerald-800">₹{salary.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <IndianRupee className="w-6 h-6 text-emerald-500" />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left: Expense Inputs */}
                    <div className="space-y-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm h-full">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-800 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-2 text-sm">1</span>
                                Monthly Expenses
                            </h3>
                            <span className="text-xs font-medium text-gray-400">{expenses.length} Categories</span>
                        </div>

                        <div className="max-h-[250px] lg:max-h-[320px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {expenses.map((exp) => (
                                <div key={exp.id} className="group flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                    <div className="flex-grow">
                                        <p className="text-xs font-semibold text-gray-600 mb-1 ml-1">{exp.name}</p>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                                            <input
                                                type="number"
                                                value={exp.amount}
                                                onChange={(e) => handleExpenseChange(exp.id, e.target.value)}
                                                className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeExpense(exp.id)}
                                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                        title="Remove expense"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add Expense */}
                        <div className="flex items-center space-x-2 pt-4 border-t border-gray-100 mt-2">
                            <input
                                type="text"
                                value={newExpenseName}
                                onChange={(e) => setNewExpenseName(e.target.value)}
                                placeholder="Add new category..."
                                className="flex-grow px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && addExpense()}
                            />
                            <button
                                onClick={addExpense}
                                disabled={!newExpenseName.trim()}
                                className="bg-emerald-600 text-white p-2.5 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all active:scale-95"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Visualization & Summary */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden h-full">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center self-start w-full">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-sm">2</span>
                            Spending Breakdown
                        </h3>

                        <div className="w-full h-[220px] relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.name === 'Savings' ? '#10b981' : COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                                        iconSize={8}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center Text */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Saved</p>
                                <p className={`text-xl font-bold ${remainingAmount >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {Math.round((Math.max(0, remainingAmount) / (salary || 1)) * 100)}%
                                </p>
                            </div>
                        </div>

                        <div className="w-full mt-6 space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative z-10">
                            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Total Expenses</span>
                                <span className="font-bold text-gray-800">₹{totalExpenses.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-gray-600 font-bold">Net Savings</span>
                                <span className={`font-black text-xl ${remainingAmount >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    ₹{remainingAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    </div>
                </div>

                {/* Recommendations Section */}
                {remainingAmount > 0 && recommendations.length > 0 && (
                    <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                            Smart Investment Suggestions
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {recommendations.map((rec, index) => (
                                <div key={index} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-white relative overflow-hidden group">
                                    <div className={`absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity ${rec.color}`}>
                                        <rec.icon className="w-16 h-16" />
                                    </div>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className={`p-2 rounded-lg ${rec.color} bg-opacity-20`}>
                                            <rec.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-full text-gray-600 border border-gray-200">
                                            {rec.rate} Returns
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-gray-900">{rec.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 mb-3">{rec.desc}</p>
                                    <div className="flex items-center text-xs font-medium text-gray-400">
                                        <ShieldCheck className="w-3 h-3 mr-1" />
                                        Success Rate: <span className="text-gray-600 ml-1">{rec.risk === 'Low' ? 'High' : 'Medium'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </FeatureModal>
    );
};

export default BudgetPlannerModal;
