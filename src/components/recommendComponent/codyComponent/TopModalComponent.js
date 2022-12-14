import React, { Component } from 'react';
import '../../styles/common/App.css';
import styled from 'styled-components';
import test1Image from './Outer1.jpg';
import test2Image from './Outer2.jpg';
import test4Image from './Outer4.jpg';
import test5Image from './Outer5.jpg';
import ReactPaginate from 'react-paginate';
import ClosetService from '../../services/ClosetService';

const testCloth = [
  {
    id: 'test-1',
    category: 'top',
    color: 'red',
    pictureAsFile: test1Image,
  },
  {
    id: 'test-2',
    category: 'top',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-4',
    category: 'top',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-5',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-6',
    category: 'top',
    color: 'red',
    pictureAsFile: test1Image,
  },
  {
    id: 'test-7',
    category: 'top',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-8',
    category: 'top',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-9',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-10',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-11',
    category: 'top',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-12',
    category: 'top',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-13',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-14',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-15',
    category: 'top',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-16',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-17',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-18',
    category: 'top',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-19',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-20',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-21',
    category: 'top',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-22',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-23',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-24',
    category: 'top',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-25',
    category: 'top',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-26',
    category: 'top',
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

class topModalComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      cloths: [],
      tops: [],
      topImages: [],

      offset: 0,
      perPage: 12,
      currentPage: 0,

      checkedId: null,
      checked: false,
    };
  }
  componentDidMount() {
    this.getAllTops(); //?????? ???????????? ????????????
    // this.setCategory(); //????????? ?????? ?????? ???????????? ???????????? ?????? ????????????
    this.paginateTops(); // ????????? ?????? ???????????? ???????????? pagination??? ????????????
  }
  getAllTops() {
    ClosetService.getAllTops()
      .then((res) => {
        const data = res.data;
      })
      .catch((e) => {
        console.log(e);
      });

    // this.state.tops.push(response.data) //??????????????? ??????
    this.setState((this.state.tops = testCloth));
    this.setState((this.state.topImages = testCloth.pictureAsFile));
    this.count = testCloth.length;

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
    ClosetService.deletetops(deleteList)
      .then(alert('????????? ?????????????????????!'))
      .catch((e) => {
        console.log(e);
      });
  }

  paginateTops() {
    const data = this.state.tops;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    const postData = slice.map((top) => (
      <div key={top.id} style={{ padding: 10 }}>
        <img width="150" height="150" src={top.pictureAsFile} />
        <input
          type="radio"
          name="selectedTop" //radiobutton ????????? ????????? ???????????? ?????????.
          value={top.id} ///?????? ///????????? ????????? ????????? ????????? ???,????????? ???????????? ???
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
        this.paginateTops();
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

export default topModalComponent;
