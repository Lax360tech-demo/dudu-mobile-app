import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export const AdminReportsScreen = () => {
  const { orders, categories, products } = useApp();

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Order ID,Customer,Status,Items Count,Total Amount,Payment Method,Created At\n" +
      orders.map(o => `${o.id},"${o.customer?.name}",${o.status},${o.items?.length || 0},${o.billSummary?.grandTotal},"${o.paymentMethod}",${o.createdAt}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LAX360_Orders_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orders, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `LAX360_Orders_Data_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Analytics & Operational Reports</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Dark store throughput, delivery SLA compliance, and exportable data tables
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* SLA Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-slate-400 text-xs font-semibold flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-brand-400" />
            <span>Average Dispatch Time</span>
          </div>
          <div className="text-2xl font-black text-white mt-2">2.1 Mins</div>
          <p className="text-[10px] text-emerald-400 mt-1">✓ Well within &lt; 3m SLA target</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-slate-400 text-xs font-semibold flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Average Total Delivery Time</span>
          </div>
          <div className="text-2xl font-black text-white mt-2">10.4 Mins</div>
          <p className="text-[10px] text-emerald-400 mt-1">✓ 10-Minute Guarantee verified</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-slate-400 text-xs font-semibold flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>On-Time Fulfillment Rate</span>
          </div>
          <div className="text-2xl font-black text-white mt-2">98.6%</div>
          <p className="text-[10px] text-slate-400 mt-1">Based on last 1,420 simulated deliveries</p>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
          <Layers className="w-4 h-4 text-brand-400" />
          <span>Category Share & Product Distribution</span>
        </h3>

        <div className="space-y-3">
          {categories.map((cat) => {
            const catProds = products.filter(p => p.categoryId === cat.id);
            const percentage = Math.round((catProds.length / products.length) * 100) || 10;

            return (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{cat.name}</span>
                  <span className="text-slate-400 font-mono">{catProds.length} SKUs ({percentage}%)</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-brand-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
