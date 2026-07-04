export type ServiceRequirementDomainId =
  | 'WORKSPACE'
  | 'PRODUCT'
  | 'BRAND'
  | 'KEYWORD'
  | 'RANK'
  | 'REPORT'
  | 'ALERT';

export type ServiceRequirementStatus = 'PLANNED' | 'FRONTEND_READY' | 'NEEDS_BACKEND' | 'NEEDS_DATA';

export interface ServiceRequirement {
  domainId: ServiceRequirementDomainId;
  domainName: string;
  requirementId: string;
  requirementName: string;
  note: string;
  status: ServiceRequirementStatus;
}

export const SERVICE_REQUIREMENT_DOMAINS: Array<{
  id: ServiceRequirementDomainId;
  name: string;
  description: string;
}> = [
  { id: 'WORKSPACE', name: '워크스페이스', description: '계정, 조직, 권한, 작업 이력, 고객센터, 사용자 태그 관리' },
  { id: 'PRODUCT', name: '상품', description: '상품 기본 정보, 플랫폼 매핑, 리뷰 반응, 검색, 필터, 태그, 분석 정보' },
  { id: 'BRAND', name: '브랜드', description: '브랜드 기본 정보, 상품 연결, 키워드, 플랫폼, 리뷰 분석, 검색/필터' },
  { id: 'KEYWORD', name: '키워드', description: '관심 표현, 상품 반응, 가격/리뷰 추이, 상위 상품 영향도' },
  { id: 'RANK', name: '랭킹', description: '플랫폼/카테고리/키워드 랭킹, 추이, 스냅샷, 급증감 탐지' },
  { id: 'REPORT', name: '리포트', description: '엑셀/PDF 다운로드, 랭킹/상품/시장/브랜드 리포트 생성' },
  { id: 'ALERT', name: '알림', description: '알림 조건, 이력, 일별 현황, 급변, 경쟁 브랜드 알림' },
];

const req = (
  domainId: ServiceRequirementDomainId,
  domainName: string,
  requirementId: string,
  requirementName: string,
  note: string,
  status: ServiceRequirementStatus = 'PLANNED'
): ServiceRequirement => ({
  domainId,
  domainName,
  requirementId,
  requirementName,
  note,
  status,
});

