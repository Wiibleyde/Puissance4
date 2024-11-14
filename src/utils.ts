/**
 * Delays the execution of code for a specified amount of time.
 *
 * @param timeInMs - The amount of time to delay in milliseconds.
 * @returns A promise that resolves after the specified delay.
 */
export function Delay(timeInMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeInMs));
}