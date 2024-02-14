/*
  # Importing Libs
*/
import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'
/*
  # Note Card Interface
*/
interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  },
  onNoteDeleated: (id: string) => void
}

export function NoteCard({ note, onNoteDeleated }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.DialogTrigger className='rounded-md text-left flex flex-col bg-teal-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-teal-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-teal-50'>
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
        </span>
        <p className='text-sm leading-6 text-teal-100'>
          {note.content}
        </p>

        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/45 to-black/0 pointer-events-none'/>
      </Dialog.DialogTrigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/40'/>
        <Dialog.DialogContent className='z-1 overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60svh] bg-teal-700 md:rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute right-0 top-0 bg-teal-800 p-1.5 text-teal-50 hover:text-teal-100'>
            <X className='size-5' />
          </Dialog.Close>
          
          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-teal-50'>
              {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
            </span>
            <p className='text-sm leading-6 text-teal-100'>
              {note.content}
            </p>
          </div>

          <button onClick={() => onNoteDeleated(note.id)} type='button' className='w-full bg-teal-800 py-4 text-center text-sm text-teal-50 outline-none font-medium group'>
            Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
          </button>
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}