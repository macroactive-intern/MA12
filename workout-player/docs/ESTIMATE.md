Step 1

    Project set up
                1. Start new Next.js project
                2. connect to Github repo
                                                                                                    10 mins

----------------------------------------------------------------------------------------------------------------

Step 2

    Documentation
                1. Write out the Understand.md
                2. Write out the Time Estimate.md
                3. Add the Ai Time estimate to the Estimate.md
                4. Write out the Aproach.md
                                                                                                        120 mins

----------------------------------------------------------------------------------------------------------------

Step 3

    Finish Project set up
                1. Install testing packages
                                    - vitest
                                    - @vitejs/plugin-react
                                    - @testing-library/react
                                    - @testing-library/user-event
                                    - jsdom
                2. Configure Vitest
                                    - Add vitest.config.ts.
                                    - Set test environment to jsdom.
                                    - Configure React plugin.
                                                                                                    20 mins

----------------------------------------------------------------------------------------------------------------

Step 4 

    12. Create test file

                Example:

                components/WorkoutPlayer.test.tsx

                or:

                app/components/WorkoutPlayer.test.tsx

    13. Write failing tests first

                Required tests:
                                Pause / Resume test
                                Render component.
                                Click Start.
                                Advance timer.
                                Click Pause.
                                Advance timer while paused.
                                Confirm countdown does not change.
                                Click Resume.
                                Advance timer.
                                Confirm countdown continues from paused value.
                                Skip Rest test
                                Start workout.
                                Advance to rest phase.
                                Confirm Skip Rest button is visible.
                                Click Skip Rest.
                                Confirm next exercise starts.
                                Confirm phase is Work.
                                Confirm old rest timer does not keep running.
                                Last exercise boundary test
                                Use one exercise.
                                Start workout.
                                Advance past work interval.
                                Confirm workout completes.
                                Confirm it does not enter rest.
                                Confirm it does not loop back to exercise 1.

                Additional useful tests:
                                        Initial state test
                                        Shows first exercise.
                                        Shows Exercise 1 of X.
                                        Shows Work phase ready.
                                        Shows Start button.
                                        Does not show Skip Rest.
                                        Auto transition test
                                        Work phase ends.
                                        Rest phase starts.
                                        Rest phase ends.
                                        Next exercise Work phase starts.
                                        Empty exercises test
                                        No crash.
                                        Shows No exercises available.
                                        Unmount cleanup test
                                        Start timer.
                                        Unmount component.
                                        Advance timers.
                                        Confirm no console errors.
                                                                                                    110 mins

----------------------------------------------------------------------------------------------------------------

Step 5

    Build Component

                    Create WorkoutPlayer.tsx
                                            Add "use client".
                                            Define WorkoutPlayerProps.
                                            Define phase type:
                                                                type Phase = 'idle' | 'work' | 'rest' | 'complete'

                    Build basic UI
                                    Display:
                                            Exercise name.
                                            Phase.
                                            Countdown.
                                            Exercise number.
                                            Start / Pause / Resume button.
                                            Skip Rest button.
                                            Completion message.

                    Implement timer helpers
                                    Create functions for:
                                                        startWorkout
                                                        startPhase
                                                        pauseTimer
                                                        resumeTimer
                                                        clearTimer
                                                        handlePhaseComplete
                                                        skipRest

                    Implement accurate countdown
                                    Use Date.now() timestamps.
                                    Store target end time in endTimeRef.
                                    Use interval only to refresh UI.
                                    Calculate remaining time from:
                                                                    endTimeRef.current - Date.now()
                    
                    Implement phase transitions
                                    Work ends → Rest, unless this is the last exercise.
                                    Rest ends → next exercise Work.
                                    Last Work ends → Complete.
                    
                    Implement Skip Rest
                                    Only visible during Rest.
                                    Clear existing timer.
                                    Move immediately to next exercise Work.
                                    Prevent duplicate timers.

                    Implement cleanup
                                    Clear interval on unmount.
                                    Clear interval before starting a new one.
                                    Clear interval on complete.
                                                                                                    75 mins

----------------------------------------------------------------------------------------------------------------

Step 6

    Make Tests Pass

                    Run tests

                    Fix failing tests
                                    Adjust timer calculations.
                                    Fix React state timing issues.
                                    Fix stale closures if encountered.
                                    Confirm fake timers work with Date.now().
                    
                    Check app manually
                                                                                                    40 mins

----------------------------------------------------------------------------------------------------------------

Step 7 

    Quality checks
                                                                                                    30 mins

----------------------------------------------------------------------------------------------------------------

Step 8

    BEFORE-AFTER.md
                                                                                                    30 mins

----------------------------------------------------------------------------------------------------------------

                                                                                                    7.25 hrs

---------------------------------------------------------------------------------------------------------------- 

AI estimate
Step	Task	Estimate
Step 1	Project setup and GitHub repo connection	10 mins
Step 2	Documentation	100 mins
Step 3	Vitest setup	25 mins
Step 4	Tests-first implementation	120 mins
Step 5	Build WorkoutPlayer component	95 mins
Step 6	Make tests pass and manually verify behavior	55 mins
Step 7	Quality checks	30 mins
Step 8	BEFORE-AFTER.md	25 mins
AI total
460 minutes
7 hours 40 minutes
Reconciliation

My manual estimate was:

7 hours 15 minutes

The AI estimate is:

7 hours 40 minutes

The AI estimate is slightly higher because this task has some tricky timer behavior that could take longer than expected:

The countdown needs to stay accurate within ±1 second.
setInterval(fn, 1000) alone can drift, so the timer needs to use real timestamps.
Pause and resume must preserve the correct remaining time.
Skipping rest must clear the existing timer so there are no duplicate or lingering intervals.
The final exercise boundary needs careful handling.
Fake timer tests can take extra time to get right with React state updates.