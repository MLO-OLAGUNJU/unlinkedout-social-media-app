import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FaHandsClapping } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticleAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleclick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} />
            ) : (
              <img src="images/user.svg" alt="" />
            )}
            <button
              disabled={props.loading ? true : false}
              onClick={handleclick}
            >
              Start a post
            </button>
          </div>

          <div>
            <button>
              <img src="/images/photo-icon.png" alt="photo-icon" />
              <span>Photo</span>
            </button>

            <button>
              <img src="/images/video-icon.png" alt="video-icon" />
              <span>Video</span>
            </button>

            <button>
              <img src="/images/event-icon.png" alt="event" />
              <span>Event</span>
            </button>

            <button>
              <img src="/images/article-icon.png" alt="article" />
              <span>Write article</span>
            </button>
          </div>
        </ShareBox>
        {!props.articles ? (
          <p style={{ textAlign: "center", margin: "50px" }}>
            There are no posts
          </p>
        ) : (
          <Content>
            {props.loading && <img src={"/images/spin-loading.gif"} />}
            {props.articles &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharecActor>
                    <a>
                      <img src={props.article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <BsThreeDots />
                    </button>
                  </SharecActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.SharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        <img src={article.SharedImg} alt="shared-image" />
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <BiSolidLike color="#0a66c2" />
                        <FaHandsClapping color="green" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>2 comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <BiLike color="#0a66c2" />
                      <span>Like</span>
                    </button>
                    <button>
                      <FaRegComment color="#0a66c2" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <FaShare color="#0a66c2" />
                      <span>Share</span>
                    </button>
                    <button>
                      <LuSend color="#0a66c2" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
        <PostModal showModal={showModal} handleclick={handleclick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    img {
      width: 30px;
    }
    button {
      cursor: pointer;
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 35px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    img {
      cursor: pointer;
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharecActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    cursor: pointer;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        cursor: pointer;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba (0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  cursor: pointer;
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    cursor: pointer;
    button {
      cursor: pointer;
      display: flex;
      background-color: transparent;
      border: none;
      gap: 3px;
    }
  }
`;
const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: flex;
    background-color: transparent;
    gap: 5px;
    border: none;
    align-items: center;
    padding: 8px 20px;
    color: #0a66c2;
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 5px;
    }
    @media (min-width: 768px) {
      /* span {
        margin-left: 8px;
      } */
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

// Map state and dispatch to props
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    user: state.user,
    articles: state.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI()),
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(Main);
