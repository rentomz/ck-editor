import React, { Component } from "react";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import {
//   CCard,
//   CCardBody,
//   CCol,
//   CFormGroup,
//   CInput,
//   CInputFile,
//   CLabel,
//   CRow,
// } from "@coreui/react";

export class ArtikelInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      error: {},
    };
  }

  handleCKeditorState = (event, editor) => {
    const data = editor.getData();
    this.setState({
      content: data,
    });
    console.log(data);
    // const content = event.target.value;
    // this.setState({ content });
  };

  handleInputArticle = async () => {
    const { title, photo, content, tag } = this.state;
    const data = { title, photo, content, tag };

    await axios({
      method: "post",
      url: "https://kbtvm1.kitabisateknologi.com/g-tour/api/article/store",
      data: data,
      headers: {
        Authorization:
          // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWNjNTZiNjc5NWYwNjdjZGRmYmExYiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTYxNDA1NTA4MX0.p4ofm9Ru3mz66E5tltrV8xkjxEMrpT97fUCifZP0Uyg",
          "Bearer " + localStorage.getItem("jwtToken"),
      },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        window.alert(`Article inserted successfully`);
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          error: err.response.data,
        });
      });
  };
  render() {
    const {  content,  error } = this.state;
    function ErrorTxt(props) {
      const error = props.error;
      if (error) {
        return (
          <div className="alert alert-danger" role="alert">
            {props.error}
          </div>
        );
      }
      return "";
    }
    // console.log(this.state);
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="col">
                  <h1>Tambah Data Artikel</h1>
                </div>
                <div className="container mt-5 mb-3">
                  <label htmlFor="content">Content</label>
                  <CKEditor
                    editor={ClassicEditor}
                    onReady={(editor) => {
                      //this inialiaze our aplication
                    }}
                    // config={{
                    //   ckfinder: {
                    //     uploadUrl: "/upload",
                    //   },
                    // }}
                    onChange={this.handleCKeditorState}
                  />
                  <div className="mt-10">
                    <button
                      className="btn btn-success mr-2"
                      onClick={this.handleInputArticle}
                    >
                      Simpan
                    </button>
                    <a
                      className="btn btn-warning text-white ml-2"
                      href={"/"}
                    >
                      Batal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtikelInput;
