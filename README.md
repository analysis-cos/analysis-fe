<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1e5-YI6zx7r-mRFqkPDbg-tryWKq3KgSR

## Dashboard Structure

The app is organized into three analytics spaces:

- **요약 대시보드**: the primary landing view. It summarizes ad spend, clicks, purchase signals, ROAS, channel links, implementation roadmap, report templates, and priority products.
- **선행지표 분석관**: tracks media/content/creator activity across YouTube, Instagram, Meta Ads, TikTok, and future social channels. It focuses on campaign execution, creative response, channel comparison, and feature entry points.
- **후행지표 분석관**: tracks commerce signals across 올리브영, 쿠팡, 네이버, and future commerce channels. It focuses on ranking changes, product comparison, review response, reports, and alerts.

The detailed planning source is `260629_BRAND DASH_서비스 기획안.xlsx`. The current prototype reflects these sheets:

- `00. 서비스 개요`
- `01. 미디어_기능 정의`
- `01. 미디어_요구 사항 정의`
- `02. 커머스_요구사항 정의`

The intended analysis flow is:

1. Register or review campaign execution in **선행지표 분석관**.
2. Check purchase signals and commerce response in **후행지표 분석관**.
3. Use **요약 대시보드** as the daily decision panel for budget, creative, and channel actions.

## Feature Pages

Each planning feature now has its own detail page. The summary dashboard exposes a feature map, and the leading/lagging analytics views expose category-specific feature cards.

- **선행지표 기능 페이지**: 트렌드 콘텐츠, 키워드 레퍼런스, 콘텐츠 유형 분석, 자사·경쟁사 언급, 크리에이터 심층 분석, 콘텐츠 보관함
- **후행지표 기능 페이지**: 실시간 랭킹 추적, 리딩 상품 분석, 라이징 상품 탐지, 시장 반응 요약, 자사 리뷰 분석, 경쟁사 리뷰 분석

Every feature page now keeps customer-facing judgment first: objective, key metric, connected platforms, trend view, workflow, expected outputs, and related feature links.

## OliveYoung Commerce Analysis

The leading indicator view includes an **올리브영 커머스 분석** panel. This is frontend-only and uses fixture data through an adapter boundary until backend APIs are available.

Implemented frontend contracts:

- `getOliveYoungMetricCatalog()`
- `getOliveYoungStatus(campaignId, productId)`
- `getOliveYoungAnalysis(campaignId, productId)`
- `getOliveYoungProductSnapshots(productId)`
- `getOliveYoungCampaignEffect(campaignId)`
- `getOliveYoungReviewVocSummary(campaignId, productId)`

The panel shows data reliability, summary KPI cards, commerce signal interpretation, timeline trends, confounders, product snapshots, review response preview, metric coverage, and restricted metric notices. Exact sales volume, revenue, conversion rate, and order count are not displayed without partner or advertiser-provided data.

## Service Requirement Map

The summary dashboard links to a frontend **서비스 기능 전체 맵**. It catalogs workspace, product, brand, keyword, rank, report, and alert requirements with domain filters, status filters, search, duplicate requirement ID flags, and backend/data dependency labels.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
4. Build the app:
   `npm run build`
5. Run tests:
   `npm test`
