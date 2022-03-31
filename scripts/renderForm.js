export const renderForm = () => {

    return `
            <fieldset>
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journalDate">
                <label for="conceptsCovered">Concepts covered</label>
                <input type="text" name="conceptsCovered" id="conceptsCovered">
                <label for="">Journal Entry</label>
                <textarea name="textEntry" id="textEntry" cols="30" rows="10"></textarea>
                <label for="mood">Mood for the day</label>
                <select name="mood" id="mood">
                    <option value="">How's your mood?</option>
                    <option value="Sad">Sad</option>
                    <option value="Happy">Happy</option>
                    <option value="OK">OK</option>
                </select>
                <div class="journalBtns">
                    <button id="entryButton" type="submit">Record Journal Entry</button> &emsp; 
                    <button id="cancelButton" type="button">Cancel</button>
                </div>            
            </fieldset>`
}