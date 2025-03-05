import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './MovieDetail.css';

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const scrollRef = useRef(null); // 스크롤 이동을 위한 ref 생성
    const [selectedImage, setSelectedImage] = useState(null); // 클릭한 이미지 저장

    useEffect(() => {
        fetch('/movieExplain.json')
            .then((response) => response.json())
            .then((data) => {
                const foundMovie = data.find((m) => m.id === movieId);
                setMovie(foundMovie);
            })
            .catch((error) => console.error('Error loading movie data:', error));
    }, [movieId]);

    if (!movie) {
        return <div>영화를 찾을 수 없습니다.</div>;
    }

    // 스틸컷 좌우 스크롤 함수
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // 이미지 클릭하면 모달 열기
    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    // 모달 닫기
    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="movie-detail-container">
            {/* 상단 예고편 영상 */}
            <div className="trailer-container">
                <iframe
                    width="100%"
                    height="500"
                    src={movie.trailer}
                    title={`${movie.title} 예고편`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 영화 정보 */}
            <div className="movie-info">
                <img className="movie-poster" src={movie.poster} alt={movie.title} />
                <div className="movie-description">
                    <h2>{movie.title}</h2>
                    <p>
                        <strong>{movie.titleEng}</strong>
                    </p>
                    <p>
                        <strong>{movie.information1}</strong>
                    </p>
                    <p>
                        <strong>{movie.information2}</strong>
                    </p>
                    <p>{movie.description}</p>
                </div>
            </div>

            {/* 스틸컷 */}
            <div className="scene-container">
                <h3 classname="scene-title">스틸컷</h3>
                <button className="scene-btn left" onClick={scrollLeft}>
                    <FaChevronLeft />
                </button>

                <div className="scene-list" ref={scrollRef}>
                    {movie.scenes.map((scene, index) => (
                        <img
                            key={index}
                            className="scene-image"
                            src={scene}
                            alt={`Scene ${index + 1}`}
                            onClick={() => openModal(scene)}
                        />
                    ))}
                </div>

                <button className="scene-btn right" onClick={scrollRight}>
                    <FaChevronRight />
                </button>
            </div>

            {/* 이미지 모달 */}
            {selectedImage && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Expanded scene" />
                    </div>
                </div>
            )}

            {/* 출연/배우 */}
            <div className="cast-container">
                <h3 className="cast-title">출연/배우</h3>
                <button className="cast-btn left" onClick={scrollLeft}>
                    <FaChevronLeft />
                </button>

                <div className="cast-list" ref={scrollRef}>
                    {movie.cast.map((cast, index) => (
                        <img key={index} className="cast-image" src={cast} alt={`Cast ${index + 1}`} />
                    ))}
                </div>

                <button className="cast-btn right" onClick={scrollRight}>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default MovieDetail;
