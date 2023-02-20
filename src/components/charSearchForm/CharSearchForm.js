import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./CharSearchFrom.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useQuery } from "@apollo/client";
import { FIND_ALL_CHARS } from "../../gql/queries";

const CharSearchForm = () => {
  const [charId, setCharId] = useState(null);
  const [nameChar, setNameChar] = useState(null);
  const { data } = useQuery(FIND_ALL_CHARS, {
    variables: { query: { skip: 0, take: 1000 } },
  });
  console.log(data);

  const searchChar = (name) => {
    const charName = data.findAllCharacters.items.find(
      (item) => {
        return item.name.toLowerCase() === name.toLowerCase()
    });
    if (charName) {
        setNameChar(charName.name);
        setCharId(charName.id);
    }else {
      setCharId('notFound')
    }
  };

  const errorMessage =
    process === "error" ? (
      <div className="char__search-critical-error">
        <ErrorMessage />
      </div>
    ) : null;
  const results =
    !charId ? null : nameChar ?
      <div className="char__search-wrapper">
        <div className="char__search-success">
          There is! Visit {nameChar} page?
        </div>
        <Link to={`/characters/${charId}`} className="button button__secondary">
          <div className="inner">To page</div>
        </Link>
      </div>
     :
      <div className="char__search-error">
        The character was not found. Check the name and try again
      </div>
    ;

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{ charName: "" }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          searchChar(charName);
        }}
      >
        <Form>
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button
              type="submit"
              className="button button__main"
              disabled={process === "loading"}
            >
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage
            name="charName"
            className="char__search-error"
            component="div"
          />
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
};

export default CharSearchForm;
