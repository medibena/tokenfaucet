import React from 'react';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

interface WalletConnectionProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
  onDisconnect: () => void;
  isLoading: boolean;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
  isLoading
}) => {
  if (isConnected) {
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-medium">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
          </div>
        </div>
        
        <button
          onClick={onDisconnect}
          className="p-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={isLoading}
      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Wallet className="w-5 h-5" />
      )}
      <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
    </button>
  );
};

export default WalletConnection;
