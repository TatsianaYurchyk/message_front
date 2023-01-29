import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Mail } from "../models/mail";
import { MailInput } from "../network/mails_api";
import * as MailsApi from "../network/mails_api";
import TextInputField from "./form/TextInputField";

interface NewMailDialogProps {
    // noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Mail) => void,
}

const NewMailDialog = ({ onDismiss, onNoteSaved }: NewMailDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MailInput>({
        // defaultValues: {
        //     receiver: noteToEdit?.receiver || "",
        //     title: noteToEdit?.title || "",
        //     text: noteToEdit?.text || "",
        // }
    });

    async function onSubmit(input: MailInput) {
        try {
            let mailResponse: Mail;
            // if (noteToEdit) {
            //     noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            // } else {
                mailResponse = await MailsApi.createMail(input);
            // }
            onNoteSaved(mailResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                   New message
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                        name="receiver"
                        label="Receiver"
                        type="text"
                        placeholder="Receiver"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        // error={errors.title}
                    />
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                >
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewMailDialog;