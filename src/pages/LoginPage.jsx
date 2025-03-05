// src/components/LoginPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 로그인 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 입력 값 유효성 검사
        if (!email || !password) {
            setError('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 여기서 실제 로그인 API 호출 (모의 로직)
            const response = await mockLogin(email, password);

            if (response.success) {
                navigate('/home');
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('로그인 중 문제가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const mockLogin = (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'test@domain.com' && password === 'password123') {
                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: '이메일 또는 비밀번호가 잘못되었습니다.' });
                }
            }, 1000);
        });
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        disabled={loading}
                    />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? '로그인 중...' : '로그인'}
                </button>

                <div className="additional-links">
                    <a href="/find-id" className="link">
                        아이디 찾기
                    </a>
                    <a href="/find-password" className="link">
                        비밀번호 찾기
                    </a>
                    <a href="/sign-up" className="link">
                        회원가입
                    </a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
