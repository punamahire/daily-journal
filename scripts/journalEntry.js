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