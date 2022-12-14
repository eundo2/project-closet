import React, { Component } from 'react';
import ClosetService from '../../services/ClosetService';
import { uniqueId } from 'lodash';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import OuterModalComponent from './OuterModalComponent';
import TopModalComponent from './TopModalComponent';
import BottomModalComponent from './BottomModalComponent';
import test1Image from './Outer1.jpg';
import test2Image from './Outer2.jpg';
import test4Image from './Outer4.jpg';

const testOuter = {
  id: 'test-1',
  category: 'outer',
  color: 'red',
  pictureAsFile: test1Image,
};
const testTop = {
  id: 'test-2',
  category: 'outer',
  color: 'black',
  pictureAsFile: test2Image,
};
const testBottom = {
  id: 'test-4',
  category: 'outer',
  color: 'white',
  pictureAsFile: test4Image,
};

export default class CodyAddComponent extends Component {
  constructor(props) {
    super(props);

    this.outerRef = React.createRef();
    this.topRef = React.createRef();
    this.bottomRef = React.createRef();

    this.setOuter = this.setOuter.bind(this);
    this.setTop = this.setTop.bind(this);
    this.setBottom = this.setBottom.bind(this);

    this.saveCody = this.saveCody.bind(this);
    this.newCody = this.newCody.bind(this);

    // this.onClickOuterButton = this.onClickOuterButton.bind(this);
    // this.onClickTopButton = this.onClickTopButton.bind(this);
    // this.onClickBottomButton = this.onClickBottomButton(this);
    // this.onCloseOuterModal = this.onClickOuterButton(this);
    // this.onCloseTopModal = this.onCloseTopModal(this);
    // this.onCloseBottomModal = this.onCloseBottomModal(this);

    this.state = {
      codyId: null,

      outerId: null,
      topId: null,
      bottomId: null,

      outer: null,
      top: null,
      bottom: null,

      outerPreview: '',
      outerAsFile: '',
      topPreview: '',
      topAsFile: '',
      bottomPreview: '',
      bottomAsFile: '',

      submitted: false,

      openOuterModal: false,
      openTopModal: false,
      openBottomModal: false,
    };
  }

