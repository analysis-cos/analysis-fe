
import { Product, ChartDataPoint } from './types';

export const COLORS = {
  primary: '#6dec13',
  secondary: '#60a5fa',
  accent: '#6c9a4c',
  bg: '#f7f8f6',
};

export const MOCK_PRODUCTS: Product[] = [
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 

  {
    rank: 1,
    name: "[1월 올영픽/15년연속 1위] 메디힐 에센셜 마스크팩 10+1/10매 기획 7종",
    brand: "메디힐",
    category: "기타",
    price: 9950,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022341489ko.png?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000232724&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=17"
  },
  {
    rank: 2,
    name: "[올영어워즈1등 크림] 에스트라 아토베리어365 크림 80ml 기획 (+하이드로 에센스25ml+세라-히알 앰플7ml)",
    brand: "에스트라",
    category: "기타",
    price: 26400,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022283321ko.jpg?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000223414&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=1"
  },
  {
    rank: 3,
    name: "[1월 올영픽] 크런틴 크런치볼 단백질쉐이크 50g 4종 택1",
    brand: "크런틴",
    category: "기타",
    price: 5900,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022741826ko.jpg?l=ko",
    url:"https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000223424&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=87"
  },
  {
    rank: 4,
    name: "[1월올영픽][피지흡착] 한율 쑥떡팩폼 120ml (+미니 클렌징 4종 증정)",
    brand: "한율",
    category: "기타",
    price: 19700,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0020/A00000020401466ko.jpg?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000226498&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=13"
  },
  {
    rank: 5,
    name: "[1월 올영픽/한정기획] 메디힐 더마 패드 100+100매 더블 기획 7종",
    brand: "메디힐",
    category: "기타",
    price: 28400,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0024/A00000024295321ko.png?l=ko",
    url :"https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000227418&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=4"
  },
  {
    rank: 6,
    name: "[종지부부 마켓특가/1등 미백앰플] 메디큐브 PDRN 핑크 앰플 30ml 리필기획 (본품+리필 50ML)",
    brand: "메디큐브",
    category: "기타",
    price: 23200,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022649828ko.jpeg?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000239096&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=58"
  },
  {
    rank: 7,
    name: "[1월올영픽/NO.1 미스트세럼] 달바 퍼스트 스프레이 세럼 100ml 2개 기획",
    brand: "달바",
    category: "기타",
    price: 31900,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023272414ko.jpg?l=ko",
    url : "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000242953&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=10"
  },
  {
    rank: 8,
    name: "[1위 속보습세럼/단독기획] 토리든 다이브인 저분자 히알루론산 세럼 50ml 리필기획(+리필팩 50ml)",
    brand: "토리든",
    category: "기타",
    price: 25650,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0018/A00000018926135ko.jpg?l=ko",
    url : "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000189261&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=19"
  },
  {
    rank: 9,
    name: "[2025 어워즈/미백천재앰플] 메디큐브 PDRN 핑크앰플 30ml 어워즈 기획 (+리필50ml+세럼1.5ml*5매)",
    brand: "메디큐브",
    category: "기타",
    price: 24600,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023909617ko.png?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000204014&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=7"
  },
  {
    rank: 10,
    name: "[미백/잡티케어] 달바 비타 토닝 캡슐 세럼 50ml",
    brand: "달바",
    category: "기타",
    price: 21900,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022342412ko.png?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000204014&dispCatNo=90000010009&trackingCd=Best_Sellingbest&t_page=랭킹&t_click=판매랭킹_전체_상품상세&t_number=7"
  }
  ,
  // 메디힐 상품 데이터
  {
    rank: 11,
    name: "메디힐 N.M.F 아쿠아링 앰플 마스크팩 10매",
    brand: "메디힐",
    category: "마스크/팩",
    price: 12900,
    change: 2,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022342412ko.png?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000251234"
  },
  {
    rank: 12,
    name: "메디힐 티트리 케어 솔루션 에센셜 마스크",
    brand: "메디힐",
    category: "마스크/팩",
    price: 11500,
    change: -1,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022342412ko.png?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000251235"
  },
  {
    rank: 13,
    name: "메디힐 더마 에이드 패드 60매",
    brand: "메디힐",
    category: "스킨케어",
    price: 19800,
    change: 5,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022342412ko.png?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000251236"
  },
  {
    rank: 14,
    name: "메디힐 하이드로겔 아이패치 30쌍",
    brand: "메디힐",
    category: "아이케어",
    price: 14900,
    change: 0,
    imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022342412ko.png?l=ko",
    url: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000251237"
  }
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { time: '00:00', cosrx: 80, joseon: 110 },
  { time: '04:00', cosrx: 110, joseon: 120 },
  { time: '08:00', cosrx: 140, joseon: 130 },
  { time: '12:00', cosrx: 80, joseon: 100 },
  { time: '16:00', cosrx: 210, joseon: 60 },
  { time: '20:00', cosrx: 90, joseon: 80 },
  { time: 'NOW', cosrx: 170, joseon: 150 },
];
