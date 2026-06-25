# APPROACH.md

# MA12 — Workout Player Approach

## Goal

Build a single client-side React component called `WorkoutPlayer` for a Next.js app.

The component will guide a client through a list of workout exercises. Each exercise has a work interval and a rest interval. The player starts paused, then the user presses `Start` to begin.

The component must support:

* Starting the workout
* Showing the current exercise
* Showing the current phase: `Work` or `Rest`
* Showing an accurate countdown
* Pausing and resuming without resetting the timer
* Automatically moving from Work to Rest
* Automatically moving from Rest to the next exercise
* Skipping a rest interval
* Completing safely at the end of the final exercise
* Cleaning up timers when the component unmounts

The most important technical part is the timer. I will not rely on `setInterval(fn, 1000)` as the source of truth. Instead, I will calculate remaining time from real timestamps.

---

## Component structure

This task does not need a database or backend API. It is a front-end component only.

I will create:

```txt
components/WorkoutPlayer.tsx
```

The component will be a client component because it uses React state, refs, effects, and browser timers.

```tsx
'use client'
```

The test file will be:

```txt
components/WorkoutPlayer.test.tsx
```

The component will accept this prop shape:

```tsx
interface WorkoutPlayerProps {
  exercises: Array<{
    name: string
    work_seconds: number
    rest_seconds: number
  }>
}
```

I will also define a phase type:

```tsx
type Phase = 'idle' | 'work' | 'rest' | 'complete'
```

The component will not fetch data. It receives all workout data through props.

---

## Component API

### Props

```tsx
<WorkoutPlayer
  exercises={[
    {
      name: 'Push Ups',
      work_seconds: 40,
      rest_seconds: 20,
    },
    {
      name: 'Squats',
      work_seconds: 40,
      rest_seconds: 20,
    },
  ]}
/>
```

### Input

The component receives an array of exercises.

Each exercise contains:

| Field          | Type     | Purpose                                             |
| -------------- | -------- | --------------------------------------------------- |
| `name`         | `string` | The exercise name shown to the user                 |
| `work_seconds` | `number` | The length of the work interval                     |
| `rest_seconds` | `number` | The length of the rest interval after that exercise |

### Output / display

The component will display:

* Current exercise name
* Current phase
* Countdown in seconds
* Exercise number, for example `Exercise 2 of 5`
* `Start` button before the workout begins
* `Pause` button while the timer is running
* `Resume` button when paused after starting
* `Skip Rest` button only during Rest phase
* `Workout complete!` message when finished
* Total completed exercises when finished

---

## No endpoints or routes

This task does not require API endpoints or route handlers.

There is no need for:

* Database tables
* API routes
* Server actions
* Authentication
* Persistence
* External services

All state lives inside the `WorkoutPlayer` component.

---

## State design

I will store only the values needed to control the workout.

### Stored in `useState`

```tsx
const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
```

Tracks which exercise is currently active.

---

```tsx
const [phase, setPhase] = useState<Phase>('idle')
```

Tracks whether the workout is idle, in work, in rest, or complete.

---

```tsx
const [isRunning, setIsRunning] = useState(false)
```

Tracks whether the countdown is currently active.

This is separate from `phase` because the workout can be in a `work` or `rest` phase but paused.

---

```tsx
const [remainingMs, setRemainingMs] = useState(0)
```

Tracks the remaining time in milliseconds.

This is needed so the timer can pause at the exact remaining time and resume from there.

---

### Stored in `useRef`

```tsx
const endTimeRef = useRef<number | null>(null)
```

Stores the real timestamp when the current phase should end.

Example:

```tsx
endTimeRef.current = Date.now() + durationMs
```

This is a ref because changing it does not need to cause a render by itself.

---

```tsx
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
```

Stores the active interval ID so it can be cleared.

This is important for:

* Pause
* Resume
* Skip Rest
* Phase transitions
* Workout completion
* Component unmount

---

### Values derived from state

I will avoid storing values that can be calculated.

```tsx
const totalExercises = exercises.length
```

Derived from props.

---

```tsx
const currentExercise = exercises[currentExerciseIndex]
```

