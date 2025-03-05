// src/components/SignUpPage.js
import { useState } from 'react';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setMessage('모든 필드를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await mockSignUp(email, password);

            if (response.success) {
                setMessage('회원가입이 완료되었습니다!');
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage('회원가입 중 문제가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const mockSignUp = (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'test@domain.com') {
                    resolve({ success: false, message: '이미 등록된 이메일입니다.' });
                } else {
                    resolve({ success: true });
                }
            }, 1000);
        });
    };

    return (
        <div className="page-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} className="form">
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
                <div>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="비밀번호를 확인하세요"
                        disabled={loading}
                    />
                </div>
                {message && <p className="message">{message}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? '회원가입 중...' : '회원가입'}
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
