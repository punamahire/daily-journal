export const editEntry = (entryObj) => {

	return `
	<div class="newEntry">
	<h3>Edit This Entry</h3>
		<div>
            <input type="hidden" value="${entryObj.date}" name="journalDate" id="editDate">
			<input value="${entryObj.concept}"
				   name="concept"
				   class="newEntry__input"
				   type="text"
				   placeholder="Concept"
                   id="editConcept" />
		</div>
        <br>
    	<textarea name="entryDescription"
    	class="newEntry__input newEntry__description"
    	placeholder="Describe concept learned"
        id="editDesp">${entryObj.entry}
        </textarea>

        <select name="entryMood" id="editMood">
                    <option value="">Select Mood</option>
                    <option ${entryObj.mood == 'OK' ? 'selected' : ''} value="OK">OK</option>
                    <option ${entryObj.mood == 'Happy' ? 'selected' : ''} value="Happy">Happy</option>
                    <option ${entryObj.mood == 'Sad' ? 'selected' : ''} value="Sad">Sad</option>
        </select>
		<br>

		<input type="hidden" value="${entryObj.id}" name="entryId">	
		<button id="updateEntry__${entryObj.id}">Update</button>
		<button id="newEntry__cancel">Cancel</button>
	</div>
	`
}