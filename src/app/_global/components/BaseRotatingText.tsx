'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { motion, AnimatePresence } from 'motion/react'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const RotatingText = forwardRef((props: any, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props

  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // 글자 단위로 분리
  const splitIntoCharacters = (text: string) => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
      return Array.from(segmenter.segment(text), (seg) => seg.segment)
    }
    return Array.from(text)
  }

  // texts[currentTextIndex] -> 요소 분리
  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex]
    if (splitBy === 'characters') {
      const words = currentText.split(' ')
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }))
    }
    if (splitBy === 'words') {
      return currentText.split(' ').map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }))
    }
    if (splitBy === 'lines') {
      return currentText.split('\n').map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }))
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }))
  }, [texts, currentTextIndex, splitBy])

  // stagger 애니메이션 딜레이 계산
  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      if (staggerFrom === 'first') return index * staggerDuration
      if (staggerFrom === 'last')
        return (totalChars - 1 - index) * staggerDuration
      if (staggerFrom === 'center') {
        const center = Math.floor(totalChars / 2)
        return Math.abs(center - index) * staggerDuration
      }
      if (staggerFrom === 'random') {
        const randomIndex = Math.floor(Math.random() * totalChars)
        return Math.abs(randomIndex - index) * staggerDuration
      }
      return Math.abs((staggerFrom as number) - index) * staggerDuration
    },
    [staggerFrom, staggerDuration],
  )

  // 인덱스 변경
  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex)
      if (onNext) onNext(newIndex)
    },
    [onNext],
  )

  // 다음 텍스트
  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex)
  }, [currentTextIndex, texts.length, loop, handleIndexChange])

  // 이전 텍스트
  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex)
  }, [currentTextIndex, texts.length, loop, handleIndexChange])

  // 특정 인덱스로 점프
  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1))
      if (validIndex !== currentTextIndex) handleIndexChange(validIndex)
    },
    [texts.length, currentTextIndex, handleIndexChange],
  )

  // 초기화
  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0)
  }, [currentTextIndex, handleIndexChange])

  // 외부에서 next/previous/jumpTo/reset 호출 가능
  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
    next,
    previous,
    jumpTo,
    reset,
  ])

  // auto 모드일 경우 일정 주기로 next 실행
  useEffect(() => {
    if (!auto) return
    const intervalId = setInterval(next, rotationInterval)
    return () => clearInterval(intervalId)
  }, [next, rotationInterval, auto])

  return (
    <motion.span
      className={cn('text-rotate', mainClassName)}
      {...rest}
      layout
      transition={transition}
    >
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence
        mode={animatePresenceMode}
        initial={animatePresenceInitial}
      >
        <motion.span
          key={currentTextIndex}
          className={cn(
            splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate',
          )}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const prevCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0)
            return (
              <span
                key={wordIndex}
                className={cn('text-rotate-word', splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        prevCharsCount + charIndex,
                        array.reduce(
                          (sum, word) => sum + word.characters.length,
                          0,
                        ),
                      ),
                    }}
                    className={cn('text-rotate-element', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && (
                  <span className="text-rotate-space"> </span>
                )}
              </span>
            )
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
})

RotatingText.displayName = 'RotatingText'
export default RotatingText
