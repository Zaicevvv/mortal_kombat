import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import AnimatedComponent from '../components/AnimatedComponent/AnimatedComponent'
import { characters } from '../data'
import VCTransition from './transitions/VCTransition.module.css'
import css from './pages.module.css'

const VSPage = () => {
  const [q, setQ] = useState(1)
  const [w, setW] = useState(1)
  const [e, setE] = useState(1)
  const [r, setR] = useState(1)
  const [t, setT] = useState(1)
  const [y, setY] = useState(1)
  const [qAnimation, setQAnimation] = useState(false)
  const [wAnimation, setWAnimation] = useState(false)
  const [eAnimation, setEAnimation] = useState(false)
  const [rAnimation, setRAnimation] = useState(false)
  const [tAnimation, setTAnimation] = useState(false)
  const [yAnimation, setYAnimation] = useState(false)
  const [mode, setMode] = useState('NONE')

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => navigate('/'), 4000)
  }, [])

  useEffect(() => {
    if ('' + q + w + e + r + t + y === '133133') {
      return setMode('BOTH PLAYERS WITH HALF HP')
    }
    if ('' + q + w + e + r + t + y === '133111') {
      return setMode('FIRST PLAYER WITH HALF HP')
    }
    if ('' + q + w + e + r + t + y === '111133') {
      return setMode('SECOND PLAYER WITH HALF HP')
    }
    if ('' + q + w + e + r + t + y === '123456') {
      return setMode('UKRAIN WINS')
    }
    setMode('NONE')
  }, [q, w, e, r, t, y])

  const handleVCChange = (evt) => {
    switch (evt.code) {
      case 'KeyQ':
        if (+q > 5) {
          setQ(1)
        } else {
          setQ(+q + 1)
        }
        setQAnimation(true)
        setTimeout(() => setQAnimation(false), 410)
        break
      case 'KeyW':
        if (+w > 5) {
          setW(1)
        } else {
          setW(+w + 1)
        }
        setWAnimation(true)
        setTimeout(() => setWAnimation(false), 410)
        break
      case 'KeyE':
        if (+e > 5) {
          setE(1)
        } else {
          setE(+e + 1)
        }
        setEAnimation(true)
        setTimeout(() => setEAnimation(false), 410)
        break
      case 'KeyR':
        if (+r > 5) {
          setR(1)
        } else {
          setR(+r + 1)
        }
        setRAnimation(true)
        setTimeout(() => setRAnimation(false), 410)
        break
      case 'KeyT':
        if (+t > 5) {
          setT(1)
        } else {
          setT(+t + 1)
        }
        setTAnimation(true)
        setTimeout(() => setTAnimation(false), 410)
        break
      case 'KeyY':
        if (+y > 5) {
          setY(1)
        } else {
          setY(+y + 1)
        }
        setYAnimation(true)
        setTimeout(() => setYAnimation(false), 410)
        break
      default:
        console.log('not control key')
    }
  }

  return (
    <AnimatedComponent>
      <main className={css.main} tabIndex={0} onKeyDown={handleVCChange}>
        <header className={css.charactersHeader}>
          <h1 className={css.title}>BATTLE 1</h1>
        </header>
        <div className={css.vsContainer}>
          <img
            className={css.firstFighter}
            alt="fighter"
            src={
              characters.find((el) => +el.id === +params.players.split('&')[0])
                .img
            }
          />
          <h2 className={css.vs}>VS</h2>
          <img
            className={css.secondFighter}
            alt="fighter"
            src={
              characters.find((el) => +el.id === +params.players.split('&')[1])
                .img
            }
          />
        </div>
        <footer className={css.vsFooter}>
          <CSSTransition
            in={qAnimation}
            timeout={400}
            classNames={VCTransition}
          >
            <div className={css.vcItem}>{q}</div>
          </CSSTransition>
          <CSSTransition
            in={wAnimation}
            timeout={200}
            classNames={VCTransition}
          >
            <div className={css.vcItem}>{w}</div>
          </CSSTransition>
          <CSSTransition
            in={eAnimation}
            timeout={200}
            classNames={VCTransition}
          >
            <div className={css.vcItem}>{e}</div>
          </CSSTransition>
          <CSSTransition
            in={rAnimation}
            timeout={200}
            classNames={VCTransition}
          >
            <div className={css.vcItem}>{r}</div>
          </CSSTransition>
          <CSSTransition
            in={tAnimation}
            timeout={200}
            classNames={VCTransition}
          >
            <div className={css.vcItem}>{t}</div>
          </CSSTransition>
          <CSSTransition
            in={yAnimation}
            timeout={200}
            classNames={VCTransition}
          >
            <div className={css.vcItem}>{y}</div>
          </CSSTransition>
        </footer>
        <h2 className={css.mode}>MODE: {mode}</h2>
      </main>
    </AnimatedComponent>
  )
}

export default VSPage
