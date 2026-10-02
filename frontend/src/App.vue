<script setup>
// FireGuard AI 대시보드 진입점
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>FireGuard AI</h1>
      <p>산불 감지 및 화재 위치 추정 모니터링 시스템</p>
    </header>
    <main class="app-main">
      <div class="card">
        <h2>모니터링 대시보드</h2>
        <p>프론트엔드 기본 환경 구성이 완료되었습니다. 컴포넌트 구현이 진행될 예정입니다.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
  margin-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 16px;
}

.app-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  color: #1a1a1a;
}

.app-header p {
  margin: 0;
  color: #666;
  font-size: 15px;
}

.card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.card h2 {
  margin: 0 0 12px 0;
  font-size: 20px;
  color: #333;
}

.card p {
  margin: 0;
  color: #555;
  line-height: 1.5;
}
</style>
