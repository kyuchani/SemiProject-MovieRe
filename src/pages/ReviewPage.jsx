import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaStar, FaTrash } from 'react-icons/fa';
import './ReviewPage.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  // 추천 & 비추천 증가 함수
  const handleVote = (index, type) => {
    const updatedReviews = [...reviews];

    if (type === 'like') {
      updatedReviews[index].likes = (updatedReviews[index].likes || 0) + 1;
    } else {
      updatedReviews[index].dislikes = (updatedReviews[index].dislikes || 0) + 1;
    }

    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // `localStorage`에 저장
  };

  // 리뷰 삭제 함수
  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // `localStorage`에서 삭제된 리뷰 반영
  };

  return (
    <div className="review-list-container">
      <div className="review-header">
        <h2>리뷰 / 댓글</h2>
        <button onClick={() => navigate('/review/write')}>리뷰 작성</button>
      </div>

      <ul>
        {reviews.length === 0 ? (
          <p>아직 작성된 리뷰가 없습니다.</p>
        ) : (
          reviews.map((review, index) => (
            <li key={index} className={`review-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <img src="/src/images/none.png" alt="Profile" />

              <div className="review-content">
                {/* Display the username (nickname) */}
                <p className="review-username">{review.username}</p> {/* Updated to display review.username */}
                <div className="review-rating">
                  <FaStar className="rating-star" /> <span>{review.rating}</span>
                </div>
                <p className="review-text">{review.text}</p>
              </div>

              <div className="review-vote">
                <button onClick={() => handleVote(index, 'like')}>
                  <FaThumbsUp className="vote-icon" /> {review.likes || 0}
                </button>
                <button onClick={() => handleVote(index, 'dislike')}>
                  <FaThumbsDown className="vote-icon" /> {review.dislikes || 0}
                </button>
                <button onClick={() => handleDelete(index)}>
                  <FaTrash className="delete-icon" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ReviewPage;
