import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import {List, ListItem} from '../../components/List';
import Jumbotron from '../../components/Jumbotron';
import API from '../../utils/API';

class Saved extends Component {
  state = {
    comics: []
  };

  componentDidMount() {
    this.loadComics();
  }

  loadArticles = () => {
    API.getSavedComics()
      .then(res => {
        console.log(res.data);
        this.setState({
          comic: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteComic = id => {
    API.deleteComic(id)
      .then(res => this.loadComics())
      .catch(err => console.log(err));
  };

  render() {
    return (
        <Row id="saved">
          <Col size="col-md-8 col-sm-12 m-auto">
            {this.state.comics.length ? (
              <List>
                {this.state.comics.map(comic => (
                  <ListItem key={comic._id}>
                  <Row>
                    <Col size="col-md-8 col-xs-12">
                    <a href={comic.url} target="_blank">
                      <strong>{comic.title}</strong>
                    </a>
                    <br />
                    <span>Published on {comic.date}</span>
                    </Col>
                    <Col size="col-md-4 col-xs-12">
                    <button
                      className="btn btn-danger"
                      style={{ float: 'right' }}
                      onClick={() => this.deleteComic(comic._id)}
                    >
                      Delete Comic
                    </button>
                    </Col>
                  </Row>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Comics To View...Yet!</h3>
            )}
          </Col>
        </Row>
    );
  }
}

export default Saved;