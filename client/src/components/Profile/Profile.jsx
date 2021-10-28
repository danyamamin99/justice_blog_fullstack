import React from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

import getUser from "../../services/getUser";
import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();
  const { f_name, l_name, avatar, description } = getUser();
  const validationSchema = yup.object().shape({
    f_name: yup
      .string()
      .min(3, "Must be more than 3 characters.")
      .required("Please enter a first name."),
    l_name: yup
      .string()
      .min(3, "Must be more than 3 characters.")
      .required("Please enter a last name."),
    description: yup
      .string()
      .min(50, "Must be between 50 and 120 characters.")
      .max(120, "Must be between 50 and 120 characters.")
      .required("Please enter a description."),
  });

  const onSubmitForm = ({ f_name, l_name, description }) => {
    const users = JSON.parse(localStorage.getItem("ALL_USERS"));

    users.forEach((user) => {
      if (user.id === id) {
        user.f_name = f_name;
        user.l_name = l_name;
        user.description = description;
      }
    });

    localStorage.setItem("ALL_USERS", JSON.stringify(users));
    console.log("Successfully");
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="profile__wrapper">
          <Formik
            initialValues={{
              f_name,
              l_name,
              description,
            }}
            validateOnBlur
            onSubmit={(values) => onSubmitForm(values)}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty,
            }) => (
              <form className="profile__form">
                <div className="profile__form-avatar">
                  <div className="profile__form-avatar__block">
                    <img
                      className="profile__form-avatar__img"
                      src={avatar}
                      alt="user-avatar"
                    />
                    {avatar.includes("userPhoto") ? (
                      <>
                        <input
                          className="profile__form-avatar__input"
                          type="file"
                          id="file"
                          name="avatar"
                        />
                        <label
                          className="profile__form-avatar__label"
                          htmlFor="file"
                        >
                          Change photo
                        </label>
                      </>
                    ) : (
                      <>
                        <input
                          className="profile__form-avatar__input"
                          type="file"
                          id="file"
                          name="avatar"
                        />
                        <label
                          className="profile__form-avatar__label"
                          htmlFor="file"
                        >
                          Upload photo
                        </label>
                      </>
                    )}
                    <p
                      className={`profile__form-avatar__btn ${
                        avatar.includes("userPhoto") ? " " : " not_visible"
                      }`}
                    >
                      Delete photo
                    </p>
                  </div>
                </div>
                <div className="profile__form-info">
                  <div className="profile__form-info__block">
                    <p>
                      <label
                        className="profile__form-info__label"
                        htmlFor="f_name"
                      >
                        First name
                      </label>
                      <input
                        className="profile__form-info__input"
                        type="text"
                        name="f_name"
                        id="f_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.f_name}
                      />
                      {touched.f_name && errors.f_name && (
                        <span className="profile__form-info__error">
                          {errors.f_name}
                        </span>
                      )}
                    </p>
                    <p>
                      <label
                        className="profile__form-info__label"
                        htmlFor="l_name"
                      >
                        Last name
                      </label>
                      <input
                        className="profile__form-info__input"
                        type="text"
                        name="l_name"
                        id="l_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.l_name}
                      />
                      {touched.l_name && errors.l_name && (
                        <span className="profile__form-info__error">
                          {errors.l_name}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="profile__form-info__block">
                    <p>
                      <label
                        className="profile__form-info__label"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        className="profile__form-info__textarea"
                        name="description"
                        id="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      {touched.description && errors.description && (
                        <span className="profile__form-info__error">
                          {errors.description}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="profile__form-info__block">
                    <button
                      className="profile__form-info__btn"
                      type="submit"
                      disabled={!isValid && !dirty}
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
