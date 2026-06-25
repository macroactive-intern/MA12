import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkoutPlayer from './WorkoutPlayer'

const singleExercise = [{ name: 'Push-ups', workSeconds: 30, restSeconds: 10 }]
const twoExercises = [
  { name: 'Push-ups', workSeconds: 30, restSeconds: 10 },
  { name: 'Squats', workSeconds: 30, restSeconds: 10 },
]

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
})

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
describe('Initial state', () => {
  it('shows the first exercise name', () => {
    render(<WorkoutPlayer exercises={twoExercises} />)
    expect(screen.getByText('Push-ups')).toBeDefined()
  })

  it('shows Exercise 1 of X', () => {
    render(<WorkoutPlayer exercises={twoExercises} />)
    expect(screen.getByText(/exercise 1 of 2/i)).toBeDefined()
  })

  it('shows Work phase ready', () => {
    render(<WorkoutPlayer exercises={twoExercises} />)
    expect(screen.getByText(/work/i)).toBeDefined()
  })

  it('shows Start button', () => {
    render(<WorkoutPlayer exercises={twoExercises} />)
    expect(screen.getByRole('button', { name: /start/i })).toBeDefined()
  })

  it('does not show Skip Rest button', () => {
    render(<WorkoutPlayer exercises={twoExercises} />)
    expect(screen.queryByRole('button', { name: /skip rest/i })).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Pause / Resume
// ---------------------------------------------------------------------------
describe('Pause / Resume', () => {
  it('pauses the countdown and resumes from the same value', async () => {
    render(<WorkoutPlayer exercises={twoExercises} />)

    fireEvent.click(screen.getByRole('button', { name: /start/i }))

    // Advance 5 seconds into the work phase
    act(() => { vi.advanceTimersByTime(5000) })
    const countdownAfterWork = screen.getByTestId('countdown').textContent

    // Pause
    fireEvent.click(screen.getByRole('button', { name: /pause/i }))
    const countdownWhenPaused = screen.getByTestId('countdown').textContent

    // Advance while paused — countdown must not change
    act(() => { vi.advanceTimersByTime(5000) })
    expect(screen.getByTestId('countdown').textContent).toBe(countdownWhenPaused)

    // Resume and advance
    fireEvent.click(screen.getByRole('button', { name: /resume/i }))
    act(() => { vi.advanceTimersByTime(1000) })

    // Countdown should have ticked down from the paused value
    const countdownAfterResume = screen.getByTestId('countdown').textContent
    expect(Number(countdownAfterResume)).toBeLessThan(Number(countdownWhenPaused))
  })
})

// ---------------------------------------------------------------------------
// Skip Rest
// ---------------------------------------------------------------------------
describe('Skip Rest', () => {
  it('shows Skip Rest button during rest phase and skips to next work phase', () => {
    render(<WorkoutPlayer exercises={twoExercises} />)

    fireEvent.click(screen.getByRole('button', { name: /start/i }))

    // Advance past the full work phase to enter rest
    act(() => { vi.advanceTimersByTime(30000) })

    expect(screen.getByRole('button', { name: /skip rest/i })).toBeDefined()

    fireEvent.click(screen.getByRole('button', { name: /skip rest/i }))

    // Should be back to Work phase for next exercise
    expect(screen.getByText(/work/i)).toBeDefined()
    expect(screen.getByText('Squats')).toBeDefined()

    // Skip Rest button should be gone
    expect(screen.queryByRole('button', { name: /skip rest/i })).toBeNull()

    // Timer must not keep running from old rest interval
    act(() => { vi.advanceTimersByTime(1000) })
    const countdown = Number(screen.getByTestId('countdown').textContent)
    expect(countdown).toBeLessThanOrEqual(30)
  })
})

// ---------------------------------------------------------------------------
// Last exercise boundary
// ---------------------------------------------------------------------------
describe('Last exercise boundary', () => {
  it('completes workout without entering rest or looping', () => {
    render(<WorkoutPlayer exercises={singleExercise} />)

    fireEvent.click(screen.getByRole('button', { name: /start/i }))

    // Advance past the work interval
    act(() => { vi.advanceTimersByTime(30000) })

    // Workout should be complete
    expect(screen.getByText(/complete/i)).toBeDefined()

    // Must not enter rest
    expect(screen.queryByRole('button', { name: /skip rest/i })).toBeNull()

    // Must not loop back to exercise 1 countdown
    expect(screen.queryByText(/exercise 1 of 1/i)).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Auto transition
// ---------------------------------------------------------------------------
describe('Auto transition', () => {
  it('transitions Work → Rest → Work for next exercise automatically', () => {
    render(<WorkoutPlayer exercises={twoExercises} />)

    fireEvent.click(screen.getByRole('button', { name: /start/i }))

    // End of first work phase → rest starts
    act(() => { vi.advanceTimersByTime(30000) })
    expect(screen.getByText(/rest/i)).toBeDefined()

    // End of rest → second exercise work starts
    act(() => { vi.advanceTimersByTime(10000) })
    expect(screen.getByText(/work/i)).toBeDefined()
    expect(screen.getByText('Squats')).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// Empty exercises
// ---------------------------------------------------------------------------
describe('Empty exercises', () => {
  it('does not crash and shows no exercises available message', () => {
    render(<WorkoutPlayer exercises={[]} />)
    expect(screen.getByText(/no exercises available/i)).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// Unmount cleanup
// ---------------------------------------------------------------------------
describe('Unmount cleanup', () => {
  it('clears the timer on unmount without errors', () => {
    const spy = vi.spyOn(console, 'error')

    const { unmount } = render(<WorkoutPlayer exercises={twoExercises} />)
    fireEvent.click(screen.getByRole('button', { name: /start/i }))

    unmount()
    act(() => { vi.advanceTimersByTime(5000) })

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })
})
