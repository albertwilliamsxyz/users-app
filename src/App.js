import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import './App.css';

const Button = props => {
	return (
		<button {...props} className={`button ${props.className || ''}`}></button>
	)
}

const NewUserSection = props => {
	return (
		<section id="new-user">
			<div className="container">
				<Card>
					<NewUser onUserCreation={props.onUserCreation}/>
				</Card>
			</div>
		</section>
	)
}

const Modal = props => {
	return props.visible ? (
		<div className="modal-container">
			<Card>
				<header>
					<h2>{props.title}</h2>
					<Button onClick={props.onClose} className="icon-button"><i class="fas fa-times"></i></Button>
				</header>
				<div class="content"> {props.content}
				</div>
			</Card>
		</div>
	): null
}

const NewUser = props => {
	const [fullName, setFullName] = useState('');
	const [details, setDetails] = useState('');
	const [isVisibleModal, setIsVisibleModal] = useState(false);

	const onFullNameChange = event => {
		setFullName(event.target.value);
	}

	const onDetailsChange = event => {
		setDetails(event.target.value);
	}

	const userCreationHandler = event => {
		event.preventDefault();
		if (fullName.trim().length > 0 && details.trim().length > 0) {
			props.onUserCreation({
				fullName: fullName,
				details: details,
				id: uuid(),
			});
			setFullName('');
			setDetails('');
		} else {
			setIsVisibleModal(true);
		}
	}

	const modalCloseHandler = () => {
		setIsVisibleModal(false);
	}

	return (
		<div>
			<Modal
				title={'Wrong input'}
				content={
					<p>Please, take a look at the input. Both fields must be filled.</p>
				}
				visible={isVisibleModal}
				onClose={modalCloseHandler}
			/>
			<div className="new-user">
				<form action="" onSubmit={userCreationHandler}>
					<div className="fields">
						<div className="field">
							<label htmlFor="full-name">Full Name</label>
							<input id="full-name" onChange={onFullNameChange} value={fullName} type="text" name="full-name" />
						</div>
						<div className="field">
							<label htmlFor="details">Details</label>
							<input id="details" onChange={onDetailsChange} value={details} type="text" name="details" />
						</div>
					</div>
					<div className="controls">
						<Button type="submit">Create</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

const Card = props => {
	return (
		<div className="card">
			{props.children}
		</div>
	)
}

const UserDetails = props => {
	return (
		<div className="user-details">
			<h2>{props.fullName}</h2>
			<p>{props.details}</p>
		</div>
	)
}

const UserControls = props => {
	return (
		<div className="user-controls">
			<Button onClick={() => props.onDelete()} className="cancel"><i className="fas fa-trash-alt"></i></Button>
		</div>
	)
}

const User = props => {
	const deleteHandler = () => {
		props.onDelete(props.id)
	}

	return (
		<div className="user">
			<UserDetails fullName={props.fullName} details={props.details} />
			<UserControls onDelete={deleteHandler} />
		</div>
	)
}

const Users = props => {
	return (
		<div className="users">
			{props.users.length ? (
				props.users.map(item => <User onDelete={props.onDelete} key={item.id} id={item.id} fullName={item.fullName} details={item.details} />)
			): (
				<p>Nothing to see here. Feel free to add new users</p>
			)}
		</div>
	)
}

const UsersSection = props => {
	return (
		<section id="users">
			<div className="container">
				<Card>
					<Users onDelete={props.onDelete} users={props.users}/>
				</Card>
			</div>
		</section>
	)
}

function App() {
	const [users, setUsers] = useState([
		{
			id: '1',
			fullName: 'Albert',
			details: 'Lorem reiciendis quis quo iusto ipsum! Accusantium quos animi cumque recusandae ducimus obcaecati aperiam. Vero sit quas officiis odit quibusdam? Voluptatibus natus asperiores ullam distinctio tempore. Eos magnam saepe nulla',
		},
		{
			id: '2',
			fullName: 'Williams',
			details: 'Lorem reiciendis quis quo iusto ipsum! Accusantium quos animi cumque recusandae ducimus obcaecati aperiam. Vero sit quas officiis odit quibusdam? Voluptatibus natus asperiores ullam distinctio tempore. Eos magnam saepe nulla',
		},
	]);

	const userCreationHandler = user => {
		setUsers(prevState => [...prevState, user])
	}

	const deleteHandler = id => {
		setUsers(prevState => prevState.filter(item => item.id !== id))
	}

	return (
		<>
			<NewUserSection onUserCreation={userCreationHandler} />
			<UsersSection onDelete={deleteHandler} users={users}/>
		</>
	);
}

export default App;
