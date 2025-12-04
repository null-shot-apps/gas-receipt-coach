'use client';

import { useState } from 'react';
import { Search, TrendingDown, Zap, DollarSign, AlertCircle } from 'lucide-react';
import GasAnalyzer from '../components/GasAnalyzer';

export default function Home() {
  const [address, setAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = async () => {
    if (!address.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const isValidAddress = address.length === 42 && address.startsWith('0x');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <TrendingDown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Gas Optimizer
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Analyze your EVM transactions and discover personalized tips to reduce gas costs across all chains
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Multi-Chain Analysis</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Track gas usage across Ethereum, Polygon, Arbitrum, and more
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Cost Breakdown</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              See exactly where your money goes by dApp and transaction type
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Smart Tips</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized recommendations to optimize your transaction costs
            </p>
          </div>
        </div>

        {/* Address Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter EVM Address
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590e4265"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {address && !isValidAddress && (
                  <div className="absolute right-3 top-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!isValidAddress || isAnalyzing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze
                  </>
                )}
              </button>
            </div>
            {address && !isValidAddress && (
              <p className="text-red-500 text-sm mt-2">
                Please enter a valid Ethereum address (42 characters starting with 0x)
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <GasAnalyzer address={address} />
        )}
      </div>
    </div>
  );
}

