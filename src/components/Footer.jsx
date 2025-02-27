import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  //copyrigth 등등

  return (
    <>
      <Card>
        <Card.Header>Quote</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0" >
            <Link href="#">a</Link>
            <footer className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
};

export default Footer;
