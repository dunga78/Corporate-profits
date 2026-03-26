/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Receipt, ShieldCheck, Wallet, ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [purchaseAmount, setPurchaseAmount] = useState<string>('');
  const [salesAmount, setSalesAmount] = useState<string>('');

  const results = useMemo(() => {
    const purchase = parseFloat(purchaseAmount) || 0;
    const sales = parseFloat(salesAmount) || 0;
    const vatRate = 0.13;

    // 不含税金额
    const exclSales = sales / (1 + vatRate);
    const exclPurchase = purchase / (1 + vatRate);

    // 增值税
    const salesVat = exclSales * vatRate;
    const purchaseVat = exclPurchase * vatRate;
    const vatDiff = Math.max(0, salesVat - purchaseVat);

    // 毛利润 (不含税销售 - 不含税采购)
    const grossProfit = exclSales - exclPurchase;

    // 企业税 (毛利润的 5%)
    const corporateTax = Math.max(0, grossProfit * 0.05);

    // 地方税 (增值税税差的 12%)
    const localTax = vatDiff * 0.12;

    // 纯利润
    const netProfit = grossProfit - corporateTax - localTax;

    return {
      exclSales,
      exclPurchase,
      salesVat,
      purchaseVat,
      vatDiff,
      grossProfit,
      corporateTax,
      localTax,
      netProfit,
    };
  }, [purchaseAmount, salesAmount]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="p-3 bg-black rounded-2xl">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">企业利润与税费计算器</h1>
            <p className="text-sm text-gray-500">快速计算增值税、企业所得税及最终净利</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs Section */}
          <section className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                基础数据输入
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">采购金额 (含税)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">¥</span>
                    <input
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">销售金额 (含税)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">¥</span>
                    <input
                      type="number"
                      value={salesAmount}
                      onChange={(e) => setSalesAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>增值税率</span>
                    <span className="font-mono">13%</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>企业税率 (毛利)</span>
                    <span className="font-mono">5%</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>地方税率 (增值税差)</span>
                    <span className="font-mono">12%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-black text-white p-6 rounded-3xl shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-xs font-medium uppercase tracking-widest opacity-60 mb-1">最终纯利润</p>
                <h3 className="text-3xl font-bold tracking-tighter">
                  {formatCurrency(results.netProfit)}
                </h3>
              </div>
              <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
            </div>
          </section>

          {/* Results Section */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-8">详细计算明细</h2>
              
              <div className="space-y-8">
                {/* VAT Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Receipt className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold">增值税计算 (VAT)</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50/50 rounded-2xl">
                      <p className="text-xs text-blue-600 font-medium mb-1">销项增值税</p>
                      <p className="text-lg font-mono font-bold">{formatCurrency(results.salesVat)}</p>
                    </div>
                    <div className="p-4 bg-blue-50/50 rounded-2xl">
                      <p className="text-xs text-blue-600 font-medium mb-1">进项增值税</p>
                      <p className="text-lg font-mono font-bold">{formatCurrency(results.purchaseVat)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center p-4 border border-blue-100 rounded-2xl bg-white">
                    <span className="text-sm font-medium text-gray-600">应纳增值税 (税差)</span>
                    <span className="text-lg font-mono font-bold text-blue-600">{formatCurrency(results.vatDiff)}</span>
                  </div>
                </div>

                {/* Profit Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold">利润分析</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500">不含税销售额</span>
                      <span className="font-mono">{formatCurrency(results.exclSales)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500">不含税采购成本</span>
                      <span className="font-mono">{formatCurrency(results.exclPurchase)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm font-bold">毛利润</span>
                      <span className="text-xl font-mono font-bold text-emerald-600">{formatCurrency(results.grossProfit)}</span>
                    </div>
                  </div>
                </div>

                {/* Taxes Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold">应缴税费</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 border border-orange-100 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-orange-600 uppercase">企业税</span>
                        <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">毛利 5%</span>
                      </div>
                      <p className="text-xl font-mono font-bold">{formatCurrency(results.corporateTax)}</p>
                    </div>
                    <div className="p-5 border border-orange-100 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-orange-600 uppercase">地方税</span>
                        <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">税差 12%</span>
                      </div>
                      <p className="text-xl font-mono font-bold">{formatCurrency(results.localTax)}</p>
                    </div>
                  </div>
                </div>

                {/* Final Net Profit */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="bg-emerald-600 p-6 rounded-3xl text-white flex justify-between items-center shadow-lg shadow-emerald-100">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-6 h-6" />
                      <div>
                        <p className="text-xs font-medium opacity-80 uppercase tracking-wider">最终纯利润</p>
                        <p className="text-sm opacity-60">扣除所有税费后的净收益</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold tracking-tighter">{formatCurrency(results.netProfit)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-xs">
          <p>© 2026 企业财务计算工具 · 仅供参考</p>
        </footer>
      </div>
    </div>
  );
}
