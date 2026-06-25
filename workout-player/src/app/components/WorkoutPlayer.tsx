'use client'

import { useState, useRef, useEffect } from 'react'

type Phase = 'idle' | 'work' | 'rest' | 'complete'

interface Exercise {
  name: string
  workSeconds: number
  restSeconds: number
}

interface WorkoutPlayerProps {
  exercises: Exercise[]
}

export default function WorkoutPlayer({ exercises }: WorkoutPlayerProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [paused, setPaused] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const endTimeRef = useRef<number>(0)
  const remainingMsRef = useRef<number>(0)
  const exerciseIndexRef = useRef<number>(0)
  const phaseRef = useRef<Phase>('idle')
  const exercisesRef = useRef<Exercise[]>(exercises)

  // Keep exercisesRef current so interval callbacks never read a stale prop
  exercisesRef.current = exercises

  useEffect(() => () => clearTimer(), [])

  function clearTimer() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function startInterval() {
    intervalRef.current = setInterval(() => {
      const remaining = endTimeRef.current - Date.now()
      if (remaining <= 0) {
        clearTimer()
        handlePhaseComplete()
      } else {
        setCountdown(Math.ceil(remaining / 1000))
      }
    }, 100)
  }

  function startPhase(newPhase: 'work' | 'rest', durationSeconds: number) {
    clearTimer()
    phaseRef.current = newPhase
    setPhase(newPhase)
    endTimeRef.current = Date.now() + durationSeconds * 1000
    setCountdown(durationSeconds)
    startInterval()
  }

  function handlePhaseComplete() {
    const exs = exercisesRef.current
    const idx = exerciseIndexRef.current
    if (phaseRef.current === 'work') {
      if (idx === exs.length - 1) {
        phaseRef.current = 'complete'
        setPhase('complete')
      } else {
        startPhase('rest', exs[idx].restSeconds)
      }
    } else {
      const next = idx + 1
      exerciseIndexRef.current = next
      setExerciseIndex(next)
      startPhase('work', exs[next].workSeconds)
    }
  }

  function startWorkout() {
    exerciseIndexRef.current = 0
    setExerciseIndex(0)
    setPaused(false)
    startPhase('work', exercisesRef.current[0].workSeconds)
  }

  function pauseTimer() {
    remainingMsRef.current = endTimeRef.current - Date.now()
    clearTimer()
    setPaused(true)
  }

  function resumeTimer() {
    endTimeRef.current = Date.now() + remainingMsRef.current
    setPaused(false)
    startInterval()
  }

  function skipRest() {
    const next = exerciseIndexRef.current + 1
    if (next >= exercisesRef.current.length) return
    exerciseIndexRef.current = next
    setExerciseIndex(next)
    setPaused(false)
    startPhase('work', exercisesRef.current[next].workSeconds)
  }

  if (exercises.length === 0) {
    return <div>No exercises available</div>
  }

  const exercise = exercises[exerciseIndex]
  const phaseLabel = phase === 'idle' ? 'Work' : phase.charAt(0).toUpperCase() + phase.slice(1)

  return (
    <div>
      {phase === 'complete' ? (
        <div>Workout Complete!</div>
      ) : (
        <>
          <p>Exercise {exerciseIndex + 1} of {exercises.length}</p>
          <h2>{exercise.name}</h2>
          <p>{phaseLabel}</p>
          <div data-testid="countdown">{countdown}</div>

          {phase === 'idle' && (
            <button onClick={startWorkout}>Start</button>
          )}
          {(phase === 'work' || phase === 'rest') && !paused && (
            <button onClick={pauseTimer}>Pause</button>
          )}
          {(phase === 'work' || phase === 'rest') && paused && (
            <button onClick={resumeTimer}>Resume</button>
          )}
          {phase === 'rest' && (
            <button onClick={skipRest}>Skip Rest</button>
          )}
        </>
      )}
    </div>
  )
}
