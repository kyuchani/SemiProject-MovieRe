// src/components/FindIdPage.js
import { useState } from 'react';

const FindIdPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('이메일을 입력해주세요.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await mockFindId(email);

            if (response.success) {
                setMessage('등록된 이메일 주소로 아이디 찾기 링크가 전송되었습니다.');
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage('아이디 찾기 중 문제가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const mockFindId = (email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'test@domain.com') {
                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: '등록된 이메일이 없습니다.' });
                }
            }, 1000);
        });
    };

    return (
        <div className="page-container">
            <h2>아이디 찾기</h2>
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
                {message && <p className="message">{message}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? '아이디 찾는 중...' : '아이디 찾기'}
                </button>
            </form>
        </div>
    );
};

export default FindIdPage;
