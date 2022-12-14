import React, { Component } from 'react';
// import Outer from './ClothBlogComponents/Outer';
// import Top from './ClothBlogComponents/Top';
// import Bottom from './ClothBlogComponents/Bottom';
import '../../styles/common/App.css';
import styled from 'styled-components';
import '../../styles/common/App.css';
import test1Image from './codyComponent/Outer1.jpg';
import test2Image from './codyComponent/Outer2.jpg';
import test4Image from './codyComponent/Outer4.jpg';
import bottom1 from './Bottom1.jpg';
import bottom2 from './Bottom2.jpg';
import bottom3 from './Bottom3.jpg';
import ClosetService from '../../services/ClosetService';
import ReactPaginate from 'react-paginate';
import AuthService from '../../services/AuthService';
import '../../styles/common/App.css';
const testCody = [
  {
    codyId: 'test-1',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: bottom1,
  },
  {
    codyId: 'test-2',
    outerId: 'outer-1',
    pictureAsFile_outer: test2Image,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: bottom3,
  },
  {
    codyId: 'test-3',
    outerId: 'outer-1',
    pictureAsFile_outer: test4Image,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: bottom2,
  },
];
const Box1 = styled.div`
  width: 950px;
  height: 500px;
  border-radius: 5;
`;
const ClothBox = styled.div`
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  height: 100%;
  overflow-y: scroll;
  background: #c8bee6;
  display: flex;
  // flex-flow: column wrap;
  // flex: column;
  align-content: flex-start;
  justify-content: flex-start;
`;
export default class ClothBasedRecComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    // this.changeCategory = this.changeCategory.bind(this);
    // this.getAllCloths = this.getAllCloths.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveCloth = this.setActiveCloth.bind(this);
    // this.removeAllCloths = this.removeAllCloths.bind(this);
    this.getAllCCodys = this.getAllCCodys.bind(this);
    this.state = {
      codys: [],

      offset: 0,
      perPage: 3,
      currentPage: 0,

      style1: '',
      style2: '',

      userId: '',
      // category: 0,
      // cloths: [],
      // outers: [],
      // tops: [],
      // bottoms: [],
      // currentCloth: null,
      // currentIndex: -1,
    };
  }
  // changeCategory = (categoryIndex) => {
  //   this.setState({ category: categoryIndex });
  // };
  // componentDidMount() {
  //   this.getAllCloths();
  //   this.setCategory();
  // }
  // getAllCloths() {
  //   ClosetService.getAllCloths()
  //     .then((response) => {

  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   this.state.cloths = testCloth;
  // }
  // setCategory() {

  //   this.state.cloths.map((cloth) => {

  //     if (cloth.category == 'outer') {
  //       console.log('?????????');
  //       this.state.outers.push(cloth);

  //     } else if (
  //       cloth.category == 'longSleeve' ||
  //       cloth.category == 'shortSleeve'
  //     ) {
  //       console.log('??????');
  //       this.state.tops.push(cloth);

  //     } else {
  //       console.log('??????');
  //       this.state.bottoms.push(cloth);

  //     }
  //     console.log(this.state.bottoms);
  //   });

  // }
  // refreshList() {
  //   this.getAllCloths();
  //   this.setState({
  //     currentCloth: null,
  //     currentIndex: -1,
  //   });
  // }
  // setActiveCloth(Cloth, index) {
  //   this.setState({
  //     currentCloth: Cloth,
  //     currentIndex: index,
  //   });
  // }
  // removeAllCloths() {
  //   ClosetService.deleteAllCloths()
  //     .then((response) => {
  //       this.refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    // this.setState({ userId: currentUser.id });
    this.state.userId = currentUser.id;

    console.log('id:'+this.state.userId);
    this.getAllCCodys(); //?????? ???????????? ????????????
    // this.paginateCodys(); // ????????? ?????? ???????????? ???????????? pagination??? ????????????
  }
  paginateCodys() {
    const data = this.state.codys;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    const postData = slice.map((cody) => (
      <div key={cody.codyId} style={{ padding: 6 }}>
        <img width="260" height="260" src={cody.pictureAsFile_outer} />
        {/* <img width="150" height="150" src={cody.pictureAsFile_top} /> */}
        <img width="260" height="260" src={cody.pictureAsFile_bottom} />
        {/* <input
          type="checkbox"
          value={cody.codyId} ///?????? ///????????? ????????? ????????? ????????? ???,????????? ???????????? ???
          onChange={this.onChange}
        /> */}
      </div>
    ));

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),

      postData,
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.paginateCodys();
      },
    );
  };

  getAllCCodys() {
    ClosetService.getAllCCodys(this.state.userId)
      .then((res) => {
        const data = res.data;

        console.log(data);
        this.setState((this.state.codys = data));

        this.paginateCodys();
      })
      .catch((e) => {
        console.log(e);
      });

    // this.state.codys.push(response.data) //??????????????? ??????
    // this.setState((this.state.codys = testCody));
    // this.setState((this.state.codyImages = testCloth.pictureAsFile));
    // this.count = testCody.length;

    // console.log(this.count);
  }
  render() {
    return (
      <div
        className="wrap"
        style={{
          background: '#C8BEE6',
          borderRadius: 5,
          margin: 10,
          padding: 10,
          height: '600px',
          width: '1050px',
          fontFamily:'Tenada',
        }}
      >
        <header className="well" style={{ backgroundColor: '#C8BEE6',fontFamily:'Tenada', }}>
          <h3>????????? ??? ?????? ?????? ??????</h3>
        </header>
        {/* <div className="menuBar">
          <ul className="tabs">
            <li
              className={`${this.state.category === 0 ? 'active' : ''}`}
              onClick={() => this.changeCategory(0)}
            >
              ?????????
            </li>
            <li
              className={`${this.state.category === 1 ? 'active' : ''}`}
              onClick={() => this.changeCategory(1)}
            >
              ??????
            </li>
            <li
              className={`${this.state.category === 2 ? 'active' : ''}`}
              onClick={() => this.changeCategory(2)}
            >
              ??????
            </li>

            <button
              style={{ background: 'white', float: 'right' }}
              className="m-3 btn btn-sm "
              onClick={() => this.myRef.current.deleteCheckedCloths()}
            >
              ?????? ??? ??????
            </button>
          </ul>
        </div> */}
        <div className="contentArea">
          {/* {(() => {
            if (this.state.category == 0) {
              return <Outer ref={this.myRef} />;
            } else if (this.state.category == 1) {
              return <Top ref={this.myRef} />;
            } else {
              return <Bottom ref={this.myRef} />;
            }
          })()} */}
          <Box1>
            <ClothBox>{this.state.postData}</ClothBox>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </Box1>
        </div>
      </div>
    );
  }
}
