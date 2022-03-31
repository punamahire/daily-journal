
let loggedInUser = {}
  
export const logoutUser = () => {
    loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
}

export const getLoggedInUser = () => {
    return loggedInUser
}

export const getEntries = () => {

    return fetch("http://localhost:8088/journal?_expand=user")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

export const createNewEntry = entryObj => {
    return fetch("http://localhost:8088/journal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
  
    })
        .then(response => response.json())
}

export const getEntriesByMood = (selectedMood) => {

    return fetch(`http://localhost:8088/journal?mood=${selectedMood}`)
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

export const deleteEntry = entryId => {
    return fetch(`http://localhost:8088/journal/${entryId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }  
    })
        .then(response => response.json())
}

export const getSingleEntry = (entryId) => {
    return fetch(`http://localhost:8088/journal/${entryId}`)
    .then(response => response.json())
}

export const updateEntry = (entryObj) => {
    return fetch(`http://localhost:8088/journal/${entryObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    })
        .then(response => response.json())
}

export const loginUser = (userObj) => {
    return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
    .then(response => response.json())
    .then(parsedUser => {
      //is there a user?
      console.log("parsedUser", parsedUser) //data is returned as an array
      if (parsedUser.length > 0){
        setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
      }else {
        //no user
        return false;
      }
    })
}

export const registerUser = (userObj) => {
    return fetch(`http://localhost:8088/users`, {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    .then(parsedUser => {
      setLoggedInUser(parsedUser);
      return getLoggedInUser();
    })
}
