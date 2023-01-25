import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import './styles/main.css';
import {Article} from "./components/post";


const baseUrl = 'http://127.0.0.1:8000/'

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [posts, setPosts] = useState([]);

    const createNote = (event) => {

        event.preventDefault();
        console.log(title)
        console.log(content)
        setTitle('')
        setContent('')

        setModalVisible(false)
    }

    const getAllPosts = async () => {
        const response = await fetch(`${baseUrl}api/article/`)

        const data = await response.json()

        if (response.ok) {
            console.log(data)
            setPosts(data)
            console.log(data[1].header_image)
            console.log('done')
        } else {
            console.log("Failed Network Request")
        }
    }

    useEffect(
        () => {
            getAllPosts()
        }, []
    )

    const deleteItem = (articleId) => {
        console.log(articleId)
    }

    return (
        <div>
            <div className='header'>
                <div className="logo">
                    <p className="title">Rolisticae</p>
                </div>
                <div className="add-section">
                    <a href="#" className="add-btn"
                       onClick={() => setModalVisible(true)}>Add News Rolisticae</a>
                </div>
            </div>
            <div className="posts">
                {/*<p className="centerText">No Posts</p>*/}
                {
                    posts.map(
                        (item) => (

                            <Article title={item.title}
                                     content={item.content}
                                     header_image={item.header_image}
                                     onclick={deleteItem(item.id)}
                                     key={item.id}
                            />
                        )
                    )

                }
            </div>
            <div className={modalVisible ? 'modal' : 'modal-not-visible'}>
                <div className="form">
                    <div className="form-header">
                        <div>
                            <p className="form-header-text">Create a Note</p>
                        </div>
                        <div>
                            <a href="#" className="close-btn"
                               onClick={() => setModalVisible(!modalVisible)}>X</a>
                        </div>
                    </div>
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">content</label>
                            <textarea name="content" id=""
                                      value={content}
                                      onChange={(e) => setContent((e.target.value))}
                                      cols="30" rows="5" className="form-control"></textarea>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Save" className="btn" onClick={createNote}/>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector('#root'));