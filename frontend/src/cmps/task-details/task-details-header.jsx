// import CardIcon from '../../assets/img/svg/card-icon.svg'
// import { Link, useParams } from 'react-router-dom'
// import { boardService } from '../../services/board.service'
// import { useEffect, useRef, useState } from 'react'
// import { useCloseOnOutsideClick } from '../../customHooks/useCloseOnOutsideClick'

// export function TaskDetailsHeader({ board, onChangeTitle }) {
//   const [group, setGroup] = useState()
//   const { taskId } = useParams()
//   const [task, setTask] = useState(null)
//   const [title, setTitle] = useState('')
//   const [isListening, setIsListening] = useCloseOnOutsideClick(onSubmit, '.edit-title-form', 'h1')

//   const inputRef = useRef(null);
//   const taskTitleRef = useRef(null);

//   useEffect(() => {
//     if (board) {
//       setTask(boardService.getTaskById(board, taskId))
//     }
//   }, [board, taskId])

//   useEffect(() => {
//     if (task) {
//       setTitle(task.title);
//       setGroup(boardService.getGroupByTaskId(board, task._id))
//     }
//   }, [task, board])

//   function toggleForm(status) {
//     setIsListening(status)
//   }

//   function handleFocus(ev) {
//     onSubmit(ev)
//   }

//   function handleChange(ev) {
//     const { value } = ev.target
//     setTitle(value)
//   }

//   async function onSubmit(ev) {
//     if (ev) {
//       ev.preventDefault()
//     }
//     if (title && title !== task.title) {
//       toggleForm(false)
//       await onChangeTitle(title)
//     }
//   }

//   if (!task) return <div></div>
//   return (
//     <header className="task-header flex">
//       <div className="title-img">
//         <img src={CardIcon} className="card-title-img" alt="card-icon" />
//       </div>
//       <div className="task-title">
//         {!isListening && (
//           <h1 ref={taskTitleRef} onClick={() => toggleForm(true)}>
//             {task.title}
//           </h1>
//         )}
//         {isListening && (
//           <form className="edit-title-form flex align-center" onSubmit={onSubmit}>
//             <input ref={inputRef} className='input' type='text' value={title} onChange={(ev) => handleChange(ev)} onFocus={handleFocus} autoFocus />
//           </form>
//         )}
//         {group && (
//           <p>
//             in list <Link>{group.title}</Link>
//           </p>
//         )}
//       </div>
//     </header>
//   )
// }

import CardIcon from '../../assets/img/svg/card-icon.svg'
import { Link, useParams } from 'react-router-dom'
import { boardService } from '../../services/board.service'
import { useEffect, useState } from 'react'

export function TaskDetailsHeader({ board, onChangeTitle }) {
  const [group, setGroup] = useState()
  const { taskId } = useParams()
  const [task, setTask] = useState(null)
  const [title, setTitle] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (board) {
      setTask(boardService.getTaskById(board, taskId))
    }
  }, [board, taskId])

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setGroup(boardService.getGroupByTaskId(board, task._id))
    }
  }, [task, board])

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleInputBlur() {
    if (title) {
      onChangeTitle(title)
    }
    setIsEditing(false)
  }

  function handleChange(ev) {
    const { value } = ev.target
    setTitle(value)
  }

  async function onSubmit() {
    handleInputBlur()
  }

  if (!task) return <div></div>
  return (
    <header className="task-header flex">
      <div className="title-img">
        <img src={CardIcon} className="card-title-img" alt="card-icon" />
      </div>
      <div className="task-title">
        {!isEditing && (
          <h1 onClick={handleEditClick}>
            {task.title}
          </h1>
        )}
        {isEditing && (
          <form className="edit-title-form" onSubmit={onSubmit}>
            <input
              className='input'
              type='text'
              value={title}
              onChange={handleChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          </form>
        )}
        {group && (
          <p>
            in list <Link>{group.title}</Link>
          </p>
        )}
      </div>
    </header>
  )
}