export const SERVICE_REQUIREMENTS: ServiceRequirement[] = [
  req('WORKSPACE', '워크스페이스', 'WORKSPACE-001', '사용자 계정 관리', '서비스 사용자의 계정 정보를 관리한다.', 'NEEDS_BACKEND'),
  req('WORKSPACE', '워크스페이스', 'WORKSPACE-002', '사용자 조직 관리', '마케팅팀, 브랜드팀 등 조직 단위 사용 환경을 관리한다.', 'NEEDS_BACKEND'),
  req('WORKSPACE', '워크스페이스', 'WORKSPACE-003', '사용자 권한 관리', '관리자, 일반 사용자, 조회 전용 사용자 권한을 구분한다.', 'NEEDS_BACKEND'),
  req('WORKSPACE', '워크스페이스', 'WORKSPACE-006', '작업 이력 관리', '사용자의 사용현황, 조회, 다운로드, 리포트 생성 이력을 관리한다.', 'NEEDS_BACKEND'),
  req('WORKSPACE', '워크스페이스', 'WORKSPACE-006', '고객센터', '매뉴얼, CS, FAQ, 문의 사항 관리', 'PLANNED'),
  req('WORKSPACE', '워크스페이스', 'WORKSPACE-006', '사용자 정의 태그 관리', '사용자가 생성한 콘텐츠, 크리에이터, 브랜드, 상품 태그를 관리한다.', 'NEEDS_BACKEND'),

  req('PRODUCT', '상품', 'PRODUCT-001', '상품 기본 정보 관리', '상품명, URL, 이미지, 옵션, 정상가, 할인가, 할인율, 배송 정보, 찜, 카테고리, 성분, 상품 상세 정보 등 기본 정보를 관리한다.', 'FRONTEND_READY'),
  req('PRODUCT', '상품', 'PRODUCT-002', '상품 예상 판매 정보 조회', '상품 예상 판매량, 매출을 조회한다.', 'NEEDS_DATA'),
  req('PRODUCT', '상품', 'PRODUCT-004', '상품군 그룹핑', '옵션, 세트, 리뉴얼, 용량 차이 등 유사 상품을 상품군으로 묶는다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-005', '상품 키워드 관리', '상품명, 별칭, 성분, 라인명 등 검색·언급 탐지용 키워드를 관리한다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-003', '상품 플랫폼 매핑', '동일 상품이 여러 플랫폼에 존재할 경우 하나의 상품으로 연결한다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-006', '상품 산업 분류', '뷰티, 푸드, 패션, 여행, 게임, 요리, 교육, 건강 등 분석 산업을 부여한다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-007', '상품 카테고리 분류', '쿠션, 파운데이션, 로션, 스킨, 토너, 건기식, 반팔티 등 분석 카테고리를 부여한다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-008', '상품 상태 관리', '판매중, 품절, 단종 등 상품 상태를 관리한다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-009', '상품 리뷰 정보 조회', '리뷰 수, 리뷰 평점, 리뷰 내용, 리뷰 이미지, 등록일 등 상품 소비자 반응 지표를 확인한다.', 'FRONTEND_READY'),
  req('PRODUCT', '상품', 'PRODUCT-010', '상품 리뷰 정보 추이 조회', '일/주/월 시간에 따른 리뷰 수, 리뷰 평점, 리뷰 내용, 리뷰 이미지 등 상품 소비자 반응 지표 증감 및 추이 변화를 확인한다.', 'FRONTEND_READY'),
  req('PRODUCT', '상품', 'PRODUCT-011', '상품 리뷰 분석 정보 관리', '리뷰에서 반복되는 만족 요인, 불만 요인, 구매 사유를 관리한다.', 'FRONTEND_READY'),
  req('PRODUCT', '상품', 'PRODUCT-012', '상품 검색', '네이버, 쿠팡, 올리브영, 무신사 등 플랫폼별 상품을 키워드, 상품명, URL 기준으로 검색한다.', 'NEEDS_DATA'),
  req('PRODUCT', '상품', 'PRODUCT-013', '상품 필터', '네이버, 쿠팡, 올리브영, 무신사 등 플랫폼별 상품을 예상 매출, 리뷰수, 리뷰 평점/내용 등 소비자 지표 내림차순/올림차순/특정구간, 일자, 산업, 카테고리, 상품 상세 정보 등 필터링하여 조회한다.', 'FRONTEND_READY'),
  req('PRODUCT', '상품', 'PRODUCT-014', '상품 즐겨찾기 관리', '사용자가 희망하는 상품에 즐겨찾기 태그를 부여 한다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-015', '상품 사용자 생성 태그 관리', '사용자가 희망하는 상품에 사용자 정의 생성 태그를 생성하고 부여 한다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-016', '즐겨찾기 상품 조회', '사용자 즐겨찾기 상품을 조회한다', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-017', '사용자 생성 태그 상품 조회', '사용자 생성 태그 상품을 조회한다.', 'NEEDS_BACKEND'),
  req('PRODUCT', '상품', 'PRODUCT-018', '상품 분석 정보 관리', '상품의 주요 정보, 성분, 강점, 리뷰, 경쟁사 차별화 등 분석 정보를 관리한다.', 'FRONTEND_READY'),

  req('BRAND', '브랜드', 'BRAND-001', '브랜드-상품 연결', '상품이 어느 브랜드에 속하는지 연결한다.', 'NEEDS_BACKEND'),
  req('BRAND', '브랜드', 'BRAND-002', '브랜드 기본 정보 관리', '브랜드명, 공식 URL, 카테고리 등 기본 정보를 관리한다.', 'NEEDS_BACKEND'),
  req('BRAND', '브랜드', 'BRAND-003', '브랜드 상품 예상 판매 정보 조회', '브랜드 상품 예상 판매량, 매출을 조회한다.', 'NEEDS_DATA'),
  req('BRAND', '브랜드', 'BRAND-004', '브랜드 키워드 관리', '브랜드명, 영문명, 약칭, 오타 표현 등 언급 탐지 키워드를 관리한다.', 'NEEDS_BACKEND'),
  req('BRAND', '브랜드', 'BRAND-005', '브랜드 상품 판매 플랫폼 조회', '브랜드 상품이 등록되어 있는 플랫폼을 조회한다.', 'NEEDS_DATA'),
  req('BRAND', '브랜드', 'BRAND-006', '브랜드 주요 산업 조회', '브랜드 상품의 뷰티, 푸드, 패션, 여행, 게임, 요리, 교육, 건강 등 속한 산업을 조회한다.', 'NEEDS_DATA'),
  req('BRAND', '브랜드', 'BRAND-007', '브랜드 주요 카테고리 조회', '브랜드 상품들의 쿠션, 파운데이션, 로션, 스킨, 토너, 건기식, 반팔티 등 속한 카테고리를 조회한다.', 'NEEDS_DATA'),
  req('BRAND', '브랜드', 'BRAND-008', '브랜드 리뷰 분석 정보 관리', '브랜드 상품 리뷰에서 반복되는 만족 요인, 불만 요인, 구매 사유를 관리한다.', 'FRONTEND_READY'),
  req('BRAND', '브랜드', 'BRAND-009', '브랜드 검색', '네이버, 쿠팡, 올리브영, 무신사 등 플랫폼별 상품을 키워드, 브랜드명, URL 기준으로 검색한다.', 'NEEDS_DATA'),
  req('BRAND', '브랜드', 'BRAND-010', '브랜드 필터', '네이버, 쿠팡, 올리브영, 무신사 등 플랫폼별 브랜드의 예상 매출, 리뷰수, 리뷰 평점/내용 등 소비자 지표 내림차순/올림차순/특정구간, 일자, 산업, 카테고리, 상품 상세 정보 등 필터링하여 조회한다.', 'FRONTEND_READY'),
  req('BRAND', '브랜드', 'BRAND-011', '브랜드 즐겨찾기 관리', '사용자가 희망하는 브랜드에 즐겨찾기 태그를 부여 한다.', 'NEEDS_BACKEND'),
  req('BRAND', '브랜드', 'BRAND-012', '브랜드 사용자 생성 태그 관리', '사용자가 희망하는 브랜드에 사용자 정의 생성 태그를 생성하고 부여 한다.', 'NEEDS_BACKEND'),
  req('BRAND', '브랜드', 'BRAND-013', '즐겨찾기 브랜드 조회', '사용자 즐겨찾기 브랜드를 조회한다', 'NEEDS_BACKEND'),
  req('BRAND', '브랜드', 'BRAND-014', '사용자 생성 태그 브랜드 조회', '사용자 생성 태그 브랜드를 조회한다.', 'NEEDS_BACKEND'),
  req('BRAND', '브랜드', 'BRAND-015', '브랜드 분석 정보 관리', '브랜드의 주요 정보, 방향성 및 메시지, 대표 상품 및 서비스, 경쟁사 차별화 등 분석 정보를 관리한다.', 'FRONTEND_READY'),

  req('KEYWORD', '키워드', 'KEYWORD-001', '관심 키워드 흐름 조회', '소재 메시지와 연결되는 관심 표현의 흐름을 확인한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-002', '키워드 관심층 참고 정보', '키워드 반응을 해석하는 데 필요한 관심층 맥락을 확인한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-003', '키워드 반응 맥락 조회', '키워드 반응이 강한 고객군의 맥락을 확인한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-004', '키워드 집행 비용 참고', '키워드 광고 집행 시 참고할 비용 수준을 확인한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-005', '키워드 검색 결과 등록 상품수 조회', '키워드 검색 결과 내 상품 등록수를 확인한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-007', '키워드 검색 결과 등록 상품수 추이 조회', '일/주/월 등 시간에 따른 상품수 증감 및 추이 변화를 확인한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-006', '키워드 검색 결과 등록 상품 상세 정보 조회', '키워드 검색 결과 내 상품의 상품명, URL, 옵션, 상품 상세 정보, 카테고리 등 상품 상세 정보를 조회한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-008', '키워드 검색 결과 등록 상품 가격 정보 조회', '키워드 검색 결과 내 상품의 정상가, 할인가, 할인율 등 상품 가격 정보를 조회한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-009', '키워드 검색 결과 등록 상품 가격 정보 추이 조회', '일/주/월 등 시간에 따른 상품 가격 정보의 증감 및 추이 변화를 확인한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-008', '키워드 검색 결과 등록 상품 리뷰 정보 조회', '키워드 검색 결과 내 상품의 리뷰수, 평점, 리뷰 분석 등 상품 리뷰 정보를 조회한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-009', '키워드 검색 결과 등록 상품 리뷰 정보 추이 조회', '일/주/월 등 시간에 따른 상품 리뷰 정보의 증감 및 추이 변화를 확인한다.', 'NEEDS_DATA'),
  req('KEYWORD', '키워드', 'KEYWORD-010', '키워드 검색 결과 상위 상품 영향도 조회', '상위 상품 예상 판매와 전체 예상 판매 비중에 따른 영향력', 'NEEDS_DATA'),

  req('RANK', '랭킹', 'RANK-001', '플랫폼별 랭킹 조회', '올리브영, 무신사 등 플랫폼 랭킹을 조회한다.', 'FRONTEND_READY'),
  req('RANK', '랭킹', 'RANK-002', '카테고리별 랭킹 조회', '카테고리 기준으로 상품 순위를 확인한다.', 'FRONTEND_READY'),
  req('RANK', '랭킹', 'RANK-003', '기간별 랭킹 추이 조회', '일/주/월 등 시간에 따른 올리브영, 무신사 등 플랫폼 랭킹 증감 및 추이 변화를 확인한다.', 'FRONTEND_READY'),
  req('RANK', '랭킹', 'RANK-004', '키워드별 랭킹 조회', '키워드별 네이버 쇼핑, 쿠팡 등 플랫폼 랭킹을 조회한다.', 'NEEDS_DATA'),
  req('RANK', '랭킹', 'RANK-005', '키워드 랭킹 추이 조회', '일/주/월 등 시간에 따른 키워드별 네이버 쇼핑, 쿠팡 등 플랫폼 랭킹 증감 및 추이 변화를 확인한다.', 'NEEDS_DATA'),
  req('RANK', '랭킹', 'RANK-006', '랭킹 스냅샷 저장', '분석 재현을 위해 특정 시점의 랭킹 상태를 저장한다.', 'NEEDS_BACKEND'),
  req('RANK', '랭킹', 'RANK-007', '키워드 랭킹 급증감 탐지', '급증, 급감, 순위 유지율이 장기간 지속되는 상품을 확이한다.', 'NEEDS_DATA'),

  req('REPORT', '리포트', 'REPORT-001', '엑셀 다운로드', '조회 결과와 리포트를 엑셀 파일로 다운로드한다.', 'NEEDS_BACKEND'),
  req('REPORT', '리포트', 'REPORT-002', 'PDF 다운로드', '보고용 리포트를 PDF 파일로 다운로드한다.', 'NEEDS_BACKEND'),
  req('REPORT', '리포트', 'REPORT-006', '랭킹 현황 리포트', '등록 상품들의 플랫폼/키워드별 일별 랭킹 현황을 대시보드 및 보고서 형태로 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-007', '브랜드 랭킹 리포트 생성', '특정 브랜드 단위의 플랫폼/키워드별 랭킹현황 및 증감 추이 변화를 대시보드 및 보고서 형태로 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-008', '브랜드 랭킹 비교 리포트 생성', '특정 브랜드별 상품 랭킹 점유율과 랭킹 변화를 대시보드 및 보고서 형태로 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-003', '상품 트렌드 리포트', '국가 및 카테고리별 랭킹, 리뷰수, 증가수, 소비자 리뷰 분석 긍정율 등 소비자 반응 지표가 높은 상품을 대시보드 및 보고서 형태로 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-003', '상품 심층 분석 리포트', '특정 상품의 기본 정보, 특장점, 성분, 리뷰 반응 정보를 대시보드 및 보고서 형태로 제공한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-003', '시장 트렌드 심층 분석 리포트', '국가 및 카테고리별 소비자 반응 지표가 높은 상품의 평균 가격, 공통점, 차이점, 특장점, 리뷰 반응 정보를 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-004', '키워드 상품 트렌드 심층 분석 리포트', '키워드별 소비자 반응 지표가 높은 상품의 평균 가격, 공통점, 차이점, 특장점, 리뷰 반응 정보를 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-005', '급상승 트렌드 리포트', '국가 및 카테고리별 급상승한 라이징 상품의 평균 가격, 공통점, 차이점, 특장점, 리뷰 반응 정보를 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-005', '키워드 급상승 트렌드 리포트', '키워드별 급상승한 라이징 상품의 평균 가격, 공통점, 차이점, 특장점, 리뷰 반응 정보를 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-009', '브랜드 리포트', '특정 브랜드 주요 상품들의 상품 심층 분석 리포트와 해당 리포트 기반 통합 브랜드 요약 분석 리포트를 생성한다.', 'PLANNED'),
  req('REPORT', '리포트', 'REPORT-009', '브랜드 비교 리포트', '특정 브랜드별 주요 상품들의 상품 심층 분석 리포트와 해당 리포트 기반 통합 브랜드 요약 분석 리포트를 비교한다.', 'PLANNED'),

  req('ALERT', '알림', 'ALERT-001', '알림 조건 관리', '사용자가 알림 기준, 대상 브랜드, 대상 상품을 설정한다.', 'NEEDS_BACKEND'),
  req('ALERT', '알림', 'ALERT-002', '알림 이력 조회', '발송된 알림과 확인 여부를 조회한다.', 'NEEDS_BACKEND'),
  req('ALERT', '알림', 'ALERT-003', '일별 랭킹 현황 알림', '등록 상품의 키워드/플랫폼 랭킹 순위 정보를 일간 오전 00시 알림으로 제공한다.', 'NEEDS_BACKEND'),
  req('ALERT', '알림', 'ALERT-003', '랭킹 급변 알림', '상품 순위가 기준 이상 상승 또는 하락하면 알림을 제공한다.', 'NEEDS_BACKEND'),
  req('ALERT', '알림', 'ALERT-004', '경쟁 브랜드 랭킹 급변 알림', '경쟁 브랜드의 급상승 랭킹 상품 발생을 알린다.', 'NEEDS_BACKEND'),
];

export function getDuplicateRequirementIds(requirements = SERVICE_REQUIREMENTS) {
  const counts = requirements.reduce<Record<string, number>>((acc, item) => {
    acc[item.requirementId] = (acc[item.requirementId] ?? 0) + 1;
    return acc;
  }, {});

  return new Set(Object.entries(counts).filter(([, count]) => count > 1).map(([id]) => id));
}
