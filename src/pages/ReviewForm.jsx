import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ReviewForm.css'; 

const ReviewForm = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [nickname, setNickname] = useState('');  // State to store nickname
  const navigate = useNavigate();

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Validate that both the review text, rating, and nickname are provided
    if (review.trim() === '' || rating === 0 || nickname.trim() === '') {
      alert('별점, 닉네임과 리뷰 내용을 입력해주세요!');
      return;
    }

    let existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Create a new review object with the nickname, review text, rating, and votes
    const newReview = {
      id: Date.now(),
      username: nickname.trim(),  // Save the nickname
      text: review.trim(),
      rating: rating,
      likes: 0,
      dislikes: 0,
    };

    // Add the new review to the existing reviews
    existingReviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(existingReviews));

    alert('리뷰가 저장되었습니다!');
    
    // Reset the state for review, rating, and nickname
    setReview('');
    setRating(0);
    setNickname('');  // Reset the nickname field

    // Navigate to the reviews page
    navigate('/review');
  };

  return (
    <div className="review-form-container">
      <h3 className="review-title">리뷰 쓰기</h3>

      <form className="review-write-container" onSubmit={handleReviewSubmit}>
        {/* Profile Picture (optional, can be replaced with dynamic image later) */}
        <img src="/src/images/none.png" alt="Profile" />
        
        <div className="review-input">
          {/* Wrap Nickname Input and Star Rating in a container */}
          <div className="nickname-rating-container">
            {/* Nickname Input */}
            <input 
              type="text" 
              placeholder="닉네임을 입력하세요"
              value={nickname} 
              onChange={(e) => setNickname(e.target.value)} 
            />
            
            <span className="star-rating">
              {/* Star Rating */}
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
            </span>
          </div>

          {/* Review Textarea */}
          <textarea 
            placeholder="리뷰를 입력하세요..." 
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
          />
        </div>

        {/* Submit Button */}
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default ReviewForm;
