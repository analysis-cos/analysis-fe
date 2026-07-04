import React from 'react';
import { Package } from 'lucide-react';
import { Product } from '../types';

interface AnalysisProductSelectorProps {
  products: Product[];
  selectedProductRank: number;
  onSelectedProductRankChange: (rank: number) => void;
}

const AnalysisProductSelector: React.FC<AnalysisProductSelectorProps> = ({
  products,
  selectedProductRank,
  onSelectedProductRankChange,
}) => {
  const selectedProduct = products.find((product) => product.rank === selectedProductRank) ?? products[0];

  if (!selectedProduct) return null;

  return (
    <section className="mb-8 rounded-[2rem] border border-[#ecf3e7] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="h-14 w-14 shrink-0 rounded-2xl border border-[#ecf3e7] object-cover"
          />
          <div className="min-w-0">
            <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">
              <Package className="h-3.5 w-3.5" />
              분석 기준 상품
            </div>
            <p className="truncate text-base font-black text-gray-900">{selectedProduct.name}</p>
            <p className="mt-1 text-xs font-bold text-gray-400">
              {selectedProduct.brand} · {selectedProduct.category} · 현재 랭킹 {selectedProduct.rank}위
            </p>
          </div>
        </div>

        <label className="block w-full xl:w-[420px]">
          <span className="sr-only">분석 기준 상품 선택</span>
          <select
            value={selectedProductRank}
            onChange={(event) => onSelectedProductRankChange(Number(event.target.value))}
            className="h-12 w-full rounded-2xl border-none bg-[#f7f8f6] px-4 text-sm font-black text-gray-700 outline-none focus:ring-2 focus:ring-[#6dec13]/50"
          >
            {products.map((product) => (
              <option key={product.rank} value={product.rank}>
                #{product.rank} {product.brand} · {product.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
};

export default AnalysisProductSelector;
