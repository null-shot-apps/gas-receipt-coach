'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Transaction interface for future API integration
// interface Transaction {
//   hash: string;
//   from: string;
//   to: string;
//   value: string;
//   gasUsed: string;
//   gasPrice: string;
//   blockNumber: string;
//   timeStamp: string;
//   methodId: string;
//   functionName: string;
// }

interface GasData {
  chainName: string;
  totalGasSpent: number;
  transactionCount: number;
  averageGasPrice: number;
  dappBreakdown: { name: string; gasSpent: number; count: number }[];
  activityBreakdown: { type: string; gasSpent: number; count: number }[];
}

interface CoachingTip {
  category: string;
  tip: string;
  potentialSavings: string;
  priority: 'high' | 'medium' | 'low';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const MOCK_DATA: GasData = {
  chainName: 'Ethereum',
  totalGasSpent: 0.245,
  transactionCount: 47,
  averageGasPrice: 25.3,
  dappBreakdown: [
    { name: 'Uniswap', gasSpent: 0.089, count: 12 },
    { name: 'OpenSea', gasSpent: 0.067, count: 8 },
    { name: 'Compound', gasSpent: 0.045, count: 15 },
    { name: 'ENS', gasSpent: 0.023, count: 7 },
    { name: 'Others', gasSpent: 0.021, count: 5 }
  ],
  activityBreakdown: [
    { type: 'DEX Trading', gasSpent: 0.112, count: 18 },
    { type: 'NFT Trading', gasSpent: 0.078, count: 9 },
    { type: 'DeFi Lending', gasSpent: 0.055, count: 20 }
  ]
};

const COACHING_TIPS: CoachingTip[] = [
  {
    category: 'Timing',
    tip: 'Trade during off-peak hours (weekends, early morning UTC) when gas prices are typically 30-50% lower.',
    potentialSavings: '30-50%',
    priority: 'high'
  },
  {
    category: 'Batch Transactions',
    tip: 'Group multiple operations into single transactions when possible. Consider using multicall contracts.',
    potentialSavings: '40-60%',
    priority: 'high'
  },
  {
    category: 'Layer 2',
    tip: 'Move frequent trading to Layer 2 solutions like Arbitrum or Polygon for 90%+ gas savings.',
    potentialSavings: '90%+',
    priority: 'high'
  },
  {
    category: 'Gas Price Strategy',
    tip: 'Use dynamic gas pricing and set lower gas prices for non-urgent transactions.',
    potentialSavings: '20-30%',
    priority: 'medium'
  }
];

export default function GasAnalyzer() {
  const [address, setAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [gasData, setGasData] = useState<GasData | null>(null);
  const [error, setError] = useState('');

  const analyzeAddress = async () => {
    if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError('Please enter a valid Ethereum address');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, using mock data
      // In production, this would call actual explorer APIs
      setGasData(MOCK_DATA);
    } catch {
      setError('Failed to analyze address. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          EVM Gas Optimization Coach
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Analyze your wallet&apos;s gas spending patterns and get personalized tips to reduce transaction costs
        </p>
      </div>

      {/* Address Input */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter EVM address (0x...)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={analyzeAddress}
            disabled={isAnalyzing}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Gas Usage'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}
      </div>

      {/* Results */}
      {gasData && (
        <div className="space-y-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Gas Spent</h3>
              <p className="text-3xl font-bold text-gray-900">{gasData.totalGasSpent} ETH</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Transactions</h3>
              <p className="text-3xl font-bold text-gray-900">{gasData.transactionCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Gas Price</h3>
              <p className="text-3xl font-bold text-gray-900">{gasData.averageGasPrice} Gwei</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Potential Savings</h3>
              <p className="text-3xl font-bold text-green-600">~40%</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DApp Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Gas Spending by DApp</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gasData.dappBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="gasSpent"
                  >
                    {gasData.dappBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} ETH`, 'Gas Spent']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Gas Spending by Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gasData.activityBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ETH`, 'Gas Spent']} />
                  <Legend />
                  <Bar dataKey="gasSpent" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Coaching Tips */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-2xl font-semibold mb-6">Personalized Gas Optimization Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COACHING_TIPS.map((tip, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${getPriorityColor(tip.priority)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{tip.category}</h4>
                    <span className="text-sm font-medium px-2 py-1 rounded">
                      Save {tip.potentialSavings}
                    </span>
                  </div>
                  <p className="text-sm">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Coaching Note */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Your Gas Optimization Summary</h3>
            <p className="text-blue-800 mb-4">
              Based on your transaction history, you&apos;re spending most of your gas on DEX trading and NFT purchases. 
              Here&apos;s your personalized action plan:
            </p>
            <div className="space-y-2 text-blue-800">
              <p><strong>1. Immediate (Save 30-50%):</strong> Time your trades for weekends or early morning UTC when gas is cheaper.</p>
              <p><strong>2. Short-term (Save 40-60%):</strong> Batch your transactions and use multicall contracts when possible.</p>
              <p><strong>3. Long-term (Save 90%+):</strong> Consider moving frequent trading to Layer 2 solutions like Arbitrum or Polygon.</p>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300">
              <p className="text-sm text-blue-900">
                <strong>💡 Pro Tip:</strong> With your current usage pattern, implementing just the timing strategy could save you ~0.07 ETH per month!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





