import "./App.css";
import React from "react";
import { v4 as uuid } from "uuid";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            students: [],

            firstNameValue: "",
            lastNameValue: "",
            emailAddressValue: "",
            classEnrolledValue: "Algebra",

            firstNameError: false,
            lastNameError: false,
            emailAddressError: false,
            classEnrolledError: false,

            firstNameEditValue: "",
            lastNameEditValue: "",
            emailAddressEditValue: "",
            classEnrolledEditValue: "Algebra",

            showDeleteModal: false,
            showEditModal: false,

            editingStudentId: "",
            deleteStudentId: null
        };
    }

    addStudent = (e) => {
        e.preventDefault();

        if (this.state.firstNameValue.length <= 1) {
            this.setState({
                firstNameError: true
            });

            return;
        }

        if (this.state.lastNameValue.length <= 1) {
            this.setState({
                lastNameError: true
            });

            return;
        }

        if (this.state.emailAddressValue.length <= 1) {
            this.setState({
                emailAddressError: true
            });

            return;
        }

        if (this.state.classEnrolledValue.length <= 1) {
            this.setState({
                classEnrolledError: true
            });

            return;
        }

        const newStudent = {
            id: uuid(),
            firstName: this.state.firstNameValue,
            lastName: this.state.lastNameValue,
            emailAddress: this.state.emailAddressValue,
            classEnrolled: this.state.classEnrolledValue
        };

        this.setState((prevState) => {
            const copyStudents = [...prevState.students, newStudent];

            return {
                students: copyStudents,

                firstNameValue: "",
                lastNameValue: "",
                emailAddressValue: "",
                classEnrolledValue: "Algebra"
            };
        });
    };

    handleFirstNameOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            firstNameValue: value
        });

        if (value.length <= 1) {
            this.setState({
                firstNameError: true
            });
        } else {
            this.setState({
                firstNameError: false
            });
        }
    };

    handleLastNameOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            lastNameValue: value
        });

        if (value.length <= 1) {
            this.setState({
                lastNameError: true
            });
        } else {
            this.setState({
                lastNameError: false
            });
        }
    };

    handleEmailAddressOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            emailAddressValue: value
        });

        if (value.length <= 1) {
            this.setState({
                emailAddressError: true
            });
        } else {
            this.setState({
                emailAddressError: false
            });
        }
    };

    handleClassEnrolledOnChange = (e) => {
        const { value } = e.target;

        this.setState({
            classEnrolledValue: value
        });

        if (value.length <= 1) {
            this.setState({
                classEnrolledError: true
            });
        } else {
            this.setState({
                classEnrolledError: false
            });
        }
    };

    deleteStudent = (studentId) => {
        this.setState((prevState) => {
            const keptStudents = prevState.students.filter(
                (student) => student.id !== studentId
            );
            return {
                students: keptStudents,
                showDeleteModal: false
            };
        });
    };

    editStudent = (studentId) => {
        this.setState({
            showEditModal: true
        });

        let firstName = "";
        let lastName = "";
        let emailAddress = "";
        let classEnrolled = "";

        for (const student of this.state.students) {
            if (student.id === studentId) {
                console.log(student);
                firstName = student.firstName;
                lastName = student.lastName;
                emailAddress = student.emailAddress;
                classEnrolled = student.classEnrolled;
                break;
            }
        }

        this.setState({
            firstNameEditValue: firstName,
            lastNameEditValue: lastName,
            emailAddressEditValue: emailAddress,
            classEnrolledEditValue: classEnrolled,
            editingStudentId: studentId
        });
    };

    handleFirstNameEdit = (e) => {
        this.setState({
            firstNameEditValue: e.target.value
        });
    };

    handleLastNameEdit = (e) => {
        this.setState({
            lastNameEditValue: e.target.value
        });
    };

    handleEmailAddressEdit = (e) => {
        this.setState({
            emailAddressEditValue: e.target.value
        });
    };

    handleClassEnrolledEdit = (e) => {
        this.setState({
            classEnrolledEditValue: e.target.value
        });
    };

    submitEdit = () => {
        this.setState((prevState) => {
            const updatedStudents = prevState.students.map((student) => {
                if (student.id === this.state.editingStudentId) {
                    const copy = {
                        ...student,
                        firstName: this.state.firstNameEditValue,
                        lastName: this.state.lastNameEditValue,
                        emailAddress: this.state.emailAddressEditValue,
                        classEnrolled: this.state.classEnrolledEditValue
                    };
                    return copy;
                }
                return student;
            });

            return {
                students: updatedStudents,
                showEditModal: false
            };
        });
    };

    render() {
        return (
            <main>
                <h1>Student Enrollment Data</h1>
                <form onSubmit={this.addStudent}>
                    <div className="form-inputs">
                        <input
                            onChange={this.handleFirstNameOnChange}
                            value={this.state.firstNameValue}
                            type="text"
                            placeholder="First Name"
                            required
                        />
                        {this.state.firstNameError && (
                            <span>Invalid First Name</span>
                        )}
                        <input
                            onChange={this.handleLastNameOnChange}
                            value={this.state.lastNameValue}
                            type="text"
                            placeholder="Last Name"
                            required
                        />
                        {this.state.lastNameError && (
                            <span>Invalid Last Name</span>
                        )}
                        <input
                            onChange={this.handleEmailAddressOnChange}
                            value={this.state.emailAddressValue}
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                        {this.state.emailAddressError && (
                            <span>Invalid Email Address</span>
                        )}
                        <select
                            onChange={this.handleClassEnrolledOnChange}
                            value={this.state.classEnrolledValue}
                            required
                        >
                            <option value="Algebra">Algebra</option>
                            <option value="Geometry">Geometry</option>
                            <option value="Journalism">Journalism</option>
                            <option value="Literature">Literature</option>
                        </select>
                        <input type="submit" value="Add Student" />
                    </div>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Class Enrolled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students.map(
                            ({
                                firstName,
                                lastName,
                                emailAddress,
                                classEnrolled,
                                id
                            }) => {
                                return (
                                    <tr key={id}>
                                        <td>{firstName}</td>
                                        <td>{lastName}</td>
                                        <td>{emailAddress}</td>
                                        <td>{classEnrolled}</td>
                                        <td className="action-buttons">
                                            <button
                                                onClick={() => {
                                                    this.editStudent(id);
                                                }}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    this.setState({
                                                        showDeleteModal: true,
                                                        deleteStudentId: id
                                                    });
                                                }}
                                                className="main-delete-btn"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
                {this.state.showDeleteModal && (
                    <div className="delete-modal">
                        <h1>DELETE STUDENT</h1>
                        <p>Are you sure you want to delete this student?</p>

                        <div className="confirm-buttons">
                            <button
                                onClick={() => {
                                    this.setState({
                                        showDeleteModal: false,
                                        deleteStudentId: null
                                    });
                                }}
                                type="button"
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    this.deleteStudent(
                                        this.state.deleteStudentId
                                    );
                                    this.setState({
                                        showDeleteModal: false,
                                        deleteStudentId: null
                                    });
                                }}
                                type="button"
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
                {this.state.showEditModal && (
                    <>
                        <h2>Edit The Student Information</h2>
                        <form>
                            <div className="edit-inputs">
                                <input
                                    value={this.state.firstNameEditValue}
                                    onChange={this.handleFirstNameEdit}
                                />
                                <input
                                    value={this.state.lastNameEditValue}
                                    onChange={this.handleLastNameEdit}
                                />
                                <input
                                    value={this.state.emailAddressEditValue}
                                    onChange={this.handleEmailAddressEdit}
                                />
                                <select
                                    value={this.state.classEnrolledEditValue}
                                    onChange={this.handleClassEnrolledEdit}
                                >
                                    <option value="Algebra">Algebra</option>
                                    <option value="Geometry">Geometry</option>
                                    <option value="Journalism">
                                        Journalism
                                    </option>
                                    <option value="Literature">
                                        Literature
                                    </option>
                                </select>
                                <div className="edit-buttons"></div>
                                <button
                                    className="edit-cancel-btn"
                                    onClick={() => {
                                        this.setState({
                                            showEditModal: false
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="edit-update-btn"
                                    onClick={this.submitEdit}
                                >
                                    Update Student
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </main>
        );
    }
}

export default App;