  saveCody(e) {
    e.preventDefault();

    if (
      this.state.outerId == null ||
      this.state.topId == null ||
      this.state.bottomId == null
    ) {
      alert('?????????, ??????, ????????? ?????? ????????? ???????????????');
    } else {
      alert('????????? ?????????????????????!');
      const testCody = {
        codyId: null,
        outerId: null,
        topId: null,
        bottomId: null,
      };
      // this.setState({codyId : uniqueId('cody-')});
      testCody.codyId = uniqueId('cody-');
      testCody.outerId = this.state.outerId;
      testCody.topId = this.state.topId;
      testCody.bottomId = this.state.bottomId;
      // testCody.push(this.state.codyId);
      // testCody.push(this.state.outerId);
      // testCody.push(this.state.topId);
      // testCody.push(this.state.bottomId);
      console.log(testCody);

      ClosetService.createCody(testCody)

        .then((response) => {
          console.log(response.data);
          this.setState({
            submitted: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  onClickOuterButton = (e) => {
    e.preventDefault();
    this.setState({ openOuterModal: true });
  };
  onClickTopButton = (e) => {
    e.preventDefault();
    this.setState({ openTopModal: true });
  };
  onClickBottomButton = (e) => {
    e.preventDefault();
    this.setState({ openBottomModal: true });
  };
  onCloseOuterModal = () => {
    this.setState({ openOuterModal: false });
  };
  onCloseTopModal = () => {
    this.setState({ openTopModal: false });
  };
  onCloseBottomModal = () => {
    this.setState({ openBottomModal: false });
  };

  newCody() {
    this.setState({
      id: null,
      outerId: null,
      topId: null,
      bottomId: null,

      outer: null,
      top: null,
      bottom: null,

      outerPreview: '',
      outerAsFile: '',
      topPreview: '',
      topAsFile: '',
      bottomPreview: '',
      bottomAsFile: '',

      submitted: false,
    });

    console.log(this.state.outerId);
    console.log(this.state.topId);
    console.log(this.state.bottomId);
  }
  setOuter = () => {
    const outerelement = this.outerRef.current;
    const cid = outerelement.state.checkedId;
    // console.log(cid);
    this.setState({ outerId: cid }, () => {
      console.log(this.outerId);

      if (this.state.outerId == null) {
        alert('????????? ???????????? ?????? ???????????????');
      } else {
        console.log(this.state.outerId);
        // alert('????????? ???????????? ?????????????????????!');
        this.setState({ openOuterModal: false });
        ClosetService.getAOuter(this.state.outerId)
          .then((res) => {
            const data = res.data;
          })
          .catch((e) => {
            console.log(e);
          });

        this.setState((this.state.outer = testOuter));

        console.log(this.state.outer);
        // console.log(this.state.outer.pictureAsFile);
      }
    });
  };
  //????????? test ???????????? ??????
  // ?????????,??????,?????? ?????? ????????? ????????? ?????? ????????? ????????? ???????????? ????????? ???????????? ?????????
  setTop = () => {
    const topelement = this.topRef.current;
    const cid = topelement.state.checkedId;
    console.log(cid);
    this.setState({ topId: cid }, () => {
      if (this.state.topId == null) {
        alert('????????? ????????? ?????? ???????????????');
      } else {
        console.log(this.state.topId);
        // alert('????????? ????????? ?????????????????????!');
        this.setState({ openTopModal: false });
        ClosetService.getATop(this.state.topId)
          .then((res) => {
            const data = res.data;
          })
          .catch((e) => {
            console.log(e);
          });

        this.setState((this.state.top = testTop));

        console.log(this.state.top);
        // console.log(this.state.top.pictureAsFile);
      }
    });
  };
  setBottom = () => {
    const bottomelement = this.bottomRef.current;
    const cid = bottomelement.state.checkedId;
    console.log(cid);
    this.setState({ bottomId: cid }, () => {
      if (this.state.bottomId == null) {
        alert('????????? ????????? ?????? ???????????????');
      } else {
        console.log(this.state.bottomId);
        // alert('????????? ????????? ?????????????????????!');
        this.setState({ openBottomModal: false });
        ClosetService.getABottom(this.state.bottomId)
          .then((res) => {
            const data = res.data;
          })
          .catch((e) => {
            console.log(e);
          });

        this.setState((this.state.bottom = testBottom));

        console.log(this.state.bottom);
        // console.log(this.state.bottom.pictureAsFile);
      }
    });
  };

  render() {
    let outerPreview = null;
    let topPreview = null;
    let bottomPreview = null;

    if (this.state.outer != null) {
      outerPreview = (
        <img src={this.state.outer.pictureAsFile} width={130} height={260} />
      );
    }
    if (this.state.top != null) {
      topPreview = (
        <img src={this.state.top.pictureAsFile} width={130} height={130} />
      );
    }
    if (this.state.bottom != null) {
      bottomPreview = (
        <img src={this.state.bottom.pictureAsFile} width={130} height={130} />
      );
    }
    return (
      <div
        className="submit-form"
        style={{
          borderRadius: 5,
          backgroundColor: '#C8BEE6',
          color: 'white',
          textAlign: 'center',
          margin: 10,
          padding: 10,
          height: '550px',
          width: '300px',
        }}
      >
        {this.state.submitted ? (
          <div>
            <h4>?????? ?????? ??????!</h4>
            <button
              className="btn btn-success"
              onClick={this.newCody}
              style={{
                borderColor: 'white',
                color: 'black',
                backgroundColor: 'white',
              }}
            >
              ?????? ?????? ??????
            </button>
          </div>
        ) : (
          <div>
            <h3>?????? ??????</h3>
            {/* formdata post ??? ??? ?????? ?????? */}
            <form action="/cody" method="post" encType="multipart/form-data">
              {/* ?????? */}
              <div className="form-group">
                <label
                  htmlFor="outer"
                  // style={{
                  //   marginTop: 5,
                  // }}
                >
                  <button
                    style={{
                      // backgroundColor: '#C8BEE6',
                      borderColor: 'white',
                      // color: 'black',
                      // backgroundColor: 'white',
                      // borderRadius: 5,
                    }}
                    onClick={this.onClickOuterButton}
                  >
                    ????????? ??????
                  </button>
                  <Modal
                    open={this.state.openOuterModal}
                    onClose={this.onCloseOuterModal}
                  >
                    <h2>???????????? ???????????????</h2>
                    <OuterModalComponent ref={this.outerRef} />
                    <button
                      style={{
                        marginTop: 10,

                        backgroundColor: '#C8BEE6',
                        borderColor: 'white',
                        color: 'black',

                        float: 'right',
                      }}
                      className="btn btn-success"
                      onClick={() => this.setOuter()}
                    >
                      ????????? ?????? ??????
                    </button>
                  </Modal>
                  {/* ????????? ?????? ????????? */}
                </label>
              </div>

              <div className="form-group">
                <label
                  htmlFor="top"
                  // style={{
                  //   marginTop: 5,
                  // }}
                >
                  <button
                    style={{
                      // backgroundColor: '#C8BEE6',
                      borderColor: 'white',
                      // color: 'black',
                      // backgroundColor: 'white',
                      // borderRadius: 5,
                    }}
                    onClick={this.onClickTopButton}
                  >
                    ?????? ??????
                  </button>
                  <Modal
                    open={this.state.openTopModal}
                    onClose={this.onCloseTopModal}
                  >
                    <h2>????????? ???????????????</h2>
                    <TopModalComponent ref={this.topRef} />
                    <button
                      style={{
                        marginTop: 10,
                        backgroundColor: '#C8BEE6',
                        borderColor: 'white',
                        color: 'black',

                        float: 'right',
                      }}
                      className="btn btn-success"
                      onClick={() => this.setTop()}
                    >
                      ?????? ?????? ??????
                    </button>
                  </Modal>
                  {/* ?????? ?????? ????????? */}
                </label>
              </div>

              <div className="form-group">
                <label
                  htmlFor="bottom"
                  // style={{
                  //   marginTop: 5,
                  // }}
                >
                  <button
                    style={{
                      // backgroundColor: '#C8BEE6',
                      borderColor: 'white',
                      // color: 'black',
                      // backgroundColor: 'white',
                      // borderRadius: 5,
                    }}
                    onClick={this.onClickBottomButton}
                  >
                    ?????? ??????
                  </button>
                  <Modal
                    open={this.state.openBottomModal}
                    onClose={this.onCloseBottomModal}
                  >
                    <h2>????????? ???????????????</h2>
                    <BottomModalComponent ref={this.bottomRef} />
                    <button
                      style={{
                        marginTop: 10,
                        backgroundColor: '#C8BEE6',
                        borderColor: 'white',
                        color: 'black',

                        float: 'right',
                      }}
                      className="btn btn-success"
                      onClick={() => this.setBottom()}
                    >
                      ?????? ?????? ??????
                    </button>
                  </Modal>
                  {/* ?????? ?????? ????????? */}
                </label>
              </div>
            </form>

            <div
              style={{
                width: 260,
                height: 260,

                margin: 12,
              }}
            >
              <div style={{ display: 'inline-flex' }}>
                <div
                  style={{
                    width: 130,
                    height: 260,

                    outline: 'solid 5px white',
                  }}
                >
                  {outerPreview}
                </div>
                <div style={{ display: 'inline-block' }}>
                  <div
                    style={{
                      width: 130,
                      height: 130,

                      outline: 'solid 5px white',
                    }}
                  >
                    {topPreview}
                  </div>
                  <div
                    style={{
                      width: 130,
                      height: 130,

                      outline: 'solid 5px white',
                    }}
                  >
                    {bottomPreview}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={this.saveCody}
              className="btn btn-success"
              style={{
                borderColor: 'white',
                color: 'black',
                backgroundColor: 'white',
              }}
            >
              ??????
            </button>
          </div>
        )}
      </div>
    );
  }
}
