/*
  # Importing Libs
*/
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
/*
  # New Note Interface
*/
interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}
// Instantiated SpeechRecognition API
let SpeechRecognition: SpeechRecognition | null = null
/*
  # New Note Component
*/
export function NewNoteCard({ onNoteCreated }: NewNoteCardProps)  {

  // Instantiated shouldShowOnBoard, content and isRecording useState
  const [shouldShowOnBoard, setShouldShowOnBoard] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  // Method that deals with start edition
  function handleStartEdition() {

    // Updating shouldShowOnBoard
    setShouldShowOnBoard(false)

  }

  // Method that deals with content change
  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {

    // Getting the content prompted by user
    setContent(event.target.value)

    // Validating if the text area is void, if true show off text area
    if (event.target.value === '') {
      setShouldShowOnBoard(true)
    }

  }

  // Method that deals with save note
  function handleSaveNote(event: FormEvent) {

    // Prevent form default action
    event.preventDefault()

    // Valiating if content is void, if true early return
    if (content === '') {
      return
    }

    // Save the content
    onNoteCreated(content)

    // Clear the text area and show off the text area
    setContent('')
    setShouldShowOnBoard(true)

    // Show a success toast after note creation
    toast.success('Nota criada com sucesso')

  }

  // Method that deals with start recording
  function handleStartRecording() {

    // Validating if the speech recording API is available
    const isSpeechRecordingAPIAvailable = 'SpeechRecognition' in window
      || 'webkitSpeechRecognition' in window

    // If speech recording API isn't available early return and alert user
    if(!isSpeechRecordingAPIAvailable) {
      alert('Infelizmente seu navegador não suporta essa API!')
      return
    }

    // Updating isRecording and shows off the text area
    setIsRecording(true)
    setShouldShowOnBoard(false)

    // Getting speech recognition API
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    // Instantiated speech recognition API
    SpeechRecognition = new SpeechRecognitionAPI()

    // Config speech recognition API
    SpeechRecognition.lang = 'pt-BR'        // Defining the language recognition
    SpeechRecognition.continuous = true     // Defining the recognition is continuos
    SpeechRecognition.maxAlternatives = 1   // Getting the first option recognited by API
    SpeechRecognition.interimResults = true //

    // Getting the data recognited and update the content
    SpeechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    // If get an error shows on console
    SpeechRecognition.onerror = (event) => {
      console.error(event)
    }

    // Starting the API
    SpeechRecognition.start()
  }

  // Method that deals with stop recording
  function handleStopRecording() {

    // Updating isRecording
    setIsRecording(false)

    // Checking if recording is stoped
    if(SpeechRecognition !== null) {
      SpeechRecognition.stop()
    }

  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md flex flex-col bg-teal-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-teal-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-teal-50'>
          Adicionar nota
        </span>
        <p className='text-sm leading-6 text-teal-100'>
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/40'/>
        <Dialog.DialogContent className='z-1 overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60svh] bg-teal-700 md:rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute right-0 top-0 bg-teal-800 p-1.5 text-teal-50 hover:text-teal-100'>
            <X className='size-5' />
          </Dialog.Close>
          
          <form className='flex-1 flex flex-col'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-sm font-medium text-teal-50'>
                Adicionar nota
              </span>
            
              {
                shouldShowOnBoard ?
                  (
                    <p className='text-sm leading-6 text-teal-100'>
                      Comece <button onClick={handleStartRecording} type='button' className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEdition} type='button' className='font-medium text-lime-400 hover:underline'>utilize apenas texto.</button>
                    </p>
                  ) : 
                  (
                    <textarea autoFocus className='text-sm leading-6 text-teal-400 bg-transparent resize-none flex-1 outline-none' onChange={handleContentChanged} value={content} />
                  )
              }
            </div>

            {
              isRecording 
                ? (
                  <button onClick={handleStopRecording} type='button' className='flex items-center justify-center gap-2 w-full bg-teal-900 py-4 text-center text-sm text-teal-300 outline-none font-medium hover:text-teal-100'>
                    <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                    Gravando! (clique p/ interromper)
                  </button>
                )
                : (
                  <button onClick={handleSaveNote} type='button' className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'>
                    Salvar nota
                  </button>
                )
            }

          </form>
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}