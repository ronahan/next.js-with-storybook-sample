import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm/LoginForm';

function LoginFormFallback() {
  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      로딩 중...
    </div>
  );
}

export default function LoginPage() {
  return (
    <main style={{ maxWidth: 360, margin: '100px auto', padding: '0 16px' }}>
      <h1 style={{ marginBottom: 24 }}>Admin Login</h1>
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
