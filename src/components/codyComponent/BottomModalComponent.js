import React, { Component } from 'react';
import '../../styles/common/App.css';
import styled from 'styled-components';
import test1Image from './Outer1.jpg';
import test2Image from './Outer2.jpg';
import test4Image from './Outer4.jpg';
import test5Image from './Outer5.jpg';
import ReactPaginate from 'react-paginate';
import ClosetService from '../../services/ClosetService';
import AuthService from '../../services/AuthService';

const testCloth = [
  {
    id: 'test-1',
    category: 'bottom',
    color: 'red',
    pictureAsFile: test1Image,
  },
  {
    id: 'test-2',
    category: 'bottom',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-4',
    category: 'bottom',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-5',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-6',
    category: 'bottom',
    color: 'red',
    pictureAsFile: test1Image,
  },
  {
    id: 'test-7',
    category: 'bottom',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-8',
    category: 'bottom',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-9',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-10',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-11',
    category: 'bottom',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-12',
    category: 'bottom',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-13',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-14',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-15',
    category: 'bottom',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-16',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-17',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-18',
    category: 'bottom',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-19',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-20',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-21',
    category: 'bottom',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-22',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-23',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-24',
    category: 'bottom',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-25',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-26',
    category: 'bottom',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
];
const Box1 = styled.div`
  width: 800px;
  height: 400px;
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
  flex-flow: row wrap;
  flex: row;
  align-content: flex-start;
  justify-content: flex-start;
`;

class bottomModalComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      cloths: [],
      bottoms: [],
      bottomImages: [],

      offset: 0,
      perPage: 12,
      currentPage: 0,

      checkedId: null,
      checked: false,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    // console.log(user.id);
    this.state.userId = user.id;

    this.getAllBottoms(); //?????? ???????????? ????????????
    // this.setCategory(); //????????? ?????? ?????? ???????????? ???????????? ?????? ????????????
    // this.paginateBottoms(); // ????????? ?????? ???????????? ???????????? pagination??? ????????????
  }
  getAllBottoms() {
    ClosetService.getAllBottoms(this.state.userId)
      .then((res) => {
        const data = res.data;

        this.setState((this.state.bottoms = data));
        this.setState((this.state.bottomImages = data.pictureAsFile));
        this.count = data.length;

        this.paginateBottoms();
      })
      .catch((e) => {
        console.log(e);
      });

    // this.state.bottoms.push(response.data) //??????????????? ??????
    // this.setState((this.state.bottoms = testCloth));
    // this.setState((this.state.bottomImages = testCloth.pictureAsFile));
    // this.count = testCloth.length;

    // console.log(this.count);
  }
  handleChange = (e) => {
    console.log(`????????? ??? : ${e.target.value}`);
    this.setState({ checkedId: e.target.value });
    console.log(this.checkedId);
  };
  deleteCheckedCloths() {
    const deleteList = this.state.checkedList;
    console.log(deleteList);
    ClosetService.deletebottoms(deleteList)
      .then(alert('????????? ?????????????????????!'))
      .catch((e) => {
        console.log(e);
      });
  }

  paginateBottoms() {
    const data = this.state.bottoms;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    const postData = slice.map((bottom) => (
      <div key={bottom.id} style={{ padding: 10 }}>
        <img width="150" height="150" src={bottom.pictureAsFile} />
        <input
          type="radio"
          name="selectedBottom" //radiobutton ????????? ????????? ???????????? ?????????.
          value={bottom.id} ///?????? ///????????? ????????? ????????? ????????? ???,????????? ???????????? ???
          onChange={this.handleChange}
        />
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
        this.paginateBottoms();
      },
    );
  };

  render() {
    return (
      <>
        <Box1>
          <ClothBox>{this.state.postData} </ClothBox>
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
      </>
    );
  }
}

export default bottomModalComponent;
