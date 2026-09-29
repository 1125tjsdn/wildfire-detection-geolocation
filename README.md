# FireGuard AI

CCTV·영상 기반 산불 탐지 및 화재 위치 추정 모니터링 프로젝트입니다.

제공받은 YOLO 가중치로 화재·연기를 탐지하고, 영상에서 추정한 화재 위치를 지도에 표시하는 시스템을 목표로 합니다. 핵심 연구 주제는 화재 위치 추정과 오차 분석입니다. 위치는 정확한 좌표가 아닌 추정 좌표와 오차·불확실성 범위로 다룹니다.

## 현재 상태

초기 저장소 구조와 PostgreSQL 개발 실행 설정을 준비하고, Backend 라이브러리(express, pg, dotenv) 설치 및 기본 코드(`src/server.js`, `src/app.js`, `src/db.js`, `src/routes/index.js`) 작성을 마친 단계입니다. 서버 실행 시 PostgreSQL 연결을 먼저 검증한 후 구동되는 기본 뼈대가 갖추어졌습니다. 아직 기능별 비즈니스 API, DB 테이블 생성 스크립트(`sql/init.sql`), Frontend, AI 기능은 구현 전이며, 데이터 규격(JSON)과 ERD는 협의 예정입니다. 초기 입력은 제공된 녹화 영상을 사용하며, 실시간 CCTV는 접근 가능 여부에 따라 추가합니다.

## 시스템 흐름

```text
CCTV / 영상 → Node.js Backend → AI (탐지 및 위치 추정)
                                  ↓ 결과 JSON
                             Node.js Backend
                              ├─ PostgreSQL
                              ├─ Vue.js Frontend ↔ Map API
                              └─ SMS API → 관리자
```

AI와 Frontend는 Backend를 통해 데이터를 주고받습니다. 영상 파일은 서버 파일시스템에 저장하고 DB에는 경로와 메타데이터를 저장합니다. 연속 탐지는 하나의 이벤트로 묶는 방향이며, 구체적인 기준은 추후 정합니다.

## 기술 스택

- Backend: Node.js, Express, PostgreSQL
- Frontend: JavaScript, Vue.js
- AI: Python, YOLO, 필요 시 OpenCV
- 실행 환경: Docker

## 팀 역할

| 담당자 | 역할 |
| --- | --- |
| 김경민 | YOLO 탐지 및 화재 위치 추정 공동 연구·개발 |
| 김형규 | 화재 위치 추정 공동 연구·개발, 관련 연구 검토 및 오차 분석 |
| 유선우 | Backend, DB·ERD, REST API, AI 결과 관리, Frontend·SMS 연동 |
| 채정인 | Vue.js 대시보드, Map API, 탐지 및 추정 위치 시각화 |

## 폴더 구조

```text
wildfire-detection-geolocation/
├── docs/                # 프로젝트 문서 및 API 명세서
│   └── API_SPEC.md      # 협업용 API 및 데이터 인터페이스 명세서 (초안)
├── backend/             # Backend
│   ├── src/
│   │   ├── app.js       # Express 앱 설정, 미들웨어, 공통 에러 처리
│   │   ├── db.js        # PostgreSQL 연결 풀(Pool) 설정
│   │   ├── server.js    # DB 사전 검증 및 서버 기동/종료
│   │   └── routes/
│   │       └── index.js # API 라우터 (엔드포인트 등록)
│   ├── package.json
│   └── package-lock.json
├── frontend/            # Frontend
├── ai/                  # 탐지 및 위치 추정
├── sql/                 # DB 초기화 SQL (설계 후 작성)
├── data/                # 로컬 영상 및 데이터
├── docker-compose.yml   # PostgreSQL 개발 실행 설정
├── .env.example         # 환경변수 예시
├── .gitignore
└── README.md
```

Git은 빈 폴더를 추적하지 않으므로 GitHub에 폴더가 표시되도록 `.gitkeep`을 넣어두었습니다. 해당 폴더에 Git으로 관리할 실제 파일을 추가한 뒤에는 `.gitkeep`을 삭제해도 됩니다.

`data/`의 실제 영상·데이터 파일과 YOLO 가중치(`*.pt`)는 `.gitignore`에 제외 대상으로 지정되어 있어 GitHub에 올라가지 않습니다. 필요한 파일은 별도로 전달받아 로컬에 배치합니다. `data/.gitkeep`은 예외적으로 Git에 포함되므로 폴더 유지를 위해 남겨둡니다.

