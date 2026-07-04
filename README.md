<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1e5-YI6zx7r-mRFqkPDbg-tryWKq3KgSR

## Dashboard Structure

The app is organized into three analytics spaces:

- **요약 대시보드**: the primary landing view. It summarizes the assigned brand or company portfolio across products: ad spend, purchase response, ROAS, campaign summaries, and product-level ad-to-commerce links.
- **선행지표 분석관**: tracks media/content/creator activity across YouTube, Instagram, Meta Ads, TikTok, and future social channels for the selected product. It focuses on campaign execution, creative response, channel comparison, and campaign URL registration.
- **후행지표 분석관**: tracks commerce signals across 올리브영, 쿠팡, 네이버, and future commerce channels for the same selected product. It focuses on purchase response trends, ad timing overlays, ranking changes, product condition comparison, and review response.

The intended analysis flow is:

1. Use **요약 대시보드** to review the brand/company-level total across products.
2. Pick one product as the shared analysis unit in **선행지표 분석관** or **후행지표 분석관**.
3. Compare that product's ad execution with its commerce response across channels.

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

## Run With Docker

Production-style static build:

1. Build and run:
   `docker compose up --build`
2. Open:
   `http://localhost:3000`

Vite dev server in Docker:

1. Run the dev profile:
   `docker compose --profile dev up app-dev`
2. Open:
   `http://localhost:3001`