Derived from `exercises` and `currentExerciseIndex`.

---

```tsx
const displaySeconds = Math.ceil(remainingMs / 1000)
```

Derived from `remainingMs`.

I will use `Math.ceil` so the timer does not show `0` while there is still part of a second remaining.

---

```tsx
const exerciseDisplay = `Exercise ${currentExerciseIndex + 1} of ${totalExercises}`
```

Derived from `currentExerciseIndex` and `totalExercises`.

---

```tsx
const showSkipRest = phase === 'rest' && phase !== 'complete'
```

Derived from `phase`.

---

## Timer implementation

The timer must be accurate to within ±1 second over a 60-second interval.

I will not make the countdown work by doing this:

```tsx
setInterval(() => {
  setRemainingSeconds((previous) => previous - 1)
}, 1000)
```

That approach can drift because `setInterval` is not guaranteed to run exactly every 1000ms.

Problems with relying on `setInterval(fn, 1000)`:

* Browser timers can be delayed.
* React rendering can take time.
* The browser event loop may be busy.
* Mobile devices may throttle background work.
* A 1000ms interval might actually fire after 1010ms, 1100ms, or later.
* Small delays can build up over a longer workout.

Instead, I will use real timestamps.

When a phase starts, I will calculate the exact target end time:

```tsx
endTimeRef.current = Date.now() + durationMs
```

On each timer tick, I will calculate the remaining time from the current timestamp:

```tsx
const remaining = endTimeRef.current - Date.now()
```

This means the interval is only used to refresh the UI. It is not the source of truth.

If the interval fires late, the countdown will still be corrected by `Date.now()`.

---

## Timer interval frequency

I will use a short interval such as 250ms.

Example:

```tsx
intervalRef.current = setInterval(tick, 250)
```

Reason:

The UI only displays seconds, but checking more often than once per second makes transitions feel more responsive and reduces the chance that the UI visibly lags after the phase reaches zero.

The timer accuracy still comes from `Date.now()`, not from the interval frequency.

---

## Main timer helper functions

I plan to split the timer behavior into clear helper functions.

### `clearTimer`

Purpose:

* Stop any active interval.
* Prevent duplicate intervals.
* Prevent old timers from continuing after phase changes.

Behavior:

```tsx
function clearTimer() {
  if (intervalRef.current) {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }
}
```

This should be called before starting a new interval.

---

### `startPhase`

Purpose:

Start a specific phase with a specific duration.

Inputs:

* phase to start
* duration in seconds

Behavior:

1. Clear the existing timer.
2. Convert seconds to milliseconds.
3. Store the remaining milliseconds in state.
4. Set the new phase.
5. Set `isRunning` to `true`.
6. Set `endTimeRef.current`.
7. Start the interval.

Example:

```tsx
function startPhase(nextPhase: 'work' | 'rest', durationSeconds: number) {
  clearTimer()

  const durationMs = Math.max(0, durationSeconds * 1000)

  setPhase(nextPhase)
  setRemainingMs(durationMs)
  setIsRunning(true)

  endTimeRef.current = Date.now() + durationMs

  intervalRef.current = setInterval(tick, 250)
}
```

---

### `startWorkout`

Purpose:

Start the first exercise.

Behavior:

1. If there are no exercises, do nothing.
2. Set `currentExerciseIndex` to `0`.
3. Start the first exercise's work interval.
4. The phase becomes `work`.

---

### `tick`

Purpose:

Update the countdown based on real elapsed time.

Behavior:

1. Read `endTimeRef.current`.
2. Calculate remaining milliseconds:

```tsx
const remaining = endTimeRef.current - Date.now()
```

3. If remaining time is greater than `0`, update `remainingMs`.
4. If remaining time is `0` or less:

   * set `remainingMs` to `0`
   * clear the interval
   * transition to the next phase

Important:

The tick function should not blindly subtract `1`. It should always calculate from the timestamp.

---

### `pauseTimer`

Purpose:

Pause the current countdown without resetting it.

Behavior:

1. If there is no active timer, do nothing.
2. Calculate the exact remaining time:

