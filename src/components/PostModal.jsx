import React, { useState } from "react";
import styled from "styled-components";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const reset = (e) => {
    setEditorText("");
    props.handleclick(e);
  };
  return (
    <>
      {props.showModal === "open" && (
        <div>
          <Container>
            <Content>
              <Header>
                <h2>Create a post</h2>
                <button onClick={(event) => reset(event)}>
                  <img src="/images/close-icon.png" alt="" />
                </button>
              </Header>
              <SharedContent>
                <UserInfo>
                  <img src="/images/user.svg" alt="" />
                  <span>name</span>
                </UserInfo>
                <Editor>
                  <textarea
                    value={editorText}
                    placeholder="what did you want to talk about"
                    autoFocus={true}
                    onChange={(e) => setEditorText(e.target.value)}
                  ></textarea>
                </Editor>
              </SharedContent>
              <ShareCreation>
                <Attachassets>
                  <AssetButton>
                    <img src="images/shared-img.png" alt="" />
                  </AssetButton>
                  <AssetButton>
                    <img src="images/shared-vid.png" alt="" />
                  </AssetButton>
                </Attachassets>
                <ShareCommentComponent>
                  <AssetButton>
                    <img src="\images\shared-comment.png" alt="" />
                    <span>Anyone</span>
                  </AssetButton>
                </ShareCommentComponent>
                <PostButton>
                  <span>Post</span>
                </PostButton>
              </ShareCreation>
            </Content>
          </Container>
        </div>
      )}
    </>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9000;
  color: black;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  width: 100%;
  max-width: 553px;
  background-color: #fff;
  max-height: 90%;
  overflow: inherit;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);

  button {
    height: 40px;
    width: 40px;
    cursor: pointer;
    min-width: auto;
    background-color: transparent;
    border: none;
    color: rgba(0, 0, 0, 0.15);
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 999px;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const Attachassets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareCommentComponent = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.div`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a66c2;
  color: #fff;
  &:hover {
    background-color: #004182;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 700;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 20px;
    border: none;
  }
`;

export default PostModal;
