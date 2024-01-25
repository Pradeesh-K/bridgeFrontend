import Stars from './Stars.jsx';
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';
export default function Review({id}) {

 
    return (
        <div>
            <h4>Leave a Review</h4>
            <form action={`${backendURL}/bridges/${id}/reviews`} method="POST">
            {/* <form onSubmit={handleSubmit}> */}
                <Stars/>
                <div className="mb-2">
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="nameHelp" placeholder="Your name (optional)"  aria-label='Your name (optional)' />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" name="feedback" id="feedback" cols="30" rows="3" placeholder='Your feedback' required  aria-label='Your feedback'></textarea>
                    <div className="invalid-feedback">
                        Please write a review
                    </div>
                    <button className="btn btn-success mt-1 btn-lg col-12">Submit</button>
                </div>
                
            </form>
            
        </div>
    )
}