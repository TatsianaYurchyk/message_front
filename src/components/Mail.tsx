import styles from "../styles/Mail.module.css";
import { Card } from "react-bootstrap";
import { Mail as MailModel } from "../models/mail";
import { User as UserModel } from "../models/user";
import { formatDate } from "../utils/formatDate";
import { useEffect, useState } from 'react';
import { User } from "../models/user";
import * as UsersApi from "../network/users_api";

interface MailProps {
    mail: MailModel,
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

    const sender =users.map(user=> user._id==userId?user.username:"");
    
    return (
        <Card
            className={`${styles.mailCard} ${className}`}
            >
            <Card.Body className={styles.cardBody}>
                
                <Card.Title onClick={()=>setDetails(prev=> !prev)} title="click to see the text">
                   title:  {title}
                    
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