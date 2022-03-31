/*
 * Invoke the component list here
 */
import { getEntries, createNewEntry, getEntriesByMood, deleteEntry, getSingleEntry, updateEntry, setLoggedInUser, getLoggedInUser, loginUser, registerUser, logoutUser } from "./data/dataManager.js"
// import { formatDate } from "./journalData.js"
import { journalEntryList, entryList } from "./journalEntryList.js"
import { editEntry } from "./editEntry.js"
import { showNavBar } from "./nav/showNavBar.js"
import { loginForm } from "./auth/loginForm.js"
import { registerForm } from "./auth/registerForm.js"
import { renderForm } from "./renderForm.js"

// journalEntryList()
// formatDate()

// getEntries().then(entries => {
//     console.log(entries);
// })

const formElement = document.querySelector(".entry-form")
const logElement = document.querySelector("#entryLog")
const mainElement = document.querySelector("main")
const headerElement = document.querySelector("header")

// formElement.addEventListener("click", event => {

//     if (event.target.id === "journalDate") {
//         console.log("You clicked on input date field"); 

//     }

//     if (event.target.id === "conceptsCovered") {
//         console.log("You clicked on input concepts covered field"); 
//     }

//     if (event.target.id === "textEntry") {
//         console.log("You clicked on input journal entry field"); 
//     }

//     if (event.target.id === "mood") {
//         console.log("You clicked on dropdown mood field"); 
//     }
// });

formElement.addEventListener("click", event => {
    if (event.target.id === "entryButton") {
        event.preventDefault();
        console.log("You clicked on record entry button"); 

        const dateSel = document.querySelector("input[name='journalDate']").value
        const conceptsSel = document.querySelector("input[name='conceptsCovered']").value
        const entrySel = document.querySelector("textarea[name='textEntry']").value

        const moodEle = document.getElementById("mood")
        const moodSel = moodEle.options[moodEle.selectedIndex].value
        //we have not created a user yet - for now, we will hard code `1`.
        //we can add the current time as well
        console.log("Mood selected:", moodSel);
        const entryObject = {
            date: dateSel,
            concept: conceptsSel,
            entry: entrySel,
            mood: moodSel,
            userId: getLoggedInUser().id,
            timestamp: Date.now()
        }

      // be sure to import from the DataManager
      createNewEntry(entryObject)
      .then(showEntries())

        document.querySelector("input[name='journalDate']").value = ""
        document.querySelector("input[name='conceptsCovered']").value = ""
        document.querySelector("textarea[name='textEntry']").value = ""
        document.getElementById("mood").selectedIndex = 0
    }

    if (event.target.id === "cancelButton") {
        document.getElementById("journalDate").value = ""
        document.getElementById("conceptsCovered").value = ""
        document.getElementById("textEntry").value = ""
        document.getElementById("mood").selectedIndex = 0
    }
})

const parentEle = document.querySelector("#moodSelection")
parentEle.addEventListener("change", event => {

    if (event.target.id === "filterByMood") {

        getEntriesByMood(event.target.value).then(entriesByMood => {
            console.log(entriesByMood);
            const logElement = document.querySelector("#entryLog")
            logElement.innerHTML = entryList(entriesByMood)
        })
    }
})

logElement.addEventListener("click", event => {

    console.log(event.target.id);
    if (event.target.id.startsWith("btnEdit")) {

        const entryId = event.target.id.split("__")[1];
        console.log(entryId);
        getSingleEntry(entryId)
          .then(response => {
            showEdit(response);
          })
    }

    if (event.target.id.startsWith("btnDelete")) {
        event.preventDefault();
        console.log(event.target.value);

        const entryId = parseInt(event.target.id.split("__")[1])
        deleteEntry(entryId)
        .then(response => {
            showEntries()
        })
        
    }

    if (event.target.id.startsWith("updateEntry")) {
        event.preventDefault();
  
        const entryId = event.target.id.split("__")[1];
        //collect all the details into an object
        const entryObject = {
          concept: `${document.getElementById("editConcept").value}`,
          entry: `${document.getElementById("editDesp").value}`,
          userId: 1,
          mood: `${document.getElementById("editMood").value}`,
          date: `${document.getElementById("editDate").value}`,
          id: parseInt(entryId)
        }
  
        console.log(entryObject);
        
        updateEntry(entryObject)
          .then(response => {
              showEntries(); 
          })
      }
})

mainElement.addEventListener("click", event => {
    
    if (event.target.id === "login__submit") {
        event.preventDefault();
      //collect all the details into an object
      const userObject = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value
      }
      loginUser(userObject)
      .then(dbUserObj => {
        if(dbUserObj){
          sessionStorage.setItem("user", JSON.stringify(dbUserObj));
          showEntries();
          formElement.innerHTML = renderForm()
        }else {
          //got a false value - no user
          formElement.innerHTML = `<p class="center">That user does not exist. 
          Please try again or register for your free account.</p> ${loginForm()} <hr/> <hr/> ${registerForm()}`;
        }
      })
    }

    
    if (event.target.id === "register__submit") {
        event.preventDefault();
        
        const userObject = {
            name: document.querySelector("input[name='registerName']").value,
            email: document.querySelector("input[name='registerEmail']").value
        }

        registerUser(userObject)
        .then(dbUserObj => {
            sessionStorage.setItem("user", JSON.stringify(dbUserObj));
            showEntries();
            formElement.innerHTML = renderForm()
        })
    }
})

headerElement.addEventListener("click", event => {

    if (event.target.id === "logout") {

        console.log("inside listener for logout btn");
        logoutUser();
        console.log(getLoggedInUser());
        sessionStorage.clear();
        checkForUser();
    }
})

const showEdit = (entryObj) => {
    logElement.innerHTML = editEntry(entryObj);
}

const showEntries = () => {
    getEntries().then((allEntries) => {
        logElement.innerHTML = entryList(allEntries)
    })
}

const startDailyJournal = () => {
    showNavBar()
    //Get a reference to the location on the DOM where the nav will display
    formElement.innerHTML = renderForm();
    showEntries()
}

const checkForUser = () => {

    if (sessionStorage.getItem("user")){
        console.log("got the user");
            setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
            startDailyJournal()
    }else {
        console.log("no user found");
            //show login/register
            console.log("showLogin")
            showLoginRegister()
    }
}

const showLoginRegister = () => {
    showNavBar();
    formElement.innerHTML = `${loginForm()} <hr/> <hr/> ${registerForm()}`;
    logElement.innerHTML = "";
}

checkForUser()
//showEntries()