```tsx
const pausedRemaining = Math.max(0, endTimeRef.current - Date.now())
```

3. Store that in `remainingMs`.
4. Set `isRunning` to `false`.
5. Clear the interval.

Paused time should not count against the countdown.

---

### `resumeTimer`

Purpose:

Resume from the stored remaining time.

Behavior:

1. If the workout is complete or idle, do not resume.
2. Create a new end time:

```tsx
endTimeRef.current = Date.now() + remainingMs
```

3. Set `isRunning` to `true`.
4. Start a new interval.

This means if the user pauses with 25 seconds left, waits 10 seconds, then resumes, the workout still resumes from about 25 seconds.

---

### `handlePhaseComplete`

Purpose:

Move to the correct next phase when the current timer reaches zero.

Behavior depends on the current phase.

#### If the current phase is `work`

Check whether this is the final exercise.

If it is the final exercise:

```txt
Workout complete
```

If it is not the final exercise:

```txt
Start rest phase for the current exercise
```

#### If the current phase is `rest`

Move to the next exercise and start its work interval.

---

### `skipRest`

Purpose:

Allow the user to skip a rest interval and immediately start the next exercise.

Behavior:

1. Only run if `phase === 'rest'`.
2. Clear the existing timer immediately.
3. Check whether there is another exercise.
4. If yes:

   * increment `currentExerciseIndex`
   * start the next exercise's work interval
5. If no:

   * complete the workout

The existing rest timer must be cleared before moving on. Otherwise, the old interval could still fire and cause duplicate transitions.

---

### `completeWorkout`

Purpose:

Finish the workout safely.

Behavior:

1. Clear any active interval.
2. Set `phase` to `complete`.
3. Set `isRunning` to `false`.
4. Set `remainingMs` to `0`.

Display:

```txt
Workout complete!
Completed X exercises.
```

---

## Pause / resume state flow

Example:

The user is doing a 40-second work interval.

### Start

```txt
phase = work
isRunning = true
remainingMs = 40000
endTimeRef.current = Date.now() + 40000
```

### After 15 seconds

The displayed countdown is about 25 seconds.

### User clicks Pause

The component calculates:

```tsx
remainingMs = endTimeRef.current - Date.now()
```

Then it clears the interval.

State becomes roughly:

```txt
phase = work
isRunning = false
remainingMs = 25000
```

The phase stays as `work`.

### User waits 10 seconds while paused

Nothing changes because the interval has been cleared.

The display still shows about 25 seconds.

### User clicks Resume

The component sets:

```tsx
endTimeRef.current = Date.now() + remainingMs
```

Then it starts a new interval.

State becomes:

```txt
phase = work
isRunning = true
remainingMs = 25000
```

The countdown continues from 25 seconds, not 40 seconds.

---

## Skip Rest interval clearing strategy

Skipping rest is a risky part of this component because the rest timer is already running.

When the user clicks `Skip Rest`, the first thing I will do is call:

```tsx
clearTimer()
```

Then I will move the workout to the next exercise.

This prevents the old rest interval from firing later.

Without clearing the interval, this bug could happen:

1. User enters Rest for Exercise 2.
2. Rest interval starts.
3. User clicks Skip Rest.
4. Component moves to Exercise 3 Work.
5. Old rest interval still fires.
6. Old interval incorrectly triggers another transition.
7. Workout skips an exercise or gets into an unexpected state.

To avoid this, every new phase transition will clear the previous interval first.

---

## Stale closure strategy

A stale closure can happen when an interval callback captures old React state.

Example problem:

```tsx
setInterval(() => {
  console.log(phase)
}, 250)
```

If `phase` changes later, the interval callback might still use the old value of `phase`.

This matters because `tick` needs to know what phase and exercise the player is currently on.

To avoid stale closure problems, I will use one of these strategies:

1. Keep transition logic in functions that use current state carefully.
2. Use functional state updates when moving to the next exercise.
3. Use refs for values the interval callback needs to read reliably.
4. Clear and recreate the interval when a new phase starts.

The main rule is:

The interval should not keep running across phase changes. When the phase changes, the old interval gets cleared and a new interval starts for the new phase.

