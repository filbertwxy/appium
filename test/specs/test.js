describe("suite",()=>{
    it('test',async ()=>{
        const phoneApp = $('~Phone')
        await browser.pause(3000)
        await phoneApp.click()
        await browser.pause(2000)
        const options = await $('~More options')
        await expect(options).toBeExisting()
        await options.click()
        // await expect(options.toHaveValue(options))
    })
})
