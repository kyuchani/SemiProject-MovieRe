import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ReviewForm.css'; 

const ReviewForm = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (review.trim() === '' || rating === 0) {
      alert('별점과 리뷰 내용을 입력해주세요!');
      return;
    }

    let existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    const newReview = {
      id: Date.now(),
      text: review.trim(),
      rating: rating, //
      likes: 0,
      dislikes: 0,
    };

    existingReviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(existingReviews));

    alert('리뷰가 저장되었습니다!');
    setReview('');
    setRating(0); //
    navigate('/review');
  };

  return (
    <div className="review-form-container">
      <h3 className="review-title">리뷰 쓰기</h3>

      <form className="review-write-container" onSubmit={handleReviewSubmit}>
        <img src="/src/images/profile.png" alt="Profile" />
        <div className="review-input">
          <div className="star-rating">
            {/* 별점 선택 영역 */}
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className={`star ${starValue <= rating ? 'selected' : ''}`}
                  onClick={() => setRating(starValue)}
                />
              );
            })}
          </div>

          <textarea placeholder="리뷰를 입력하세요..." value={review} onChange={(e) => setReview(e.target.value)} />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default ReviewForm;
