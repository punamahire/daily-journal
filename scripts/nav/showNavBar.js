export const showNavBar = () => {
    const headerElement = document.querySelector("header")
    headerElement.innerHTML =  `
                                <nav class="navigation">
                                    <div class="loginLogoutDiv">
                                        <button type="button" id="logout">Logout</button>
                                    </div>
                                </nav>`
}