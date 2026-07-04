import React from 'react';
import { AlertTriangle, Database, Upload } from 'lucide-react';

const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-2xl bg-gray-100 ${className}`} aria-hidden="true" />
);

export const OliveYoungLoadingSkeleton: React.FC = () => (
  <div className="space-y-6" role="status" aria-label="올리브영 데이터 로딩 중">
    <SkeletonBlock className="h-24" />
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonBlock key={index} className="h-32" />
      ))}
    </div>
    <SkeletonBlock className="h-44" />
    <SkeletonBlock className="h-72" />
  </div>
);

export const EmptyOliveYoungState: React.FC = () => (
  <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-8 text-center">
    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6dec13]/15 text-[#2a4519]">
      <Database className="h-7 w-7" />
    </div>
    <h3 className="text-xl font-black text-gray-900">올리브영 데이터가 아직 연결되지 않았습니다.</h3>
    <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-gray-500">
      수동 업로드 또는 데이터 연동 후 랭킹, 가격, 리뷰, 프로모션 변화를 기반으로 광고 이후 커머스 반응 신호를 확인할 수 있습니다.
    </p>
    <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#f7f8f6] px-4 py-3 text-xs font-black text-gray-400">
      <Upload className="h-4 w-4" />
      CSV 업로드 준비 중
    </div>
  </section>
);

export const OliveYoungErrorState: React.FC<{ message?: string }> = ({ message }) => (
  <section className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6">
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-lg font-black text-gray-900">올리브영 데이터를 불러오지 못했습니다.</h3>
        <p className="mt-2 text-sm font-bold leading-relaxed text-gray-600">
          {message ?? '네트워크 또는 데이터 형식 문제를 확인해 주세요. 외부 올리브영 페이지로 직접 요청하지 않습니다.'}
        </p>
      </div>
    </div>
  </section>
);
