import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  BriefcaseBusiness,
  Download,
  Layers3,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  TrendingUp,
} from 'lucide-react';
import {
  getDuplicateRequirementIds,
  SERVICE_REQUIREMENT_DOMAINS,
  SERVICE_REQUIREMENTS,
  ServiceRequirementDomainId,
  ServiceRequirementStatus,
} from '../serviceRequirementCatalog';
import { SERVICE_MOCK_PREVIEWS } from '../serviceMockData';

interface ServiceRequirementMapProps {
  onBack: () => void;
}

const statusLabels: Record<ServiceRequirementStatus, string> = {
  FRONTEND_READY: '화면 반영',
  PLANNED: '기획 반영',
  NEEDS_BACKEND: '백엔드 필요',
  NEEDS_DATA: '데이터 연동 필요',
};

const statusTone: Record<ServiceRequirementStatus, string> = {
  FRONTEND_READY: 'bg-[#6dec13]/15 text-[#2a4519] border-[#6dec13]/30',
  PLANNED: 'bg-blue-50 text-blue-700 border-blue-100',
  NEEDS_BACKEND: 'bg-amber-50 text-amber-700 border-amber-100',
  NEEDS_DATA: 'bg-purple-50 text-purple-700 border-purple-100',
};

const domainIcons: Record<ServiceRequirementDomainId, React.ElementType> = {
  WORKSPACE: ShieldCheck,
  PRODUCT: Package,
  BRAND: BriefcaseBusiness,
  KEYWORD: Search,
  RANK: TrendingUp,
  REPORT: Download,
  ALERT: Bell,
};

const statusFilters = ['전체', '화면 반영', '기획 반영', '백엔드 필요', '데이터 연동 필요'] as const;
type StatusFilter = (typeof statusFilters)[number];

function statusMatches(status: ServiceRequirementStatus, filter: StatusFilter) {
  if (filter === '전체') return true;
  return statusLabels[status] === filter;
}

