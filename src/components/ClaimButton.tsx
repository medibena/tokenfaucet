import React from 'react';
import { Droplets, Clock, Loader2, Wallet } from 'lucide-react';

interface ClaimButtonProps {
  isConnected: boolean;
  canClaim: boolean;
  isLoading: boolean;
  onClaim: () => void;
  nextClaimTime: number;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({
  isConnected,
  canClaim,
  isLoading,
  onClaim,
  nextClaimTime
}) => {
  const getButtonContent = () => {
    if (!isConnected) {
      return (
        <>
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet to Claim</span>
        </>
      );
    }

    if (isLoading) {
      return (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing Transaction...</span>
        </>
      );
    }

    if (!canClaim) {
      return (
        <>
          <Clock className="w-5 h-5" />
          <span>Next claim in {nextClaimTime}h</span>
        </>
      );
    }

    return (
      <>
        <Droplets className="w-5 h-5" />
        <span>Claim 100 TTK Tokens</span>
      </>
    );
  };

  const getButtonStyles = () => {
    if (!isConnected || !canClaim) {
      return "bg-slate-700/50 text-slate-400 cursor-not-allowed";
    }

    return "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl";
  };

  return (
    <button
      onClick={onClaim}
      disabled={!isConnected || !canClaim || isLoading}
      className={`
        flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg
        transition-all duration-200 w-full max-w-md mx-auto
        ${getButtonStyles()}
      `}
    >
      {getButtonContent()}
    </button>
  );
};

export default ClaimButton;
