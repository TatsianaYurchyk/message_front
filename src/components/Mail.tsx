import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Mail as MailModel } from "../models/mail";
import { User as UserModel } from "../models/user";
import { formatDate } from "../utils/formatDate";
// import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import { User } from "../models/user";
import * as UsersApi from "../network/users_api";

interface MailProps {
    mail: MailModel,
    // onNoteClicked: (note: MailModel) => void,
    // onDeleteNoteClicked: (note: MailModel) => void,
    className?: string,
    
}

const Mail = ({ mail,className }: MailProps) => {
    const {
        title,
        receiver,
        userId,
        text,
        createdAt,
    } = mail;

    const [users, setUsers] = useState<User[]>([]);
    const [details,setDetails]=useState(false)

    useEffect(() => {
		async function loadUsers() {
			try {
				const users = await UsersApi.fetchUsers();
				setUsers(users);
                console.log(users)
			} catch (error) {
				console.error(error);
			}
		}
		loadUsers();
	}, []);

    // let createdUpdatedText: string;
    // if (updatedAt > createdAt) {
    //     createdUpdatedText = "Updated: " + formatDate(updatedAt);
    // } else {
    //     createdUpdatedText = "Created: " + formatDate(createdAt);
    // }
    const sender =users.map(user=> user._id==userId?user.username:"");
    

    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            >
            <Card.Body className={styles.cardBody}>
                
                <Card.Title onClick={()=>setDetails(prev=> !prev)} title="click to see the text">
                   title:  {title}
                    {/* <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                    /> */}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    to: {receiver}
                </Card.Text>
                <Card.Text className={styles.cardText}>
                    from: {sender}
                </Card.Text>

                {details && <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>}
            </Card.Body>
            <Card.Footer className="text-muted">
                {/* {createdUpdatedText} */}
            {formatDate(createdAt)}
            </Card.Footer>
        </Card>
    )
}

export default Mail;