## Backend 라이브러리 설치 및 실행

Node.js와 npm이 설치되어 있어야 합니다. 프로젝트를 내려받은 뒤 프로젝트 루트에서 다음 명령을 실행합니다.

```bash
cd backend
npm ci
```

`npm ci`는 `package.json`과 `package-lock.json`을 기반으로 기록된 버전의 라이브러리를 설치합니다. `npm init`이나 라이브러리별 설치 명령을 다시 실행할 필요는 없습니다.

- `express`: API 서버 구성
- `pg`: PostgreSQL 연결
- `dotenv`: `.env` 파일의 환경변수 읽기

`package.json`과 `package-lock.json`은 Git으로 함께 관리합니다. 설치된 라이브러리가 들어가는 `node_modules/`는 `.gitignore`로 제외합니다.

### Backend 서버 실행

DB(PostgreSQL) 컨테이너가 실행 중인 상태에서 `backend/` 폴더 내에서 다음 명령으로 서버를 실행합니다.

- **일반 실행:**
  ```bash
  npm start
  ```
- **개발용 자동 재실행 (`--watch`):**
  ```bash
  npm run dev
  ```

서버 기동 시 먼저 PostgreSQL에 `SELECT 1` 쿼리를 보내 DB 연결 상태를 확인합니다. DB 연결이 성공하면 `http://127.0.0.1:3000`에서 요청을 대기하며, 연결 실패 시에는 서버를 띄우지 않고 프로세스를 즉시 종료합니다.

종료 시에는 터미널에서 `Ctrl + C`를 누르면 처리 중인 요청과 DB 연결 풀을 안전하게 정리(Graceful Shutdown)한 후 종료됩니다. 현재는 비즈니스 API 등록 전이므로 요청 시 기본 404 응답을 반환합니다.

아래 PostgreSQL 실행 명령은 프로젝트 루트 기준입니다. 위 명령을 실행했다면 `cd ..`로 돌아온 뒤 진행합니다.

## 개발용 PostgreSQL 실행

Docker와 Docker Compose가 설치되어 있고 Docker가 실행 중이어야 합니다. 프로젝트 루트에서 실행합니다.

1. 환경변수 예시를 복사합니다.

   ```bash
   cp .env.example .env
   ```

2. `.env`의 `DB_PASSWORD`를 로컬 개발용 비밀번호로 변경합니다. `.env`는 Git에 포함되지 않습니다.

3. PostgreSQL을 실행합니다.

   ```bash
   docker compose up -d db
   ```

4. 실행 상태를 확인합니다.

   ```bash
   docker compose ps
   ```

호스트에서 실행하는 Backend의 접속 주소는 `localhost`, 기본 포트는 `5432`입니다. 데이터는 Docker 볼륨 `postgres_data`에 보관합니다. 현재 Backend 기본 연결 코드는 작성되어 있으며, 테이블 생성 SQL(`sql/init.sql`)은 설계 후 작성 예정입니다.

종료할 때는 `docker compose down`을 사용합니다. 일반 종료 시 DB 볼륨은 유지됩니다. `.env`의 DB 계정 설정은 빈 볼륨을 처음 초기화할 때 적용되므로, 이후 값을 변경해도 기존 DB 계정이 자동으로 변경되지는 않습니다.

## DB 테이블 추가 및 변경

새 테이블을 만들거나 기존 테이블의 컬럼을 변경할 때는 컨테이너를 재생성할 필요가 없습니다. 실행 중인 DB에 `CREATE TABLE`, `ALTER TABLE` 등의 SQL을 적용합니다. 변경 SQL은 `sql/`에 파일로 남겨 공유하고, 팀원들은 각자의 DB에 필요한 변경을 순서대로 적용합니다. 컬럼이나 테이블을 삭제하면 해당 데이터도 삭제되므로 적용 전에 팀원들과 확인합니다.

컨테이너를 삭제하고 다시 만들어도 기존 DB 볼륨을 연결하면 테이블과 데이터는 그대로 유지됩니다. 나중에 `init.sql`을 Docker의 초기화 스크립트로 연결하더라도 이 파일은 DB 저장 공간이 비어 있는 최초 초기화 때만 실행됩니다. 파일 수정이나 컨테이너 재생성만으로 기존 DB의 테이블 구조가 자동으로 변경되지는 않습니다. 현재는 `init.sql` 작성 및 자동 실행 연결 전입니다.
