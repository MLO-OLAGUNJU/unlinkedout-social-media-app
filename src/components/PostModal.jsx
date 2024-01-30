import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../actions";
import "firebase/auth";
import { storage } from "../firebase";
import { Timestamp } from "firebase/firestore";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  // const postArticle = (e) => {
  //   e.preventDefault();
  //   if (e.target !== e.currentTarget) {
  //     return;
  //   }
  //   const result = {
  //     image: shareImage,
  //     video: videoLink,
  //     user: props.user,
  //     description: editorText,
  //     timestamp: Timestamp.now(), // Use Timestamp.now() directly
  //   };
  //   props.postArticle(result);
  //   reset(e);
  // };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const result = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
    };

    // Call the postArticle action
    props.postArticle(result);

    // Reset the state and close the modal
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleclick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <div>
          <Container /*onClick={(event) => reset(event)}*/>
            <Content>
              <Header>
                <h2>Create a post</h2>
                <button onClick={(event) => reset(event)}>
                  <img src="/images/close-icon.png" alt="" />
                </button>
              </Header>
              <SharedContent>
                <UserInfo>
                  {props.user.photoURL ? (
                    <img src={props.user.photoURL} />
                  ) : (
                    <img src="/images/user.svg" alt="" />
                  )}
                  <span>{props.user.displayName}</span>
                </UserInfo>
                <Editor>
                  <textarea
                    value={editorText}
                    placeholder="What do you want to talk about?"
                    autoFocus={true}
                    onChange={(e) => setEditorText(e.target.value)}
                  />
                  {assetArea === "image" ? (
                    <UploadImage>
                      <input
                        type="file"
                        accept="image/gif, image/jpeg, image/png"
                        name="image"
                        id="file"
                        style={{ display: "none" }}
                        onChange={handleChange}
                      />
                      <p>
                        <label htmlFor="file">Select an image to share</label>
                      </p>
                      {shareImage && (
                        <img src={URL.createObjectURL(shareImage)} />
                      )}
                    </UploadImage>
                  ) : (
                    assetArea === "media" && (
                      <>
                        <input
                          type="text"
                          placeholder="Please input a video link"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                        />
                        {videoLink && (
                          <ReactPlayer width={"100%"} url={videoLink} />
                        )}
                      </>
                    )
                  )}
                </Editor>
              </SharedContent>
              <ShareCreation>
                <Attachassets>
                  <AssetButton onClick={() => switchAssetArea("image")}>
                    <img src="images/shared-img.png" alt="" />
                  </AssetButton>
                  <AssetButton onClick={() => switchAssetArea("media")}>
                    <img src="images/shared-vid.png" alt="" />
                  </AssetButton>
                </Attachassets>
                <ShareCommentComponent>
                  <AssetButton>
                    <img src="\images\shared-comment.png" alt="" />
                    <span>Anyone</span>
                  </AssetButton>
                </ShareCommentComponent>
                <PostButton
                  disabled={!editorText ? true : false}
                  onClick={(event) => postArticle(event)}
                >
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
  animation: fadeIn 0.3s;
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
  cursor: pointer;
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.3)" : " #0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : " #fff")};
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0,0,0,0.3)" : " #004182"};
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
    /* font-weight: 700; */
    font-family: "Poppins", sans-serif;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
    border: none;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
  label {
    background-color: rgba(0, 0, 0, 0.08);
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
  }
  p {
    margin-bottom: 15px;
  }
`;

// Map state and dispatch to props
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (result) => dispatch(postArticleAPI(result)),
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
