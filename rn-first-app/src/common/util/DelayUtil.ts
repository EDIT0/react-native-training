/**
 * ms 만큼 기다린다. (Kotlin: delay(ms))
 * await와 같이 써야 한다: await delay(5000)
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
