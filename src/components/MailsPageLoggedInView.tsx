import { useEffect, useRef, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Mail as MailModel } from '../models/mail';
import * as MailsApi from "../network/mails_api";
import * as UsersApi from "../network/users_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import NewMessageDialog from "./NewMailDialog";
import Mail from './Mail';
import { User } from "../models/user";


interface MailsPageProps {
    loggedInUser: User,
}

const MailsPageLoggedInView = ({ loggedInUser }: MailsPageProps) => {

    const [mails, setMails] = useState<MailModel[]>([]);
    const [mailsLoading, setMailsLoading] = useState(true);
    const [showMailsLoadingError, setShowMailsLoadingError] = useState(false);
    const [showMailDialog, setShowMailDialog] = useState(false);

    useEffect(() => {
        async function loadMails() {
            try {
                setShowMailsLoadingError(false);
                setMailsLoading(true);
                const mails = await MailsApi.fetchMails();
                setMails(mails);
            } catch (error) {
                console.error(error);
                setShowMailsLoadingError(true);
            } finally {
                setMailsLoading(false);
            }
        }
        loadMails();
    }, []);

    const mailsGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
            {/* {notes.map(note => ( */}
            {mails.filter((mail)=>mail.receiver==loggedInUser.username).map(mail => (
                <Col key={mail._id}>
                    <Mail
                        mail={mail}
                        className={styles.note}
                    />
                </Col>
            ))}
        </Row>
        // const update= setInterval(() => {
        //     window.location.reload()
        //   }, 10000)

        //   const intervalRef:any = useRef()

        //   const update2 = () => {
        //     intervalRef.current = setInterval(() => {
        //         window.location.reload()
        //     }, 5000);
        //   };
          
        //   const resetUpdate = () => {
        //     clearInterval(intervalRef.current);
        //     intervalRef.current = null;
        //   };

// showMailDialog? clearInterval(update):update;
// !showMailDialog? update:setTimeout(() => { clearInterval(update); });

    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => {setShowMailDialog(true);}}>
                <FaPlus />
                New message
            </Button>
            {mailsLoading && <Spinner animation='border' variant='secondary' />}
            {showMailsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!mailsLoading && !showMailsLoadingError &&
                <>
                    {mails.length > 0
                        ? <> <p>Your incoming messages:</p> {mailsGrid} </> 
                        : <p>You don't have any messages yet</p>
                    }
                </>
            }
            {showMailDialog &&
                <NewMessageDialog
                    onDismiss={() => setShowMailDialog(false)}
                    onMailSaved={(newMail) => {
                        setMails([...mails, newMail]);
                        setShowMailDialog(false);
                    }}
                />
            }
        </>
    );
}

export default MailsPageLoggedInView;