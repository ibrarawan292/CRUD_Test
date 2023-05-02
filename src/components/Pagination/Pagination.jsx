import React, { useContext, useState } from "react";
import "./PaginationButtons.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FaAngleRight,
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
// import  { useStateContext } from "../../contexts/ContextProvider";
import { ThemeContext } from "../../App";

const Pagination = (props) => {
  // console.log(props, "pafffff")
  const { DarkMode, setDarkMode } = useContext(ThemeContext);

  var numbers = 0;
  var page = -props.NumberOfRecordsPerPage;
  var onlyNumbers = /^\d+$/;
  var ValidatedString = props.goto.match(onlyNumbers);

  const maxNo = () => {
    var num = 0;
    for (var i = 1; i <= 5; i++) {
      if ((props.totalRecords - i) % 5 === 0) num = props.totalRecords - i;
    }

    props.setCurrentPage(props.totalPages);
    props.setRecord((props.totalPages - 1) * props.NumberOfRecordsPerPage);
  };

  return (
    <>
      <div className="main-pagination">
        {/* {console.log(
          props.record - props.NumberOfRecordsPerPage < 0,
          "-----------Flag",
          props.record,
          "------",
          props.NumberOfRecordsPerPage
        )} */}
        <button
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill5)",
                  color: "var(--txtColor2)",
                }
              : {
                  backgroundColor: "var(--bg-fill6)",
                }
          }
          className="btn-hover3 lg:p-3 sm:p-2 md:p-3 p-3 rounded-md mx-1"
          disabled={props.record - props.NumberOfRecordsPerPage < 0}
          onClick={() => {
            props.setRecord(0);
            props.setCurrentPage(1);
          }}
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill5)",
                  color: "var(--txtColor2)",
                }
              : {
                  backgroundColor: "var(--bg-fill6)",
                }
          }
          className="btn-hover3 lg:p-3 sm:p-2 md:p-3 p-3 rounded-md mx-1"
          disabled={props.record - props.NumberOfRecordsPerPage < 0}
          onClick={() => {
            props.setRecord(props.record - props.NumberOfRecordsPerPage);
            props.setCurrentPage(props.currentPage - 1);
          }}
        >
          <FaAngleLeft />
        </button>

        {[...Array(props.totalPages)].map(
          (i) => (
            (page = page + props.NumberOfRecordsPerPage),
            (numbers = numbers + 1),
            numbers === props.currentPage ? (
              <>
                {numbers === props.totalPages && props.totalPages > 2 ? (
                  <button
                    style={
                      DarkMode === true
                        ? {
                            backgroundColor: "var(--bg-fill5)",
                            color: "var(--txtColor2)",
                          }
                        : {
                            backgroundColor: "var(--bg-fill6)",
                          }
                    }
                    className="btn-hover3 lg:p-3 sm:p-2 sm:lg:p-3 p-3 rounded-md mx-1"
                    value={page - props.NumberOfRecordsPerPage * 2}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value));
                      props.setCurrentPage(parseInt(e.target.innerText));
                    }}
                  >
                    {numbers - 2}
                  </button>
                ) : null}

                {numbers !== 1 ? (
                  <button
                    style={
                      DarkMode === true
                        ? {
                            backgroundColor: "var(--bg-fill5)",
                            color: "var(--txtColor2)",
                          }
                        : {
                            backgroundColor: "var(--bg-fill6)",
                          }
                    }
                    className="btn-hover3 lg:p-3  sm:p-2 p-3 rounded-md mx-1"
                    value={page - props.NumberOfRecordsPerPage}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value));
                      props.setCurrentPage(parseInt(e.target.innerText));
                    }}
                  >
                    {numbers - 1}
                  </button>
                ) : null}

                <button
                  style={
                    DarkMode === true
                      ? {
                          backgroundColor: "var(--bg-fill5)",
                          color: "var(--txtColor2)",
                        }
                      : {
                          backgroundColor: "var(--bg-fill6)",
                        }
                  }
                  className="btn-hover3 lg:p-3 sm:p-2 md:p-3 p-3 rounded-md mx-1"
                  disabled={props.currentPage === numbers ? true : false}
                  value={page}
                  onClick={(e) => {
                    props.setRecord(parseInt(e.target.value));
                    props.setCurrentPage(parseInt(e.target.innerText));
                  }}
                >
                  {numbers}
                </button>

                {numbers < props.totalPages ? (
                  <button
                    style={
                      DarkMode === true
                        ? {
                            backgroundColor: "var(--bg-fill5)",
                            color: "var(--txtColor2)",
                          }
                        : {
                            backgroundColor: "var(--bg-fill6)",
                          }
                    }
                    className="btn-hover3 lg:p-3 md:p-3 sm:p-2 rounded-md mx-1 p-3"
                    disabled={
                      props.record + props.NumberOfRecordsPerPage >
                      props.totalRecords
                    }
                    value={page + props.NumberOfRecordsPerPage}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value));
                      props.setCurrentPage(parseInt(e.target.innerText));
                    }}
                  >
                    {numbers + 1}
                  </button>
                ) : null}

                {numbers === 1 && props.totalPages > 2 ? (
                  <button
                    style={
                      DarkMode === true
                        ? {
                            backgroundColor: "var(--bg-fill5)",
                            color: "var(--txtColor2)",
                          }
                        : {
                            backgroundColor: "var(--bg-fill6)",
                          }
                    }
                    className="btn-hover3 lg:p-3 sm:p-2 md:p-3 p-3 rounded-md mx-1"
                    value={page + props.NumberOfRecordsPerPage * 2}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value));
                      props.setCurrentPage(parseInt(e.target.innerText));
                    }}
                  >
                    {numbers + 2}
                  </button>
                ) : null}

                {props.totalPages > 2 &&
                props.currentPage + 2 < props.totalPages ? (
                  <button
                    style={
                      DarkMode === true
                        ? {
                            backgroundColor: "var(--bg-fill5)",
                            color: "var(--txtColor2)",
                          }
                        : {
                            backgroundColor: "var(--bg-fill6)",
                          }
                    }
                    className="btn-hover3 lg:p-3 sm:p-2 md:p-3 p-3 rounded-md mx-1"
                    value={page + props.NumberOfRecordsPerPage * 3}
                    onClick={(e) => {
                      props.setRecord(parseInt(e.target.value));
                      props.setCurrentPage(props.currentPage + 3);
                    }}
                  >
                    ...
                  </button>
                ) : null}
              </>
            ) : null
          )
        )}

        <button
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill5)",
                  color: "var(--txtColor2)",
                }
              : {
                  backgroundColor: "var(--bg-fill6)",
                }
          }
          className="btn-hover3 lg:p-3 sm:p-2 md:p-3 p-3 rounded-md mx-1"
          disabled={
            props.record + props.NumberOfRecordsPerPage >= props.totalRecords
          }
          onClick={() => {
            props.setRecord(props.record + props.NumberOfRecordsPerPage);
            props.setCurrentPage(props.currentPage + 1);
          }}
        >
          <FaAngleRight />
        </button>

        <button
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill5)",
                  color: "var(--txtColor2)",
                }
              : {
                  backgroundColor: "var(--bg-fill6)",
                }
          }
          className="btn-hover3 lg:p-3 sm:p-2 md:p-3 p-3 rounded-md mx-1"
          disabled={
            props.record + props.NumberOfRecordsPerPage >= props.totalRecords
          }
          onClick={() => {
            maxNo();
          }}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
      <div
        style={
          DarkMode === true
            ? {
                color: "var(--txtColor2)",
              }
            : {
                color: "var(--txtColor1)",
              }
        }
        className="flex items-center lg:ml-2 sm:ml-0 md:ml-4"
      >
        <p className="mb-0 mr-1">Go to: </p>
        <form
          onSubmit={(e) => {
            if (!ValidatedString) {
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div
                      style={{
                        borderRadius: "25px",
                      }}
                      className="text-center shadow p-5 bg-white rounded"
                    >
                      <h1>Oops! Only numbers are allowed.</h1>
                      <p>Please enter valid page number.</p>
                      <button
                        style={
                          DarkMode === true
                            ? {
                                backgroundColor: "var(--bg-fill5)",
                                color: "var(--txtColor2)",
                              }
                            : {
                                backgroundColor: "var(--bg-fill6)",
                              }
                        }
                        className="btn-hover3 px-5 py-3 rounded-md my-3"
                        onClick={onClose}
                      >
                        Go Back
                      </button>
                    </div>
                  );
                },
              });
            } else if (props.goto === "") {
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div
                      style={{
                        borderRadius: "25px",
                      }}
                      className=" text-center shadow-lg p-5 bg-white"
                    >
                      <h1>Oops! Page Doesn't Exist.</h1>
                      <p>Please enter valid page number.</p>
                      <button
                        style={
                          DarkMode === true
                            ? {
                                backgroundColor: "var(--bg-fill5)",
                                color: "var(--txtColor2)",
                              }
                            : {
                                backgroundColor: "var(--bg-fill6)",
                              }
                        }
                        className="btn-hover3 px-5 py-3 rounded-md my-3"
                        onClick={onClose}
                      >
                        Go Back
                      </button>
                    </div>
                  );
                },
              });
            } else if (props.goto > props.totalPages || props.goto <= 0) {
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div
                      style={{
                        borderRadius: "25px",
                      }}
                      className="text-center shadow p-5 bg-white rounded"
                    >
                      <h1>Oops! Page Doesn't Exist.</h1>
                      <p>Please enter valid page number.</p>
                      <button
                        style={
                          DarkMode === true
                            ? {
                                backgroundColor: "var(--bg-fill5)",
                                color: "var(--txtColor2)",
                              }
                            : {
                                backgroundColor: "var(--bg-fill6)",
                              }
                        }
                        className="btn-hover3 px-5 py-3 rounded-md my-3"
                        onClick={onClose}
                      >
                        Go Back
                      </button>
                    </div>
                  );
                },
              });
            } else if (props.totalPages !== 1) {
              if (parseInt(props.goto) === props.totalPages) {
                console.log("called");
                maxNo();
              } else {
                props.setRecord(
                  props.NumberOfRecordsPerPage * parseInt(props.goto) -
                    props.NumberOfRecordsPerPage
                );
                props.setCurrentPage(parseInt(props.goto));
              }
            }

            e.preventDefault();
          }}
        >
          <input
            className={
              DarkMode === true
                ? "ml-1 mr-1 shadow-sm rounded text-gray-600"
                : "ml-1 mr-1 shadow-sm rounded border border-black"
            }
            style={{
              width: "30pt",
              textAlign: "center",
            }}
            value={props.goto}
            onChange={(e) => props.setGoto(e.target.value)}
          />
        </form>

        <small className="ms-2">
          {props.currentPage} / {props.totalPages}
        </small>
      </div>
    </>
  );
};
export default Pagination;
