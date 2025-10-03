import React, { useState, useEffect } from 'react';
import { Droplets, Wallet, Clock, Coins, Zap, Shield, Globe, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import WalletConnection from './WalletConnection';
import ClaimButton from './ClaimButton';
import StatsCard from './StatsCard';
import TransactionHistory from './TransactionHistory';

interface FaucetStats {
  totalClaimed: string;
  faucetBalance: string;
  nextClaimTime: number;
  userBalance: string;
}

const TokenFaucet: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [stats, setStats] = useState<FaucetStats>({
    totalClaimed: '0',
    faucetBalance: '500,000',
    nextClaimTime: 0,
    userBalance: '0'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  // Mock wallet connection
  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      setWalletAddress(mockAddress);
      setIsConnected(true);
      setStats(prev => ({
        ...prev,
        userBalance: '250.5',
        totalClaimed: '350'
      }));
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setStats(prev => ({
      ...prev,
      userBalance: '0',
      totalClaimed: '0'
    }));
    toast.success('Wallet disconnected');
  };

  const claimTokens = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newTransaction = {
        id: Date.now(),
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        amount: '100',
        timestamp: Date.now(),
        status: 'success'
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setStats(prev => ({
        ...prev,
        userBalance: (parseFloat(prev.userBalance) + 100).toString(),
        totalClaimed: (parseFloat(prev.totalClaimed) + 100).toString(),
        faucetBalance: (parseFloat(prev.faucetBalance.replace(',', '')) - 100).toLocaleString(),
        nextClaimTime: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      }));
      
      toast.success('100 TTK tokens claimed successfully!');
    } catch (error) {
      toast.error('Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  const timeUntilNextClaim = stats.nextClaimTime > Date.now() 
    ? Math.ceil((stats.nextClaimTime - Date.now()) / 1000 / 60 / 60) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">TestNet Faucet</h1>
              <p className="text-slate-400">Get free testnet tokens</p>
            </div>
          </div>
          
          <WalletConnection 
            isConnected={isConnected}
            walletAddress={walletAddress}
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
            isLoading={isLoading}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Ethereum Sepolia Testnet</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Claim Free
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Testnet Tokens</span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Get 100 TTK tokens every 24 hours to test your dApps and smart contracts on the Ethereum testnet.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatsCard
              icon={<Coins className="w-6 h-6" />}
              title="Your Balance"
              value={`${stats.userBalance} TTK`}
              gradient="from-green-400 to-emerald-500"
            />
            <StatsCard
              icon={<Droplets className="w-6 h-6" />}
              title="Faucet Balance"
              value={`${stats.faucetBalance} TTK`}
              gradient="from-blue-400 to-cyan-500"
            />
            <StatsCard
              icon={<Zap className="w-6 h-6" />}
              title="Total Claimed"
              value={`${stats.totalClaimed} TTK`}
              gradient="from-purple-400 to-pink-500"
            />
            <StatsCard
              icon={<Clock className="w-6 h-6" />}
              title="Next Claim"
              value={timeUntilNextClaim > 0 ? `${timeUntilNextClaim}h` : 'Available'}
              gradient="from-orange-400 to-red-500"
            />
          </div>

          {/* Claim Section */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Droplets className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Claim Your Tokens</h3>
            <p className="text-slate-300 mb-8">
              Connect your wallet and claim 100 TTK tokens. You can claim once every 24 hours.
            </p>
            
            <ClaimButton
              isConnected={isConnected}
              canClaim={timeUntilNextClaim === 0}
              isLoading={isLoading}
              onClaim={claimTokens}
              nextClaimTime={timeUntilNextClaim}
            />
            
            {isConnected && (
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-slate-400">
                <Shield className="w-4 h-4" />
                <span>Connected to {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Instant Claims</h4>
              <p className="text-slate-400 text-sm">Get your tokens instantly with fast transaction processing</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Secure & Safe</h4>
              <p className="text-slate-400 text-sm">Built with security best practices and audited smart contracts</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Multi-Network</h4>
              <p className="text-slate-400 text-sm">Support for multiple testnets including Sepolia and Goerli</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transaction History */}
      {isConnected && transactions.length > 0 && (
        <section className="relative z-10 px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <TransactionHistory transactions={transactions} />
          </div>
        </section>
      )}
    </div>
  );
};

export default TokenFaucet;
