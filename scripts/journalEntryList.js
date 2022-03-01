/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data module component
 */
import { getJournalEntries } from "./journalData.js"
import { journalEntry } from "./journalEntry.js";

export const journalEntryList = () => {
    const entryLog = document.querySelector("#entryLog")
    const entries = getJournalEntries()

    let entryHTMLRepresentation = "";

    for (const entry of entries) {
        entryHTMLRepresentation += `${journalEntry(entry)}`
    }
    entryLog.innerHTML += `${entryHTMLRepresentation}`
}