const ServiceRequirementMap: React.FC<ServiceRequirementMapProps> = ({ onBack }) => {
  const [activeDomain, setActiveDomain] = useState<ServiceRequirementDomainId | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('전체');
  const [query, setQuery] = useState('');
  const duplicateIds = useMemo(() => getDuplicateRequirementIds(), []);
  const visiblePreviewDomains = activeDomain === 'ALL'
    ? SERVICE_REQUIREMENT_DOMAINS.map((domain) => domain.id)
    : [activeDomain];

  const filteredRequirements = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return SERVICE_REQUIREMENTS.filter((item) => {
      const domainMatched = activeDomain === 'ALL' || item.domainId === activeDomain;
      const statusMatched = statusMatches(item.status, statusFilter);
      const searchMatched =
        !keyword ||
        item.requirementId.toLowerCase().includes(keyword) ||
        item.requirementName.toLowerCase().includes(keyword) ||
        item.note.toLowerCase().includes(keyword) ||
        item.domainName.toLowerCase().includes(keyword);

      return domainMatched && statusMatched && searchMatched;
    });
  }, [activeDomain, query, statusFilter]);

  const statusCounts = SERVICE_REQUIREMENTS.reduce<Record<ServiceRequirementStatus, number>>(
    (acc, item) => {
      acc[item.status] += 1;
      return acc;
    },
    { FRONTEND_READY: 0, PLANNED: 0, NEEDS_BACKEND: 0, NEEDS_DATA: 0 }
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <button
            onClick={onBack}
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-[#ecf3e7] bg-white px-3 py-2 text-xs font-black text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            요약으로 돌아가기
          </button>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#6dec13]/15 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#2a4519]">
            <Layers3 className="w-3.5 h-3.5" />
            Service Requirement Map
          </div>
          <h2 className="mt-4 text-4xl font-black text-gray-900 tracking-tight">서비스 기능 전체 맵</h2>
          <p className="mt-3 max-w-4xl text-sm font-bold leading-relaxed text-gray-500">
            워크스페이스, 상품, 브랜드, 키워드, 랭킹, 리포트, 알림 요구사항을 한 화면에서 관리합니다.
            현재는 프론트엔드 기능 카탈로그이며 백엔드/데이터 연동이 필요한 항목은 명확히 구분합니다.
          </p>
        </div>

        <div className="rounded-2xl border border-[#ecf3e7] bg-white p-4 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">Total Requirements</p>
          <p className="mt-1 text-3xl font-black text-gray-900">{SERVICE_REQUIREMENTS.length}</p>
          <p className="mt-1 text-xs font-bold text-gray-400">도메인 {SERVICE_REQUIREMENT_DOMAINS.length}개</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: '화면 반영', value: statusCounts.FRONTEND_READY, icon: Sparkles, tone: 'bg-[#6dec13]/15 text-[#2a4519]' },
          { label: '기획 반영', value: statusCounts.PLANNED, icon: Tags, tone: 'bg-blue-50 text-blue-700' },
          { label: '백엔드 필요', value: statusCounts.NEEDS_BACKEND, icon: ShieldCheck, tone: 'bg-amber-50 text-amber-700' },
          { label: '데이터 연동 필요', value: statusCounts.NEEDS_DATA, icon: AlertTriangle, tone: 'bg-purple-50 text-purple-700' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border border-[#ecf3e7] bg-white p-5 shadow-sm">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">{card.label}</p>
              <p className="mt-2 text-3xl font-black text-gray-900">{card.value}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[2.5rem] border border-[#ecf3e7] bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDomain('ALL')}
              className={`rounded-xl px-4 py-2.5 text-xs font-black transition-colors ${
                activeDomain === 'ALL' ? 'bg-gray-900 text-[#6dec13]' : 'bg-[#f7f8f6] text-gray-500 hover:text-gray-900'
              }`}
            >
              전체
            </button>
            {SERVICE_REQUIREMENT_DOMAINS.map((domain) => {
              const Icon = domainIcons[domain.id];
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-colors ${
                    activeDomain === domain.id ? 'bg-gray-900 text-[#6dec13]' : 'bg-[#f7f8f6] text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {domain.name}
                </button>
              );
            })}
          </div>

          <label className="relative block min-w-full xl:min-w-[360px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c9a4c]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 w-full rounded-xl border-none bg-[#f7f8f6] pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#6dec13]/50"
              placeholder="요구사항 ID, 기능명, 비고 검색"
            />
          </label>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`rounded-xl px-3 py-2 text-xs font-black transition-colors ${
                statusFilter === filter ? 'bg-[#6dec13] text-gray-900' : 'bg-[#f7f8f6] text-gray-500 hover:text-gray-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <section className="mb-8 rounded-[2rem] border border-[#ecf3e7] bg-[#f7f8f6] p-5">
          <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">Mock Data Preview</p>
              <h3 className="mt-1 text-2xl font-black text-gray-900">도메인별 샘플 데이터</h3>
              <p className="mt-2 max-w-3xl text-sm font-bold leading-relaxed text-gray-500">
                실제 백엔드 연동 전 화면을 검토할 수 있도록 만든 프론트엔드 mock 데이터입니다.
              </p>
            </div>
            <span className="w-fit rounded-xl bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c] border border-[#ecf3e7]">
              Fixture Only
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {visiblePreviewDomains.map((domainId) => {
              const preview = SERVICE_MOCK_PREVIEWS[domainId];
              const Icon = domainIcons[domainId];

              return (
                <article key={domainId} className="rounded-[1.5rem] border border-[#ecf3e7] bg-white p-5">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6dec13]/15 text-[#2a4519]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-gray-900">{preview.title}</h4>
                        <p className="mt-2 max-w-3xl text-sm font-bold leading-relaxed text-gray-500">{preview.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {preview.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl bg-[#f7f8f6] p-4 border border-[#ecf3e7]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">{metric.label}</p>
                        <p className="mt-1 text-2xl font-black text-gray-900">{metric.value}</p>
                        <p className="mt-1 text-xs font-bold text-gray-400">{metric.helper}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-3">
                    {preview.rows.map((row) => (
                      <div key={`${domainId}-${row.title}`} className="rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-4">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-black text-gray-900">{row.title}</p>
                            <p className="mt-1 text-xs font-bold text-gray-500">{row.subtitle}</p>
                          </div>
                          <span className="shrink-0 rounded-lg bg-white px-2 py-1 text-[10px] font-black text-[#6c9a4c] border border-[#ecf3e7]">
                            {row.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {row.meta.map((item) => (
                            <span key={item} className="rounded-lg bg-white px-2 py-1 text-[10px] font-black text-gray-500 border border-[#ecf3e7]">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <details className="group mt-4 rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7]">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-black text-[#6c9a4c]">
                      mock 데이터 해석 메모
                      <span className="text-gray-300 group-open:rotate-180">⌄</span>
                    </summary>
                    <div className="space-y-1 px-4 pb-4 text-xs font-bold leading-relaxed text-gray-500">
                      {preview.notes.map((note) => (
                        <p key={note}>- {note}</p>
                      ))}
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <aside className="xl:col-span-4 space-y-3">
            {SERVICE_REQUIREMENT_DOMAINS.map((domain) => {
              const Icon = domainIcons[domain.id];
              const count = SERVICE_REQUIREMENTS.filter((item) => item.domainId === domain.id).length;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                    activeDomain === domain.id
                      ? 'border-[#6dec13] bg-[#6dec13]/10'
                      : 'border-[#ecf3e7] bg-[#f7f8f6] hover:bg-[#6dec13]/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#2a4519] border border-[#ecf3e7]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-gray-900">{domain.name}</h3>
                        <span className="rounded-lg bg-white px-2 py-1 text-[10px] font-black text-[#6c9a4c] border border-[#ecf3e7]">{count}</span>
                      </div>
                      <p className="mt-2 text-xs font-bold leading-relaxed text-gray-500">{domain.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </aside>

          <div className="xl:col-span-8">
            <div className="overflow-x-auto rounded-2xl border border-[#ecf3e7]">
              <table className="w-full text-left">
                <caption className="sr-only">서비스 기능 요구사항 목록</caption>
                <thead className="bg-[#f7f8f6]">
                  <tr>
                    {['도메인', '요구사항 ID', '요구사항 명', '상태', '비고'].map((header) => (
                      <th key={header} scope="col" className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ecf3e7] bg-white">
                  {filteredRequirements.map((item, index) => {
                    const isDuplicate = duplicateIds.has(item.requirementId);
                    return (
                      <tr key={`${item.domainId}-${item.requirementId}-${index}`} className="align-top">
                        <td className="px-5 py-5">
                          <span className="rounded-xl bg-[#f7f8f6] px-3 py-1.5 text-xs font-black text-gray-700 border border-[#ecf3e7]">
                            {item.domainName}
                          </span>
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-black text-gray-900">{item.requirementId}</span>
                            {isDuplicate && (
                              <span className="w-fit rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-700 border border-amber-100">
                                중복 ID
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-5 min-w-[220px]">
                          <p className="text-sm font-black text-gray-900">{item.requirementName}</p>
                        </td>
                        <td className="px-5 py-5">
                          <span className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${statusTone[item.status]}`}>
                            {statusLabels[item.status]}
                          </span>
                        </td>
                        <td className="px-5 py-5 min-w-[320px]">
                          <p className="text-xs font-bold leading-relaxed text-gray-500">{item.note}</p>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredRequirements.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-16 text-center text-sm font-black text-gray-400">
                        조건에 맞는 요구사항이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-5">
        <p className="text-xs font-bold leading-relaxed text-gray-500">
          이 화면은 프론트엔드 요구사항 맵입니다. 계정/권한/다운로드/알림 발송/데이터 수집/예상 판매량 계산은 실제 백엔드, 권한 체계, 데이터 파이프라인이 준비된 뒤 연결해야 합니다.
        </p>
      </section>
    </div>
  );
};

export default ServiceRequirementMap;
