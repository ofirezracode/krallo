import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import GroupList from '../cmps/group-list'
import { loadBoards } from '../store/board.actions'
import { boardService } from '../services/board.service.local'
import BoardHeader from '../cmps/board-header'
// import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/car.actions.js'

// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { carService } from '../services/car.service.js'

export default function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { boardId } = useParams()
  const [board, setBoard] = useState(boardService.getEmptyBoard())

  useEffect(() => {
    loadBoards()
  }, [])

  useEffect(() => {
    if (boards.length !== 0) setBoard(...boards.filter((board) => board._id === boardId))
  }, [boards])

  // async function onRemoveCar(carId) {
  //     try {
  //         await removeCar(carId)
  //         showSuccessMsg('Car removed')
  //     } catch (err) {
  //         showErrorMsg('Cannot remove car')
  //     }
  // }

  // async function onAddCar() {
  //     const car = carService.getEmptyCar()
  //     car.vendor = prompt('Vendor?')
  //     try {
  //         const savedCar = await addCar(car)
  //         showSuccessMsg(`Car added (id: ${savedCar._id})`)
  //     } catch (err) {
  //         showErrorMsg('Cannot add car')
  //     }
  // }

  // async function onUpdateCar(car) {
  //     const price = +prompt('New price?')
  //     const carToSave = { ...car, price }
  //     try {
  //         const savedCar = await updateCar(carToSave)
  //         showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
  //     } catch (err) {
  //         showErrorMsg('Cannot update car')
  //     }
  // }

  // function onAddToCart(car){
  //     console.log(`Adding ${car.vendor} to Cart`)
  //     addToCart(car)
  //     showSuccessMsg('Added to Cart')
  // }

  // function onAddCarMsg(car) {
  //     console.log(`TODO Adding msg to car`)
  // }

  console.log('board', board)
  let boardStyle = {}
  if (board.style) {
    if (board.style.type === 'bgColor') {
      boardStyle = { backgroundColor: board.style.bgColor }
    } else if (board.style.type === 'img') {
      boardStyle = {
        backgroundImage: `url(${board.style.imgUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
  }
  console.log('boardStyle', boardStyle)
  return (
    <section style={boardStyle} className="board-index">
      {/* headers */}
      <BoardHeader board={board}></BoardHeader>
      <GroupList groups={board.groups}></GroupList>
      {/* <h3>Cars App</h3>
            <main>
                <button onClick={onAddCar}>Add Car ⛐</button>
                <ul className="car-list">
                    {cars.map(car =>
                        <li className="car-preview" key={car._id}>
                            <h4>{car.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${car.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveCar(car._id) }}>x</button>
                                <button onClick={() => { onUpdateCar(car) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddCarMsg(car) }}>Add car msg</button>
                            <button className="buy" onClick={() => { onAddToCart(car) }}>Add to cart</button>
                        </li>)
                    }
                </ul>
            </main> */}
    </section>
  )
}