This reduces the chance of the timer callback using old state.

---

## Cleanup strategy

The component must clean up timers when it unmounts.

I will add a `useEffect` cleanup:

```tsx
useEffect(() => {
  return () => {
    clearTimer()
  }
}, [])
```

This prevents:

* State updates after unmount
* Console errors
* Duplicate timers
* Memory leaks

This also satisfies the acceptance criteria that navigating away while the timer is running should not produce console errors.

---

## Last exercise boundary decision

I will complete the workout immediately after the final exercise's work interval reaches zero.

I will not run the final rest interval.

Reason:

Rest is useful between exercises. After the final exercise, there is no next exercise to prepare for. Completing immediately gives the user a cleaner finish and avoids showing a pointless final rest timer.

Example with three exercises:

```txt
Exercise 1 Work
Exercise 1 Rest
Exercise 2 Work
Exercise 2 Rest
Exercise 3 Work
Workout complete
```

There is no `Exercise 3 Rest`.

---

## Edge cases

### Empty exercises array

If `exercises.length === 0`, the component should not crash.

Display:

```txt
No exercises available.
```

No timer controls should be shown.

---

### One exercise only

If there is only one exercise, the workout should complete after that exercise's work interval ends.

It should not enter Rest.

It should not loop back to the start.

---

### Final exercise work interval ends

When the final work interval reaches zero:

1. Clear the timer.
2. Set phase to `complete`.
3. Set running to `false`.
4. Show completion message.

---

### Skip Rest on the last exercise

This should not normally happen because I will not create a rest phase after the final exercise.

If it somehow happens defensively, clicking Skip Rest should complete the workout safely instead of crashing.

---

### Zero-second work interval

The brief does not specify whether `0` is allowed.

I will make the component defensive.

If `work_seconds` is `0`, the component should immediately move to the next valid phase:

* If it is not the last exercise, move to Rest.
* If it is the last exercise, complete the workout.

---

### Zero-second rest interval

If `rest_seconds` is `0`, the component should immediately move to the next exercise's work interval.

---

### Negative interval values

The prop type allows `number`, but the brief does not define validation.

I will not build a full validation system, but I will avoid negative timers by clamping durations to zero:

```tsx
Math.max(0, seconds * 1000)
```

This prevents a negative countdown from being displayed.

---

### Pausing when already paused

If the timer is already paused, clicking pause should do nothing.

The UI should normally prevent this because it will show `Resume`, not `Pause`.

---

### Resuming after completion

If the workout is complete, Resume should not appear and should not restart the workout.

---

### Unmount while running

If the component unmounts while the timer is active, the interval should be cleared.

No state updates should run after unmount.

---

### Duplicate timers

Before starting any new timer, I will clear the old one.

This avoids multiple intervals running at the same time.

---

## Libraries and packages

### Next.js

Used for the project framework.

The component will live inside a Next.js app created with:

```bash
npx create-next-app@latest workout-player --typescript --tailwind --app --no-src-dir
```

---

### React

Used for the component state, refs, effects, and rendering.

Main React features used:

* `useState`
* `useRef`
* `useEffect`

---

### TypeScript

Used to define the component props and phase types.

This helps catch incorrect props and invalid phase values.

---

### Tailwind CSS

Used for basic styling.

The styling is not the main focus of the task, but Tailwind can make the component readable and mobile-friendly quickly.

---

### Vitest

Used as the test runner.

The task specifically asks for component tests with Vitest.

---

### `@vitejs/plugin-react`

Used so Vitest can test React components correctly.

---

### `@testing-library/react`

Used to render the component and assert what the user sees.

Tests should focus on behavior rather than implementation details.

---

### `@testing-library/user-event`

Used to simulate user actions like clicking Start, Pause, Resume, and Skip Rest.

---

### `jsdom`

Used to provide a browser-like environment for component tests.

---

## Testing approach

I will write tests before finishing the implementation.

The required tests are:

### Pause / Resume test

Test flow:

