/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const journalEntry = (entry) => {
    return `<section id="entryID" class="journalEntry">
                <p class="entry-date">Date: ${entry.date}</p>
                <p class="entry-concept">Concept: ${entry.concept}</p>
                <p class="entry-text">Entry: ${entry.entry}</p>
            </section>
            `
}

export const entry = (entryObj) => {
    return `<section id="entryID" class="journalEntry">
                <p class="entry-date">Date: ${entryObj.date}</p>
                <p class="entry-concept">Concept: ${entryObj.concept}</p>
                <p class="entry-text">Entry: ${entryObj.entry}</p>
                <p class="entry-mood">Mood: ${entryObj.mood}</p><br>
                <div id="ButtonsDiv">
                    <button type="button" id="btnEdit__${entryObj.id}">Edit Entry</button>
                    <button type="button" id="btnDelete__${entryObj.id}">Delete Entry</button>
                </div>
            </section>
            `
}