describe("check element",()=>{
it("test",async ()=>{
   const  expectedList = ['Monday, Sep 1','33°C', 'Messages','Chrome']
    const actualList = []


    const listValues = await $$('android.widget.TextView')

    for(const element of listValues){
        actualList.push(await element.getText())

    }
    await expect(actualList).toEqual(expectedList) 

})

})

