import Rating from '@mui/material/Rating';
import Card from 'react-bootstrap/Card';


export default function ShowReview({review,key}) {

    return (
        <>
        <Card style={{borderRadius:0}}>
            <Card.Header  className="pt-1 pb-0 mb-0" ><Rating name="read-only" value={review.rating} readOnly /></Card.Header>
            <Card.Body className='py-0'>
                <p className='text-dark pt-1 mb-0'>
                    {review.body}
                </p>
                <p className="font-weight-light text-secondary text-right pt-1 mb-0" style={{ textAlign: 'right'}}> ~ {review.name && review.name }</p>
            </Card.Body>
        </Card>
            
        </>
    )

}