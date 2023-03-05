import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Mail } from "../models/mail";
import { User } from "../models/user";
import { MailInput } from "../network/mails_api";
import * as MailsApi from "../network/mails_api";
import TextInputField from "./form/TextInputField";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as UsersApi from "../network/users_api";

interface NewMailDialogProps {
	onDismiss: () => void;
	onMailSaved: (note: Mail) => void;
	loggedInUser: User;
}

const NewMailDialog = ({
	onDismiss,
	onMailSaved,
	loggedInUser,
}: NewMailDialogProps) => {
	const [value, setValue] = useState<string | null>("");
	const [inputValue, setInputValue] = useState<string>("");
    const [receivers, setReceivers] = useState<string[]>([]);

	useEffect(() => {
		async function loadUsers() {
			try {
				const users = await UsersApi.fetchUsers();
                const newReceivers=users.map(user=>user.username)
				setReceivers(newReceivers);
               
			} catch (error) {
				console.error(error);
			}
		}
		loadUsers();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<MailInput>();

	async function onSubmit(input: MailInput) {
		try {
			let mailResponse: Mail;
			input.userId = loggedInUser._id;
			input.receiver = inputValue;
			mailResponse = await MailsApi.createMail(input);
			onMailSaved(mailResponse);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}


	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>New message</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Label>Receiver</Form.Label>
                    <Autocomplete
						disablePortal
						id="combo-box-demo"
						options={receivers}
						sx={{ width: 300 }}
						freeSolo
						isOptionEqualToValue={(option, value) =>
							option === value
						}
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
						inputValue={inputValue}
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue);
						}}
						renderInput={(params) => (
							<TextField {...params} label="Receiver" />
						)}
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
					disabled={isSubmitting}>
					Send
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default NewMailDialog;
