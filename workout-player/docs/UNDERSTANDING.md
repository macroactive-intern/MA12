What is the task asking me to build?

This task is asking me to build a single Next.js / React component called WorkoutPlayer.

The component is for clients following a workout program on their phone. It needs to show one exercise at a time and guide the client through:
        1. A work interval
        2. A rest interval
        3. The next exercise
        4. Completion when the workout is finished

The player starts paused. The client presses Start to begin the first exercise. After that, the component should automatically count down the current interval and transition between phases.

--------------------------------------------------------------------------------------------------------------------------------------------

What inputs does it take?

The component accepts one prop:

interface WorkoutPlayerProps {
  exercises: Array<{
    name: string
    work_seconds: number
    rest_seconds: number
  }>
}

Each exercise has:
                  name — the exercise name to display
                  work_seconds — how long the work phase lasts
                  rest_seconds — how long the rest phase lasts

--------------------------------------------------------------------------------------------------------------------------------------------

What does it return / display?

The component should display:
                              The current exercise name
                              The current phase: Work or Rest
                              The countdown in seconds
                              The exercise number out of the total, for example:
                              Exercise 1 of 5
                              Exercise 2 of 5
                              A Start button before the workout begins
                              A Pause button while running
                              A Resume button while paused after starting
                              A Skip Rest button only during the Rest phase
                              A completion message when the workout is finished:
Workout complete! 
Completed 5 exercises.

--------------------------------------------------------------------------------------------------------------------------------------------

What happens after the last exercise?

The workout should complete immediately when the final exercise's work interval reaches zero.

Reason:

A rest interval is normally used between exercises. After the final exercise, there is no next exercise to prepare for, so forcing the user through a final rest countdown would feel unnecessary.

--------------------------------------------------------------------------------------------------------------------------------------------

Timer accuracy requirement

the countdown must be accurate to within ±1 second over a 60-second interval.

This matters because setInterval(fn, 1000) does not guarantee that the callback runs exactly every 1000ms.

Reasons setInterval can drift:
                              The browser event loop can be busy.
                              React rendering can take time.
                              The tab or device can be under load.
                              Mobile browsers can throttle timers.
                              A callback scheduled for 1000ms might actually run after 1010ms, 1100ms, or more.
                              Small delays can accumulate over time.

So I should not treat each interval tick as exactly one second.

Instead, I will calculate the remaining time using real timestamps.

The timer should store an endTime timestamp when a phase starts or resumes. On every tick, the component calculates:

remainingMs = endTime - Date.now()

Then it derives the displayed seconds from that real remaining time.

This means even if the interval callback fires late, the displayed countdown still reflects real elapsed time instead of simply subtracting 1 every tick.

--------------------------------------------------------------------------------------------------------------------------------------------

State I plan to store

I need to store the minimum state required to know where the workout currently is.

I plan to store:

currentExerciseIndex

The index of the current exercise.

--------------------------------------------------------------------------------------------------------------------------------------------

The current workout phase.

Possible values:

'idle' | 'work' | 'rest' | 'complete'

Meaning:

idle — workout has not started yet
work — user is doing the exercise
rest — user is resting before the next exercise
complete — all exercises are finished

isRunning

Whether the timer is currently counting down.

This allows pause/resume without losing the current phase or exercise.

remainingMs

The current remaining time in milliseconds.

This is needed so when the user pauses, I can freeze the exact remaining time.

endTimeRef

A ref holding the timestamp when the current phase should end.

I would use a ref instead of state because changing it does not need to trigger a render by itself.

intervalRef

A ref holding the active interval ID.

This lets me safely clear the interval when:

                                            the user pauses
                                            the user skips rest
                                            the phase changes
                                            the workout completes
                                            the component unmounts

--------------------------------------------------------------------------------------------------------------------------------------------

Values I plan to derive instead of storing

should avoid storing values that can be calculated from existing state.

I can derive:

currentExercise

From:

exercises[currentExerciseIndex]
totalExercises

From:

exercises.length
exerciseDisplay

From:

currentExerciseIndex + 1

Example:

Exercise 2 of 5
displaySeconds

From:

Math.ceil(remainingMs / 1000)

This avoids showing 0 too early while there is still part of a second remaining.

showSkipRestButton

From:

phase === 'rest' && phase !== 'complete'

The Skip Rest button should only be visible during rest.

buttonLabel

From phase and isRunning.

Examples:

phase === 'idle' means show Start
isRunning === true means show Pause
isRunning === false after starting means show Resume

--------------------------------------------------------------------------------------------------------------------------------------------

Pause / resume understanding

When the user clicks Pause:

Calculate the current remaining time using:
                                            endTimeRef.current - Date.now()
Store that value in remainingMs.
Set isRunning to false.
Clear the active interval.

When the user clicks Resume:

Create a new end time:
Date.now() + remainingMs
Store that in endTimeRef.
Set isRunning to true.
Start the interval again.

The countdown should continue from the paused remaining time, not restart the whole phase.

--------------------------------------------------------------------------------------------------------------------------------------------

Skip Rest understanding

The Skip Rest button should only appear during the Rest phase.

When clicked:

            Clear the existing interval first.
            Check whether there is another exercise.
            If there is another exercise:
                                        increment currentExerciseIndex
                                        set phase to work
                                        set remainingMs to the next exercise's work_seconds
                                        create a new endTime
                                        start the next work interval
            If there is no next exercise:
                                        mark the workout as complete

--------------------------------------------------------------------------------------------------------------------------------------------

Cleanup strategy

When the component unmounts, I need to clear any active interval.

This prevents:

              timers running after the component is gone
              React state updates on an unmounted component
              console warnings or errors
              duplicate timers if the component remounts

--------------------------------------------------------------------------------------------------------------------------------------------

Should the final exercise have a rest interval?

I am deciding that the workout completes immediately after the final exercise's work interval ends, because rest exists to prepare for another exercise. Since there is no next exercise, the final rest is not useful.

--------------------------------------------------------------------------------------------------------------------------------------------

What should happen if the exercises array is empty?

I will handle this safely instead of crashing.

If exercises.length === 0, the component should display a simple message like:

No exercises available.

--------------------------------------------------------------------------------------------------------------------------------------------

Are zero-second work or rest intervals allowed?

The prop type allows numbers, but the brief does not specify validation rules.

The component should avoid crashing if a duration is 0.

Possible behavior:

            If work_seconds is 0, immediately transition to rest or complete.
            If rest_seconds is 0, immediately move to the next exercise.
            Negative values should be treated as invalid input, but since this is a component and not an API, I will keep the implementation defensive rather than adding a full validation layer.

--------------------------------------------------------------------------------------------------------------------------------------------

Should the countdown show milliseconds?

No.

The requirements say the countdown should be displayed in seconds, so the UI should show whole seconds only.

Internally, I will track milliseconds for accuracy.

--------------------------------------------------------------------------------------------------------------------------------------------

Should the timer start automatically on page load?

No.

the player starts paused and a Start button begins the first exercise.

--------------------------------------------------------------------------------------------------------------------------------------------

Should Skip Rest be visible during the last exercise?

Since I am choosing not to run a rest interval after the final exercise, there should be no final rest phase and therefore no Skip Rest button after the final work interval.

--------------------------------------------------------------------------------------------------------------------------------------------

Should the workout loop back to the start?

No.

When the final exercise is done, the component should show completion and not restart automatically.