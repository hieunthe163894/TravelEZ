import React, { useState, useEffect, useContext } from 'react';
import '../styles/post.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { formatTime } from '../utils/formatTime';
import CommonSection from '../shared/CommonSection';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { data: initialPosts, loading, error } = useFetch(`${BASE_URL}/posts`);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('likes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const [filter, setFilter] = useState('');
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleLike = (postId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLikes((prevLikes) => {
      const isLiked = !!prevLikes[postId];
      return {
        ...prevLikes,
        [postId]: !isLiked
      };
    });
  };

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const handleSave = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Implement save functionality here
  };


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const sortedPosts = () => {
    if (filter === "recent") {
      return posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return posts;
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event, postId) => {
    event.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!newComment) return;

    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          text: newComment,
          author: user._id,
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? updatedPost : post
          )
        );
        setNewComment('');
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <>
      <CommonSection title={"Bài viết/ Tin tức"} />
      <Container>
        <Row style={{ justifyContent: "center" }}>
          <Col lg="11">
            <div className="select">
              <select name="posts" id="posts" onChange={handleFilterChange}>
                <option value="featured">Nổi bật</option>
                <option value="recent">Gần đây</option>
              </select>
            </div>
            {sortedPosts().map((post, index) => (
              <div className="post_content" key={post._id}>
                <div className="title">
                  <h3>
                    <strong>{post.title}</strong>
                  </h3>
                </div>
                <div className="top-container">
                  <img
                    src={post.author.photo}
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <div className="ml-3">
                    <h5 className="name">{post.author.username}</h5>
                    <small className="text-muted mail">
                      {formatTime(post.createdAt)}
                    </small>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.desc }}></div>
                <img
                  src={post.image[0]}
                  alt="Blog description"
                  className="mb-4"
                  style={{ display: "block", width: "400px", height: "300px" }}
                />
                <div className="tour__reviews mt-1">
                  <label>{likes[post._id] ? post.likes + 1 : post.likes}&nbsp;</label>
                  <i className="ri-thumb-up-line"></i>
                  <div className="interaction">
                    <div className={`like ${likes[post._id] ? 'active' : ''}`} onClick={() => handleLike(post._id)}>
                      <i className="ri-thumb-up-line"></i>
                      <a style={{ marginLeft: "5px" }}>Thích</a>
                    </div>
                    <div className="save" onClick={handleSave}>
                     <i className="ri-file-add-line"></i>
                     <a style={{ marginLeft: "5px" }}>Lưu</a> 
                    </div>
                  </div>
                  <Form onSubmit={(event) => handleCommentSubmit(event, post._id)}>
                    <div className="review__input">
                      <input
                        type="text"
                        placeholder="Bình luận bài viết..."
                        value={newComment}
                        onChange={handleCommentChange}
                        required
                      />
                      <button className="btn primary__btn text-white" type="submit">
                        Gửi
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {post.comments.map((cmt, index) => (
                      <div className="review__item" key={index}>
                        <img
                          src={cmt.author.photo}
                          alt="avatar"
                        />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{cmt.author.username}</h5>
                              <p>{formatTime(cmt.createdAt)}</p>
                            </div>
                          </div>
                          <h5>
                            {cmt.text}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogPost;
