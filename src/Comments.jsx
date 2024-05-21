import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Comments() {
    const token = localStorage.getItem('token'); 
    const { id } = useParams();
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://salty-temple-86081-1a18659ec846.herokuapp.com/blogs/${id}/comments/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Comments data:', data);
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
        fetchComments();
    }, [token, id])

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', content);

        if (!content) {
            alert('Please type a comment before submitting.');
            return;
        }

        try {
            const response = await fetch(`https://salty-temple-86081-1a18659ec846.herokuapp.com/blogs/${id}/comments/`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setContent('');

            // Add the new comment to the comments state
            setComments(prevComments => [...prevComments, data]);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        }
    }

    return (
        <div className="comments">
            <h1>Comments</h1>
            <div className="commentForm">
                <form onSubmit={handleSubmit}>
                    <textarea name="comment" id="comment" placeholder="Add a comment" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="commentList">
                {comments ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p className="commentAuthor">{comment.author_username}</p>
                            <p className="commentTime">{new Date (comment.timestamp).toLocaleString()}</p>
                            <p className="commentContent">{comment.content}</p>
                            <div className="editAndDelete">
                                <p className="edit">Edit</p>
                                <p className="delete">Delete</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='noComments'>No comments found</p>
                )}
            </div>
        </div>
    )
}