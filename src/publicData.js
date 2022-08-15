export const headerData = {
    logo: {
        smallLogo: {
            url: "https://firebasestorage.googleapis.com/v0/b/note-app-e6698.appspot.com/o/public%2Fsmall-logo.svg?alt=media&token=f266e83d-4df8-4778-a87e-cbbe3cc90715"
        },
        largeLogo: {
            url: "https://firebasestorage.googleapis.com/v0/b/note-app-e6698.appspot.com/o/public%2Flogo.svg?alt=media&token=b1d22803-5058-4396-bedc-262ddfbbad3e"
        },
    },
    profile: {
        profileOptions: {
            editProfile :{
                text: "Edit profile",
            },
            logOut: {
                text: "Log out",
            }
        }
    }
}

export const notesData = {
    noteControls: {
        title: "Notes"
    },
    notes: {
        noDataMessage: {
            title: " You have no notes!",
            text: "Add your notes.",
            image: {
                url: "https://firebasestorage.googleapis.com/v0/b/note-app-e6698.appspot.com/o/public%2Fno-data.svg?alt=media&token=9cae0248-b6eb-4bfe-87e7-e7a5b99b24d4"
            }
        },
        errorMessage: {
            title: "Oooops!",
            text: "Poor connection.",
            textButton: "Try again!",
            image: {
                url: "https://firebasestorage.googleapis.com/v0/b/note-app-e6698.appspot.com/o/public%2Fpoor-connection.svg?alt=media&token=e9e502f0-a057-43f9-9e4b-8d767d49d27c"
            }
        }
    },
    addNote: {
        textButton: "Add note",
    },
}

export const addNoteForm = {
    titleForm: {
        text: "Add your note!"
    },
    titleNote: {
        elementType: "input",
        elementConfig:{
            type: "text",
            placeholder: "Title...",
            required: true,
            autoFocus: true,
        },
    },
    textNote: {
        elementType: "textarea",
        elementConfig:{
            type: "text",
            placeholder: "Write your note...",
            required: true,
            autoFocus: false,
        },
    },
    colorNote:[
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                name: "color-input",
                id: "color-1",
                defaultChecked: true,
            },
            value: "red-color",
        },
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                name: "color-input",
                id: "color-2",
                defaultChecked: false,
            },
            value: "yellow-color",
        },
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                id: "color-3",
                defaultChecked: false,
                name: "color-input",
            },
            value: "lime-color",
        },
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                id: "color-4",
                defaultChecked: false,
                name: "color-input",
            },
            value: "cyan-color",
        },
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                id: "color-5",
                defaultChecked: false,
                name: "color-input",
            },
            value: "purple-color",
        },
    ],
    submitButton: {
        text: "Add"
    }
}
export const editNoteForm = {
    titleForm: {
        text: "Edit note"
    },
    titleNote: {
        elementType: "input",
        elementConfig:{
            type: "text",
            placeholder: "Title...",
            required: true,
            autoFocus: true,
        },
    },
    textNote: {
            elementType: "textarea",
            elementConfig:{
                type: "text",
                placeholder: "Write your note...",
                required: true,
                autoFocus: true,
            },
        },
    colorNote:[
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                name: "color-input",
                id: "color-1",
                defaultChecked: true,
            },
            value: "red-color",
        },
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                name: "color-input",
                id: "color-2",
                defaultChecked: false,
            },
            value: "yellow-color",
        },
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                id: "color-3",
                defaultChecked: false,
                name: "color-input",
            },
            value: "lime-color",
        },
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                id: "color-4",
                defaultChecked: false,
                name: "color-input",
            },
            value: "cyan-color",
        },
        {
            elementType: "input",
            elementConfig: {
                type: "radio",
                id: "color-5",
                defaultChecked: false,
                name: "color-input",
            },
            value: "purple-color",
        },
    ],
    editButton: {
        text: "Edit"
    },
    deleteButton: {
        text: "Delete"
    }
}

export const loginPage = {
    imageForm: {
        url: "https://firebasestorage.googleapis.com/v0/b/note-app-e6698.appspot.com/o/public%2Flogin-image.svg?alt=media&token=41fe4fae-84f5-4746-9dd3-d75b6fa610bf"
    },
    form: {
        title: "Log in",
        email: {
            elementConfig: {
                type: "email",
                id: "email",
                placeholder:'Email',
                required: true,
            }
        },
        password: {
            elementConfig: {
                type: "password",
                id: "password",
                placeholder:'Password',
                required: true,
            }
        },
        buttonSubmit: {
            text: "Login"
        }
    },
    forgotPassword: {
        text: "Forgot password?"
    },
    signinPage: {
        message: "Need to an account?",
        buttonLink: "Sign Up"
    }
}
export const signinPage = {
    imageForm: {
        url: "https://firebasestorage.googleapis.com/v0/b/note-app-e6698.appspot.com/o/public%2Fsignup-image.svg?alt=media&token=5a16ce99-6bc8-441a-8873-5a795a9a228c"
    },
    form: {
        title: "Sign up",
        fullName: {
            elementConfig: {
                type: "text",
                id: "full-name",
                placeholder:'Full name',
                required: true,
            }
        },
        email: {
            elementConfig: {
                type: "email",
                id: "email",
                placeholder:'Email',
                required: true,
            }
        },
        password: {
            elementConfig: {
                type: "password",
                id: "password",
                placeholder:'Password',
                required: true,
            }
        },
        buttonSubmit: {
            text: "Sign up"
        }
    },
    loginPage: {
        message: "Already have an account?",
        buttonLink: "Log In"
    }
}

export const forgotPasswordData = {
    imageForm: {
        url: "https://firebasestorage.googleapis.com/v0/b/note-app-e6698.appspot.com/o/public%2Fforgot-password.svg?alt=media&token=16562f23-adbe-477f-bf7f-c2e411c03de5"
    },
    form: {
        title: "Reset password",
        email: {
            elementConfig: {
                type: "email",
                id: "email",
                placeholder:'Email',
                required: true,
            }
        },
        buttonSubmit: {
            text: "Send"
        }
    },
    successfulMessage: " Email sent successfully.",
    closeLink:  "cansel",

} 

export const PageNotFoundData = {
    image: {
        url: "https://firebasestorage.googleapis.com/v0/b/note-app-e6698.appspot.com/o/public%2F404.svg?alt=media&token=67be168c-5cfa-4aeb-87b4-2cc0ac514d60"
    },
    message: "Page not found!",
    link: "Back home",
}