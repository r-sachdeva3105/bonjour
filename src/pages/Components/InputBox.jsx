import React, { useContext, useState } from 'react'
import './Styles/InputBox.css'
import { ChatContext } from '../Context/ChatContext';
import { AuthContext } from '../Context/AuthContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const InputBox = () => {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleSend = async () => {
        if (image) {

            const storageRef = ref(storage, v4());
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    // switch (error.code) {
                    //     case 'storage/unauthorized':
                    //         setError('storage/unauthorized');
                    //         break;
                    //     case 'storage/canceled':
                    //         setError('storage/canceled');
                    //         break;
                    //     case 'storage/unknown':
                    //         setError('storage/unknown');
                    //         break;
                    //     default:
                    //         break
                    // }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatID), {
                            messages: arrayUnion({
                                id: v4(),
                                text,
                                senderID: currentUser.uid,
                                image: downloadURL,
                                date: Timestamp.now()
                            })
                        });
                    });
                },
            );

        } else {
            await updateDoc(doc(db, "chats", data.chatID), {
                messages: arrayUnion({
                    id: v4(),
                    text,
                    senderID: currentUser.uid,
                    date: Timestamp.now()
                })
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatID + ".lastMessage"]: {
                text
            },
            [data.chatID + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatID + ".lastMessage"]: {
                text
            },
            [data.chatID + ".date"]: serverTimestamp()
        });

        setText('');
        setImage(null);
    }

    return (
        <div id='InputBox'>
            <input
                type="file"
                name="image"
                id="image"
                onChange={e => setImage(e.target.files[0])}
            />
            <label htmlFor="image"><i className="fa-solid fa-paperclip"></i></label>
            <input
                type="text"
                name="message"
                id="messageInput"
                placeholder="type something..."
                onChange={e => setText(e.target.value)}
                value={text}
            />
            <button disabled={text === ''} onClick={handleSend}>
                <i className="fa-solid fa-circle-arrow-right"></i>
            </button>
        </div>
    )
}

export default InputBox