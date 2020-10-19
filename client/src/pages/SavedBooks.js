import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { removeBookId } from '../utils/localStorage';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SavedBooks = () => {
  // use GraphQL query for user data, mutation to remove a book
  const [setUserData] = useState({});
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  // onclick handler for delete button
  const handleDeleteBook = async (bookId) => {
    try {
      // remove the book from the savedBooks subdocument
      const {data: updatedUser} = await removeBook({
        variables: {bookId}
      });

      // upon success, update the user data
      setUserData(updatedUser);

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <div>
          <h2>
            {data.me.savedBooks.length
              ? `Viewing ${data.me.savedBooks.length} saved ${data.me.savedBooks.length === 1 ? 'book' : 'books'}:`
              : 'You have no saved books!'}
          </h2>
        </div>
        <CardColumns>
          {data.me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
