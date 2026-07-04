import React from 'react';
import type {
  AccuracyGrade,
  CommerceEffectConfidence,
  CommerceEffectSignal,
  DataAvailability,
  DataReliabilityLevel,
  SourceType,
} from '../types';
import {
  ACCURACY_GRADE_TOOLTIPS,
  getAccuracyGradeLabel,
  getAvailabilityLabel,
  getConfidenceLabel,
  getEffectSignalLabel,
  getReliabilityLabel,
  getSourceTypeLabel,
} from '../utils';

const availabilityTone: Record<DataAvailability, string> = {
  PUBLIC_SNAPSHOT: 'bg-[#6dec13]/15 text-[#2a4519] border-[#6dec13]/30',
  PARTNER_ONLY: 'bg-amber-50 text-amber-700 border-amber-100',
  MANUAL_UPLOAD: 'bg-blue-50 text-blue-700 border-blue-100',
  DERIVED: 'bg-purple-50 text-purple-700 border-purple-100',
  UNSUPPORTED: 'bg-gray-100 text-gray-500 border-gray-200',
  NOT_CONNECTED: 'bg-slate-100 text-slate-600 border-slate-200',
};

const gradeTone: Record<AccuracyGrade, string> = {
  A: 'bg-[#6dec13]/15 text-[#2a4519] border-[#6dec13]/30',
  B: 'bg-blue-50 text-blue-700 border-blue-100',
  C: 'bg-purple-50 text-purple-700 border-purple-100',
  D: 'bg-orange-50 text-orange-700 border-orange-100',
  X: 'bg-gray-100 text-gray-500 border-gray-200',
};

const sourceTone: Record<SourceType, string> = {
  public_page: 'bg-[#f7f8f6] text-[#6c9a4c] border-[#ecf3e7]',
  partner_data: 'bg-amber-50 text-amber-700 border-amber-100',
  manual_upload: 'bg-blue-50 text-blue-700 border-blue-100',
  computed: 'bg-purple-50 text-purple-700 border-purple-100',
  fixture: 'bg-gray-900 text-[#6dec13] border-gray-900',
  unsupported: 'bg-gray-100 text-gray-500 border-gray-200',
};

const signalTone: Record<CommerceEffectSignal, string> = {
  STRONG: 'bg-[#6dec13]/15 text-[#2a4519] border-[#6dec13]/30',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-100',
  WEAK: 'bg-amber-50 text-amber-700 border-amber-100',
  NONE: 'bg-gray-100 text-gray-600 border-gray-200',
  UNKNOWN: 'bg-slate-100 text-slate-600 border-slate-200',
};

const confidenceTone: Record<CommerceEffectConfidence, string> = {
  HIGH: 'bg-[#6dec13]/15 text-[#2a4519] border-[#6dec13]/30',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-100',
  LOW: 'bg-amber-50 text-amber-700 border-amber-100',
  UNKNOWN: 'bg-slate-100 text-slate-600 border-slate-200',
};

const reliabilityTone: Record<DataReliabilityLevel, string> = {
  HIGH: 'bg-[#6dec13]/15 text-[#2a4519] border-[#6dec13]/30',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-100',
  LOW: 'bg-amber-50 text-amber-700 border-amber-100',
  UNKNOWN: 'bg-slate-100 text-slate-600 border-slate-200',
};

interface BadgeProps {
  children: React.ReactNode;
  className: string;
  title?: string;
  ariaLabel?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className, title, ariaLabel }) => (
  <span
    className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[10px] font-black ${className}`}
    title={title}
    aria-label={ariaLabel}
  >
    {children}
  </span>
);

export const MetricAvailabilityBadge: React.FC<{ availability: DataAvailability }> = ({ availability }) => (
  <Badge
    className={availabilityTone[availability]}
    ariaLabel={`수집 상태: ${getAvailabilityLabel(availability)}`}
    title={getAvailabilityLabel(availability)}
  >
    {getAvailabilityLabel(availability)}
  </Badge>
);

export const AccuracyGradeBadge: React.FC<{ grade: AccuracyGrade }> = ({ grade }) => (
  <Badge
    className={gradeTone[grade]}
    ariaLabel={`정확도: ${getAccuracyGradeLabel(grade)}`}
    title={ACCURACY_GRADE_TOOLTIPS[grade]}
  >
    {getAccuracyGradeLabel(grade)}
  </Badge>
);

export const SourceTypeBadge: React.FC<{ sourceType: SourceType }> = ({ sourceType }) => (
  <Badge
    className={sourceTone[sourceType]}
    ariaLabel={`데이터 유형: ${getSourceTypeLabel(sourceType)}`}
    title={getSourceTypeLabel(sourceType)}
  >
    {getSourceTypeLabel(sourceType)}
  </Badge>
);

export const EffectSignalBadge: React.FC<{ signal: CommerceEffectSignal }> = ({ signal }) => (
  <Badge className={signalTone[signal]} ariaLabel={`광고 효용 신호: ${getEffectSignalLabel(signal)}`}>
    효용 신호 {getEffectSignalLabel(signal)}
  </Badge>
);

export const ConfidenceBadge: React.FC<{ confidence: CommerceEffectConfidence }> = ({ confidence }) => (
  <Badge className={confidenceTone[confidence]} ariaLabel={`신뢰도: ${getConfidenceLabel(confidence)}`}>
    신뢰도 {getConfidenceLabel(confidence)}
  </Badge>
);

export const ReliabilityBadge: React.FC<{ level: DataReliabilityLevel }> = ({ level }) => (
  <Badge className={reliabilityTone[level]} ariaLabel={`데이터 신뢰도: ${getReliabilityLabel(level)}`}>
    데이터 신뢰도 {getReliabilityLabel(level)}
  </Badge>
);
