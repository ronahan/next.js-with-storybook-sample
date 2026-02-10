'use client';

import { useState, useId, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';

type ValidationErrors = {
  email?: string;
  password?: string;
};

function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return '이메일을 입력해주세요.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) {
    return '비밀번호를 입력해주세요.';
  }
  return undefined;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const formId = useId();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        const from = searchParams.get('from') || '/dashboard';
        router.push(from);
      } else {
        setSubmitError(result.error || '로그인에 실패했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="로그인 폼"
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <Input
        id={`${formId}-email`}
        label="이메일"
        type="email"
        placeholder="admin@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) {
            setErrors((prev) => ({ ...prev, email: undefined }));
          }
        }}
        error={errors.email}
        autoComplete="email"
        required
      />

      <Input
        id={`${formId}-password`}
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) {
            setErrors((prev) => ({ ...prev, password: undefined }));
          }
        }}
        error={errors.password}
        autoComplete="current-password"
        required
      />

      {submitError && (
        <p role="alert" style={{ color: 'var(--color-error)', fontSize: 14 }}>
          {submitError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>

      <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
        테스트 계정: admin@example.com / Admin123!
      </p>
    </form>
  );
}
