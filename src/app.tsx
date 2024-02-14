/*
  # Importing Libs
*/
import { ChangeEvent, useState } from 'react'
/*
  # Importing Assets
*/
import logo from './assets/logo-nlw-expert.svg'
/*
  # Importing Components
*/
import { NewNoteCard } from './components/note-card/new_note_card'
import { NoteCard } from './components/note-card/note_card'
/*
  # Note Interface
*/
interface Note {
  id: string
  date: Date
  content: string
}
/*
  # App Component
*/
export function App() {

  // Instantiated search and note useState
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  // Method that deals with note creation
  function onNoteCreated(content: string) {

    // Creating a new note
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    // Adding the new note to notes array
    const notesArray = [newNote, ...notes]

    // Updating notes
    setNotes(notesArray)

    // Saving the notes on local storage
    localStorage.setItem('notes', JSON.stringify(notesArray))

  }

  // Method that deals with note deletion
  function onNoteDeleated(id: string) {

    // Replace the array without the id informed
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    // Updating notes
    setNotes(notesArray)

    // Saving the notes on local storage
    localStorage.setItem('notes', JSON.stringify(notesArray))

  }

  // Method that deals with search
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {

    // Get the input provided by user
    const query = event.target.value

    // Updating search
    setSearch(query)

  }

  // Verifing if has any match and render it or shows nothig
  const filteredNotes = search !== '' 
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={logo} alt="NLW Expert" />
      <form className='w-full'>
        <input type="text" className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-teal-500' placeholder='Busque em suas notas...' 
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-teal-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>

        <NewNoteCard onNoteCreated={onNoteCreated} />

        {
          filteredNotes.map(note => {
            return <NoteCard key={note.id} note={note} onNoteDeleated={onNoteDeleated}/>
          })
        }

      </div>
    </div>
  )
}
