import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  gradient: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, gradient }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
      <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mb-4 mx-auto text-white`}>
        {icon}
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-white text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
