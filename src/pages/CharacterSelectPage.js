import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import AnimatedComponent from '../components/AnimatedComponent/AnimatedComponent'
import { characters } from '../data'
import firstCharacterTransition from './transitions/firstCharacterTransition.module.css'
import secondCharacterTransition from './transitions/secondCharacterTransition.module.css'
import css from './pages.module.css'

const CharacterSelectPage = () => {
  const [isFirstPlayer, setIsFirstPlayer] = useState(true)
  const [player1, setPlayer1] = useState(1)
  const [player2, setPlayer2] = useState(5)
  const [firstCharacterChange, setFirstCharacterChange] = useState(false)
  const [secondCharacterChange, setSecondCharacterChange] = useState(false)

  const navigate = useNavigate()

  const handleChangeCharacter = (e) => {
    if (e.code === 'Space') {
      if (isFirstPlayer) {
        setIsFirstPlayer(false)
      } else {
        setTimeout(() => navigate(`/vs/${player1}&${player2}`), 2000)
      }
      return
    }

    switch (e.code) {
      case 'ArrowUp':
        if (isFirstPlayer) {
          if (+player1 - 5 > 0) {
            setPlayer1(+player1 - 5)
          } else {
            setPlayer1(+player1 + 10)
          }
        } else {
          if (+player2 - 5 > 0) {
            setPlayer2(+player2 - 5)
          } else {
            setPlayer2(+player2 + 10)
          }
        }
        break
      case 'ArrowDown':
        if (isFirstPlayer) {
          if (+player1 + 5 < 16) {
            setPlayer1(+player1 + 5)
          } else {
            setPlayer1(+player1 - 10)
          }
        } else {
          if (+player2 + 5 < 16) {
            setPlayer2(+player2 + 5)
          } else {
            setPlayer2(+player2 - 10)
          }
        }
        break
      case 'ArrowLeft':
        if (isFirstPlayer) {
          if (+player1 === 1) {
            setPlayer1(15)
          } else {
            setPlayer1(+player1 - 1)
          }
        } else {
          if (+player2 === 1) {
            setPlayer2(15)
          } else {
            setPlayer2(+player2 - 1)
          }
        }
        break
      case 'ArrowRight':
        if (isFirstPlayer) {
          if (+player1 === 15) {
            setPlayer1(1)
          } else {
            setPlayer1(+player1 + 1)
          }
        } else {
          if (+player2 === 15) {
            setPlayer2(1)
          } else {
            setPlayer2(+player2 + 1)
          }
        }
        break
      default:
        console.log('not control key')
    }
    if (isFirstPlayer) {
      setFirstCharacterChange(true)
      setTimeout(() => setFirstCharacterChange(false), 300)
    } else {
      setSecondCharacterChange(true)
      setTimeout(() => setSecondCharacterChange(false), 300)
    }
  }

  return (
    <AnimatedComponent>
      <main
        id="main"
        className={css.main}
        tabIndex={0}
        onKeyDown={handleChangeCharacter}
      >
        <header className={css.charactersHeader}>
          <h1 className={css.title}>SELECT YOUR FIGHTER</h1>
        </header>
        <div className={css.container}>
          <CSSTransition
            in={firstCharacterChange}
            timeout={200}
            classNames={firstCharacterTransition}
          >
            <img
              className={css.firstChoice}
              alt="choosenCharacter"
              src={characters.find((el) => +el.id === +player1).img}
            />
          </CSSTransition>
          <ul className={css.grid}>
            {characters.map((el) => (
              <li key={el.id} className={css.gridItem}>
                {+player1 === +el.id && (
                  <span className={css.firstIndicator}>1</span>
                )}
                <img
                  className={`${css.icon} ${
                    +player1 === +player2
                      ? +player1 === +el.id && css.both
                      : +player1 === +el.id
                      ? css.lime
                      : +player2 === +el.id
                      ? css.red
                      : ''
                  }`}
                  alt="character"
                  src={el.icon}
                />
                {+player2 === +el.id && (
                  <span className={css.secondIndicator}>2</span>
                )}
              </li>
            ))}
          </ul>
          <CSSTransition
            in={secondCharacterChange}
            timeout={200}
            classNames={secondCharacterTransition}
          >
            <img
              className={css.secondChoice}
              alt="choosenCharacter"
              src={characters.find((el) => +el.id === +player2).img}
            />
          </CSSTransition>
        </div>
        <footer className={css.charactersHeader}>
          <h2 className={css.title}>PRESS SPACE TO SELECT</h2>
        </footer>
      </main>
    </AnimatedComponent>
  )
}

export default CharacterSelectPage
