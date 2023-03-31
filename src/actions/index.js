export const returnNotes = () => {
    return {
        type: "Notes"
    }
}

export const returnBooksFromDB = () => {
    return {
        type: "getAllBooksFromDB"
    }
}

export const returnBooksFromDB1 = (value) => {
    return {
        type: "getAllBooksFromDB1",
        value
    }
}
export const returnTrash = () => {
    return {
        type: "Trash"
    }
}
export const returnArchives = () => {
    console.log("Came In Index.js line 12")
    return {
        type: "Archives"
    }
}

export const getAllNotesFromArray = () => {
    console.log("Came In Index.js line 18")
    return {
        type: "GetAllNotes"
    }
}

export const insertNote = (value) => {
    return {
        type: 'InsertNote',
        value
    }
}

export const getOnlyArchivedNotes = () => {
    console.log("Came In Index.js line 24")
    return {
        type: "GetAllArchivedNotes"
    }
}
export const getOnlyTrashedNotes = () => {
    return {
        type: "GetAllTrashedNotes"
    }
}
export const insertAllNotesInTheArray = (value) => {
    return {
        type: "InsertMultipleNotesInTheArray", value
    }
}
export const updateNoteInTheArray = (value) => {
    return {
        type: "UpdateNote", value
    }
}
export const updateNoteStatusInTheArray = (value) => {
    return {
        type: "UpdateNoteStatus", value
    }
}

export const refreshNotesInTheArray=(value)=>{
    return {
        type: "refreshNotes", value
    }
}
