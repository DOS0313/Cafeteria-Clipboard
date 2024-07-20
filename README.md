# Cafeteria-Clipboard

해당 프로젝트는 인스타그램에 업로드되는 급식 정보 스토리 업로드의 편의성을 강화하고자 제작된 웹사이트 입니다.

## Tech Stack

- Next.js 14
- html2canvas
- TailwindCSS 3.3.0

## Getting Started

1. [NEIS 교육정보 개방 포털](https://open.neis.go.kr/portal/guide/actKeyPage.do)에서 인증키를 발급 받은 후 [.env](https://github.com/DOS0313/Cafeteria-Clipboard/blob/main/.env.example)의 `NEIS_API_KEY`에 삽입하세요.
2. [학교기본정보 API](https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=1)를 통해 시도교육청코드와 행정표준코드를 각각 `NEIS_ATPT_OFCDC_SC_CODE`와 `NEIS_SD_SCHUL_CODE`에 삽입하세요.
3. 아래 명령어를 실행하여 개발 서버를 실행하세요.

```
yarn
yarn dev
```

## Credit

- FE : [DOS0313](https://github.com/DOS0313)
- Design : [DOS0313](https://github.com/DOS0313)
- Font : [Wanted Sans](https://github.com/wanteddev/wanted-sans)
- CI/CD : [Vercel](https://vercel.com)
