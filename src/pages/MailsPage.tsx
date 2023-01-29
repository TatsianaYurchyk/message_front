import { Container } from "react-bootstrap";
import MailsPageLoggedInView from "../components/MailsPageLoggedInView";
import MailsPageLoggedOutView from "../components/MailsPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/NotesPage.module.css";

interface MailsPageProps {
    loggedInUser: User | null,
}

const MailsPage = ({ loggedInUser }: MailsPageProps) => {
    return (
        <Container className={styles.notesPage}>
            <>
                {loggedInUser
                    ? <MailsPageLoggedInView loggedInUser={loggedInUser}/>
                    : <MailsPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default MailsPage;