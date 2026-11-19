# Todo App

간단한 Todo 목록 앱입니다. 데이터는 Turso에 저장합니다.

## 로컬 실행

`.env.local`에 다음 환경변수를 설정하세요.

```env
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

```bash
npm install
npm run dev
```

## Vercel 배포

GitHub 저장소를 Vercel 프로젝트에 연결한 다음, Vercel 프로젝트 설정의 **Environment Variables**에 `TURSO_DATABASE_URL`과 `TURSO_AUTH_TOKEN`을 등록하세요. Production과 Preview 환경 모두 설정한 뒤 배포합니다. `.env.local`은 GitHub에 올리지 마세요.

## 접근 권한

로그인 없이 공개되는 단일 목록입니다. 배포 주소에 접근할 수 있는 누구나 목록을 읽고, Todo를 추가하고, 완료 상태를 변경하거나 삭제할 수 있습니다. 비밀번호, 개인 정보 등 민감한 내용은 입력하지 마세요.
