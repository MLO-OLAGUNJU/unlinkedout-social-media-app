import React from "react";
import styled from "styled-components";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FaHandsClapping } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

const Main = (props) => {
  return (
    <Container>
      <ShareBox>
        <div>
          <img src="images/user.svg" alt="" />
          <button>Start a post</button>
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
      <div>
        <Article>
          <SharecActor>
            <a>
              <img src="images/user.svg" alt="" />
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <BsThreeDots />
            </button>
          </SharecActor>
          <Description>Description</Description>
          <SharedImg>
            <a>
              <img src="images/shared-img.png" alt="shared-image" />
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
      </div>
    </Container>
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
        width: 48px;
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
export default Main;