1. Render the component.
2. Click `Start`.
3. Advance fake timers.
4. Confirm countdown decreased.
5. Click `Pause`.
6. Advance fake timers again.
7. Confirm countdown did not change while paused.
8. Click `Resume`.
9. Advance fake timers.
10. Confirm countdown continues from the paused value.

This proves paused time does not count against the timer.

---

### Skip Rest test

Test flow:

1. Render a workout with at least two exercises.
2. Click `Start`.
3. Advance timers until the first work interval ends.
4. Confirm the player is in Rest phase.
5. Confirm `Skip Rest` is visible.
6. Click `Skip Rest`.
7. Confirm the next exercise appears.
8. Confirm the phase is Work.
9. Advance timers to make sure the old rest timer does not cause an extra transition.

This proves Skip Rest clears the existing interval.

---

### Last exercise boundary test

Test flow:

1. Render a workout with one exercise.
2. Click `Start`.
3. Advance timers past the work interval.
4. Confirm `Workout complete!` is shown.
5. Confirm Rest is not shown.
6. Confirm the workout does not loop back to Exercise 1.

This proves the final exercise boundary is handled correctly.

---

### Additional tests

I will also add tests for:

* Initial render state
* Work to Rest transition
* Rest to next Work transition
* Empty exercise array
* Unmount cleanup

---

## Fake timer testing notes

Because the component uses timers, tests should use fake timers.

Example:

```tsx
vi.useFakeTimers()
```

Since the implementation uses `Date.now()`, the tests may also need to control system time with Vitest.

Example:

```tsx
vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
```

Then tests can advance time using:

```tsx
vi.advanceTimersByTime(1000)
```

React state updates caused by timers should be wrapped in `act`.

Example:

```tsx
act(() => {
  vi.advanceTimersByTime(1000)
})
```

This keeps React Testing Library tests reliable.

---

## Quality checks

Before finishing, I will run:

```bash
npm run test:run
```

I will also run:

```bash
npm run build
```

If the project has linting available, I will run:

```bash
npm run lint
```

The final `BEFORE-AFTER.md` should include pasted terminal output showing:

* Tests failing before the implementation is complete
* Tests passing after implementation
* Build passing if run

---

## Decisions made from unclear parts of the brief

### Decision 1: No final rest interval

The workout completes immediately after the final exercise's work interval.

Reason:

A rest interval exists to prepare for the next exercise. There is no next exercise after the final one.

---

### Decision 2: No backend

The brief asks for a single component. There is no API or persistence requirement.

---

### Decision 3: Timer source of truth is real time

The countdown will use `Date.now()` and `endTimeRef`.

The interval only refreshes the UI.

---

### Decision 4: Store milliseconds internally, display seconds

Internally storing milliseconds allows more accurate pause/resume behavior.

The UI displays whole seconds because the brief asks for seconds.

---

### Decision 5: Defensive empty state

If the exercise list is empty, the component will show `No exercises available.` instead of crashing.

---

## Acceptance criteria checklist mapping

| Acceptance criteria                | How this approach handles it                                   |
| ---------------------------------- | -------------------------------------------------------------- |
| Countdown accurate to ±1 second    | Use `Date.now()` and `endTimeRef`, not interval tick counting  |
| Pause stops countdown              | Clear interval and store exact remaining time                  |
| Resume continues correctly         | Set new end time from stored `remainingMs`                     |
| Work → Rest transition works       | `handlePhaseComplete` starts rest after non-final work         |
| Rest → Next Work transition works  | Rest completion increments exercise and starts work            |
| Skip Rest only visible during Rest | Derived from `phase === 'rest'`                                |
| Skip Rest starts next Work         | `skipRest` clears timer and starts next exercise               |
| No lingering timers                | `clearTimer` before every new phase                            |
| Last exercise handled safely       | Final work completion calls `completeWorkout`                  |
| Exercise X of Y correct            | Derived from `currentExerciseIndex + 1` and `exercises.length` |
| Unmount safe                       | `useEffect` cleanup clears interval                            |
| Pause/resume test                  | Required test will cover it                                    |
| Skip Rest test                     | Required test will cover it                                    |
| Last exercise test                 | Required test will cover it                                    |
