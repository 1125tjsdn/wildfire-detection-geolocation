# FireGuard AI - API 명세서 (초안)

이 문서는 **FireGuard AI (CCTV·영상 기반 산불 탐지 및 위치 추정 모니터링 시스템)**의 프론트엔드와 백엔드 간 협업을 위한 API 및 데이터 인터페이스 명세서입니다.

> **[안내]**  
> 현재 세부 JSON 데이터 필드는 백엔드 설계 및 팀 협의 중입니다.  
> 엔드포인트 목록과 기본 규칙을 먼저 정의하고, 각 API의 구체적인 JSON 형태는 논의를 통해 단계별로 확정해 나갈 예정입니다.

---

## 1. 기본 정보

- **Base URL:** `http://127.0.0.1:3000/api` (로컬 개발 기준)
- **데이터 형식:** JSON 요청·응답은 `Content-Type: application/json; charset=utf-8`을 사용합니다. 영상 파일 업로드 방식과 요청 형식은 별도 협의 예정입니다.
- **공통 응답 규칙:**
  - 성공 시: HTTP 상태 코드 `200 OK` 또는 `201 Created`
  - 실패 시: HTTP 에러 코드(`400`, `404`, `500`)와 함께 에러 메시지 반환
    ```json
    {
      "error": "에러 메시지"
    }
    ```

---

## 2. API 목록 요약

| 분류 | HTTP Method | Endpoint | 설명 | 상태 |
|---|---|---|---|:---:|
| **CCTV** | `GET` | `/api/cameras` | 전체 CCTV 카메라 목록 조회 (지도 표시용) | 협의 중 |
| **CCTV** | `GET` | `/api/cameras/:id` | 특정 CCTV 상세 정보 조회 | 협의 중 |
| **영상** | `GET` | `/api/videos` | 등록된 CCTV 영상 목록 조회 | 협의 중 |
| **영상** | `POST` | `/api/videos` | 새 영상 파일 등록/업로드 메타데이터 생성 | 협의 중 |
| **산불 이벤트** | `GET` | `/api/events` | 산불 감지 이벤트 목록 조회 (대시보드 목록용) | 협의 중 |
| **산불 이벤트** | `GET` | `/api/events/:id` | 산불 감지 이벤트 상세 정보 조회 | 협의 중 |

---

## 3. Frontend 제공 API (상세)

### 3.1. CCTV 카메라 목록 조회
- **Endpoint:** `GET /api/cameras`
- **설명:** 지도 화면에 설치된 CCTV 아이콘을 띄우기 위해 카메라 정보 목록을 반환합니다.
- **Request Parameters:** 없음
- **Response JSON:**
  ```text
  [협의 및 확정 예정 - 논의 후 작성]
  ```

---

### 3.2. CCTV 상세 정보 조회
- **Endpoint:** `GET /api/cameras/:id`
- **설명:** 특정 CCTV의 세부 설치 정보(화각, 방위각, 고도 등)를 반환합니다.
- **Request Parameters:** Path Parameter `id` (카메라 식별자)
- **Response JSON:**
  ```text
  [협의 및 확정 예정 - 논의 후 작성]
  ```

---

### 3.3. 영상 목록 조회
- **Endpoint:** `GET /api/videos`
- **설명:** 모니터링 분석에 사용되는 영상 메타데이터 목록을 반환합니다.
- **Response JSON:**
  ```text
  [협의 및 확정 예정 - 논의 후 작성]
  ```

---

### 3.4. 산불 감지 이벤트 목록 조회
- **Endpoint:** `GET /api/events`
- **설명:** 대시보드 메인 화면의 "최근 산불 발생 내역" 및 지도 위에 화재 발생 지점을 표시하기 위한 이벤트 목록을 반환합니다.
- **Query Parameters:** (예: `status`, `limit` 등 검토 예정)
- **Response JSON:**
  ```text
  [협의 및 확정 예정 - 논의 후 작성]
  ```

---

### 3.5. 산불 감지 이벤트 상세 조회
- **Endpoint:** `GET /api/events/:id`
- **설명:** 특정 이벤트 클릭 시 팝업에 표시할 상세 정보(카메라 정보, 영상 정보, 추정 위·경도, 오차 범위 등)를 반환합니다.
- **Request Parameters:** Path Parameter `id` (이벤트 고유 번호)
- **Response JSON:**
  ```text
  [협의 및 확정 예정 - 논의 후 작성]
  ```

---

### 3.6. 영상 등록

- **Endpoint:** `POST /api/videos`
- **설명:** 분석에 사용할 영상을 등록합니다. 실제 파일 업로드와 서버에 저장된 영상의 메타데이터 등록 중 어떤 방식을 사용할지는 협의 예정입니다.
- **Request:**
  ```text
  [전송 방식과 요청 필드 협의 예정]
  ```
- **Response JSON:**
  ```text
  [협의 및 확정 예정 - 논의 후 작성]
  ```
