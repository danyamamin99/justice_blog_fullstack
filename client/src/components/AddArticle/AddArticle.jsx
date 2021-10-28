import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { format } from "date-fns";

import Image_4 from "../../assets/img/image-4.png";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./AddArticle.scss";

const AddArticle = ({ flag, setFlag }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const onEditorStateChange = (editorState) => setEditorState(editorState);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onCategoryChange = (e) => setCategory(e.target.value);

  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(rawContentState);

  const onPublishArticle = () => {
    const articles = JSON.parse(localStorage.getItem("ALL_ARTICLES"));

    const newArticle = {
      id: Date.now().toString(),
      date: format(new Date(), "MMM d"),
      tag: `#${category}`,
      title,
      description: markup,
      count: 6000,
      category,
      image: Image_4,
      id_user: localStorage.getItem("ID_USER"),
    };

    articles.push(newArticle);
    localStorage.setItem("ALL_ARTICLES", JSON.stringify(articles));

    console.log(newArticle);
    setEditorState(EditorState.createEmpty());
    setTitle("");
    setCategory("");
    setFlag(!flag);
  };

  return (
    <div className="add-article">
      <div className="container">
        <div className="add-article__wrapper">
          <h1 className="add-article__title">Add article</h1>
          <div className="add-article__text-editor">
            <Editor
              editorState={editorState}
              placeholder="Enter a post..."
              toolbarClassName="add-article__toolbarClassName"
              wrapperClassName="add-article__wrapperClassName"
              editorClassName="add-article__editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
            <input
              className="add-article__input add-article__input-title"
              type="text"
              name="title"
              placeholder="Enter a title"
              onChange={onTitleChange}
              value={title}
            />
            <input
              className="add-article__input add-article__input-category"
              type="text"
              name="category"
              placeholder="Enter the category name..."
              onChange={onCategoryChange}
              value={category}
            />
          </div>
          <button
            className="add-article__btn add-article__btn-publish"
            onClick={onPublishArticle}
          >
            Publish an article
          </button>
        </div>
      </div>
    </div>
  );
};

// <div dangerouslySetInnerHTML={{ __html: markup }} />

export default AddArticle;
