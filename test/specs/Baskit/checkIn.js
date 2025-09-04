import { launchAppFromHome } from '../../utils/launchApp.js';
import { loginToBaskit } from '../../utils/login.js';
import { handleMulaiBekerja } from '../../utils/handleMulaiBekerja.js';
import { ambilFoto, keBeranda, verifyLokasi } from '../../utils/checkIn.js';


describe('Sales Checkin',()=>{


before(async () => {
  await launchAppFromHome();
});

it('Login to Baskit',async ()=>{
    const email = "oliver@gmail.com";
    const pass = "12345678";
    await loginToBaskit(email,pass)
})
it('Mulai Bekerja',async ()=>{
    await handleMulaiBekerja();
       // ... continue with the "Ambil Foto" and location check-in flow
    })

it('Ambil Foto',async()=>{
    await ambilFoto()
})
it('Verify Lokasi and Submit',async()=>{
   await verifyLokasi()
    
})
it('Go back to home',async ()=>{
    await keBeranda()

 
})
})