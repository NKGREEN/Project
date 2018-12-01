import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, TextArea, FormBtn } from '../../components/Form';
import './Main.css'


class Main extends Component {
  state = {
    comics: [],
    queryTerm: '',
  };

  getComics = () => {
    let query = `${this.state.queryTerm}`;
    if (this.state.startDate) {
      query = `${query}&begin_date=${this.state.startDate}0101`;
    }
    if (this.state.endDate) {
      query = `${query}&end_date=${this.state.endDate}1231`;
    }

    API.marvelSearch(query)
      .then(res => {
        console.log(res);
        this.setState({
          comics: res.data.response.docs,
          queryTerm: '',
          startDate: '',
          endDate: ''
        });
      })
      .catch(err => console.log(err));
  };


  saveComic = comicInfo => {
    API.saveComic(comicInfo)
      .then(res => {
        console.log('Comic added to cubby!');
      })
      .catch(err => {
        console.log(err);
      })
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.queryTerm) {
      this.getArticles();
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col size="col-md-12">
            <Jumbotron id="main-tron">
              <div className="overlay">
                <h1 className="text-center">Search Comics!</h1>
                <Row>
                  <Container>
                    <Col size="col-md-12" id="search">
                      <form>
                        <Row>
                          <Col size="col-md-4">
                            <Input
                              value={this.state.queryTerm}
                              onChange={this.handleInputChange}
                              name="queryTerm"
                              placeholder="Character (required)"
                            />
                          </Col>

                          <Col size="col-md-3">
                            <Input
                              value={this.state.startDate}
                              onChange={this.handleInputChange}
                              name="startDate"
                              placeholder="Start : (2016)"
                            />
                          </Col>


                          <Col size="col-md-3">
                            <Input
                              value={this.state.endDate}
                              onChange={this.handleInputChange}
                              name="endDate"
                              placeholder="End Year: (2017)"
                            />

                          </Col>

                          <Col size="col-md-2">
                            <FormBtn disabled={!this.state.queryTerm} onClick={this.handleFormSubmit}>
                              Submit Search
                          </FormBtn>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Container>
                </Row>
              </div>
            </Jumbotron>
          </Col>
        </Row>


        <Row>
          <Col size="col-md-12">
            <Jumbotron id="results-tron">
              <h1>Comic Results</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Container>
          <Row>
            <Col size="col-md-8 m-auto">
              {this.state.comics.length ? (
                <List>
                  {this.state.comics.map(comic => (
                    <ListItem key={comic._id}>
                    <Row>
                    <Col size="col-md-8">
                      <a href={comic.web_url} target="_blank">
                        <strong>{comic.headline.main}</strong>
                      </a>
                      <br />
                      <span>Published on {comic.pub_date}</span>
                    </Col>
                    <Col size="col-md-4">
                      <button className="btn btn-primary" style={{ float: "right" }} onClick={() => this.saveArticle({
                        title: comic.headline.main,
                        url: comic.web_url,
                        date: comic.pub_date
                      })}> Add Comic </button>
                    </Col>
                  </Row>
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>Sorry! No comics for that search. Try again!</h3>
                )}
            </Col>
          </Row>
        </Container>


      </div>
    );
  }
}

export default Main;