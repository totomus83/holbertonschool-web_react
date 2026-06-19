import { renderHook, act } from '@testing-library/react';
import useLogin from './useLogin';

describe('useLogin hook', () => {
  test('initial state has empty email, password and enableSubmit false', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.enableSubmit).toBe(false);
  });

  test('handleChangeEmail updates email', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } });
    });
    expect(result.current.email).toBe('test@example.com');
  });

  test('handleChangePassword updates password', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    act(() => {
      result.current.handleChangePassword({ target: { value: 'password123' } });
    });
    expect(result.current.password).toBe('password123');
  });

  test('enableSubmit is true when email and password are valid', () => {
    const { result } = renderHook(() => useLogin(() => {}));
    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } });
    });
    act(() => {
      result.current.handleChangePassword({ target: { value: 'password123' } });
    });
    expect(result.current.enableSubmit).toBe(true);
  });

  test('handleLoginSubmit calls onLogin with email and password', () => {
    const onLogin = jest.fn();
    const { result } = renderHook(() => useLogin(onLogin));
    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } });
    });
    act(() => {
      result.current.handleChangePassword({ target: { value: 'password123' } });
    });
    act(() => {
      result.current.handleLoginSubmit({ preventDefault: () => {} });
    });
    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});