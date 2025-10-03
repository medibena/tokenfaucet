import React from 'react';
import { ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Transaction {
  id: number;
  hash: string;
  amount: string;
  timestamp: number;
  status: 'success' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30"
          >
            <div className="flex items-center space-x-4">
              {getStatusIcon(tx.status)}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">+{tx.amount} TTK</span>
                  <span className="text-slate-400 text-sm">claimed</span>
                </div>
                <p className="text-slate-400 text-sm">{formatTime(tx.timestamp)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-slate-400 text-sm font-mono">
                {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
              </span>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
